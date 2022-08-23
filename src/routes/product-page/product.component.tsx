import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-md';

import ProductTable from '../../components/product-table/product-table.component';
import { getProductQuery } from '../../utils/firestore/firestore.utils';

import { ProductContainer } from './product.styles';
import { Polish } from '../../store/product/product.types';
import { DocumentData } from 'firebase/firestore';
import EditProductButtons from '../../components/edit-product-buttons/edit-product-buttons';
import { useState } from 'react';

export type ProductButtonProps = {
  product: Polish | DocumentData;
  editable: boolean;
  seteditable: (v: boolean) => void;
};

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [editable, setEditable] = useState(false)

  const productQuery = getProductQuery(productId);

  const setEditableFromChild = (editable: boolean) => {
  setEditable(editable);
  }

  return (
    <ProductContainer>
      <Button themeType="contained" onClick={() => navigate('/products')}>
        Back to product list
      </Button>
      {productQuery.isSuccess && productQuery.data && (
        <>
          <EditProductButtons product={productQuery.data[0]} editable={editable} seteditable={setEditableFromChild} />
          <ProductTable
            product={productQuery.data[0]}
            editable={editable}
          ></ProductTable>
          {productQuery.data[0].imageUrls?.map((url: string) => (
            <img key={url} src={url} />
          ))}
        </>
      )}
    </ProductContainer>
  );
};

export default Product;
