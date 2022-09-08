import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-md';
import { useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import ProductTable from '../../components/product-table/product-table.component';
import { getItemQuery, getItemsByWhereQuery } from '../../utils/firestore/firestore.utils';
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
  if (productQuery.data && Object.keys(product).length === 0) { setProduct(productQuery.data); }

  const bottlesQuery = getItemsByWhereQuery(productId, 'productId', 'bottles');
  console.log('bottlesQuery', bottlesQuery);
  const userId = bottlesQuery?.isSuccess ? bottlesQuery?.data?.docs[0].data().userId : '-';

  const userQuery = getItemQuery(userId, 'users', bottlesQuery.isSuccess);
  console.log('userQuery', userQuery.data?.displayName);

  const setEditableFromChild = (editable: boolean) => {
    setEditable(editable);
  };

  const cancelClickedFromChild = () => {
    if (productQuery.data) setProduct(productQuery.data);
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
      {productQuery.isSuccess && productQuery.data && (
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
    </ProductContainer>
  );
};

export default Product;
