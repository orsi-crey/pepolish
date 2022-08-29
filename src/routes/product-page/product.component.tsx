import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-md';

import ProductTable from '../../components/product-table/product-table.component';
import { getProductQuery } from '../../utils/firestore/firestore.utils';

import { ProductContainer } from './product.styles';
import { initialPolish, Polish } from '../../store/product/product.types';
import { DocumentData } from 'firebase/firestore';
import EditProductButtons from '../../components/edit-product-buttons/edit-product-buttons';
import { useState } from 'react';

export type ProductButtonProps = {
  product: Polish | DocumentData;
  editable: boolean;
  seteditable: (v: boolean) => void;
};

export type ProductTableProps = {
  product: Polish | DocumentData;
  editable: boolean;
  setproduct: (v: Polish | DocumentData) => void;
};

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [editable, setEditable] = useState(false)
  const [product, setProduct] = useState({} as Polish | DocumentData);

  const productQuery = getProductQuery(productId);

  if (productQuery.data) { setProduct(productQuery.data[0]); }

  const setEditableFromChild = (editable: boolean) => {
    setEditable(editable);
  }

  const setProductFromChild = (product: Polish | DocumentData) => {
    setProduct(product);
  }


  return (
    <ProductContainer>
      <Button themeType="contained" onClick={() => navigate('/products')}>
        Back to product list
      </Button>
      {productQuery.isSuccess && productQuery.data && (
        <>
          <EditProductButtons product={product} editable={editable} seteditable={setEditableFromChild} />
          <ProductTable
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
