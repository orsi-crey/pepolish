import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-md';
import { useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import ProductTable from '../../components/product-table/product-table.component';
import { getItemQuery, getItemsByWhereQuery, getListSubsetQuery } from '../../utils/firestore/firestore.utils';
import { Polish } from '../../store/product/product.types';
import EditProductButtons from '../../components/edit-product-buttons/edit-product-buttons';

import { ProductContainer } from './product.styles';

export type ProductButtonProps = {
  product: Polish | DocumentData;
  productId: string | undefined;
  editable: boolean;
  seteditable: (v: boolean) => void;
  onCancelClicked: () => void;
};

export type ProductTableProps = {
  product: Polish | DocumentData;
  productId: string | undefined;
  editable: boolean;
  setproduct: (v: Polish | DocumentData) => void;
};

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [editable, setEditable] = useState(false);
  const [product, setProduct] = useState({} as Polish | DocumentData);

  const productQuery = getItemQuery(productId, 'products');
  if (productQuery && productQuery.data && Object.keys(product).length === 0) { setProduct(productQuery.data); }

  const bottlesQuery = getItemsByWhereQuery(productId, 'productId', 'bottles');
  const userIds: string[] = ['-'];
  bottlesQuery?.data?.docs.forEach(item => {
    userIds.push(item.data().userId);
  });

  const userQuery = getListSubsetQuery(userIds, 'users', bottlesQuery.isSuccess);

  const owningUsers = () => {
    return userQuery.data?.docs.map((item: any) => {
      return <div key={item.id}>
        • <Link to={`/users/${item.id}`}>{item.data().displayName}</Link>
      </div>;
    });
  };

  const setEditableFromChild = (editable: boolean) => {
    setEditable(editable);
  };

  const cancelClickedFromChild = () => {
    if (productQuery && productQuery.data) setProduct(productQuery.data);
    setEditable(false);
  };

  const setProductFromChild = (product: Polish | DocumentData) => {
    setProduct(product);
  };

  return (
    <ProductContainer>
      <Button themeType="contained" onClick={() => navigate('/products')}>
        Back to product list
      </Button>
      {productQuery && productQuery.isSuccess && productQuery.data && (
        <>
          <EditProductButtons product={product} productId={productId} editable={editable} seteditable={setEditableFromChild} onCancelClicked={cancelClickedFromChild} />
          <ProductTable
            productId={productId}
            product={product}
            editable={editable}
            setproduct={setProductFromChild}
          ></ProductTable>
          {product.imageUrls?.map((url: string) => (
            <img key={url} src={url} />
          ))}
        </>
      )}
      {productQuery && productQuery.isSuccess && userQuery.isSuccess && userQuery.data?.docs?.length > 0 && (
        <>
          <p>List of users who own this polish:</p>
          {owningUsers()}
        </>
      )}
    </ProductContainer>
  );
};

export default Product;
