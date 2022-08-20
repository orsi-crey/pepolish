import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-md';
import { useQueryClient } from 'react-query';

import ProductTable from '../../components/product-table/product-table.component';
import { getProductQuery } from '../../utils/firestore/firestore.utils';

import { ProductContainer } from './product.styles';

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const queryClient = useQueryClient();
  const productQuery = getProductQuery(productId);

  return (
    <ProductContainer>
      <Button themeType="contained" onClick={() => navigate('/products')}>
        Back to product list
      </Button>
      <Button
        themeType="contained"
        onClick={() => navigate(`/products/${productId}/edit`)}
      >
        Edit this product
      </Button>
      {productQuery.isSuccess && productQuery.data && (
        <>
          <ProductTable product={productQuery.data[0]}></ProductTable>
          {productQuery.data[0].imageUrls?.map((url: string) => (
            <img key={url} src={url} />
          ))}
        </>
      )}
    </ProductContainer>
  );
};

export default Product;
