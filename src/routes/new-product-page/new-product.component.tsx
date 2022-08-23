import { useNavigate } from 'react-router-dom';
import { Button } from 'react-md';
import { v4 as uuidv4 } from 'uuid';

import ProductTable from '../../components/product-table/product-table.component';

import { ProductContainer } from './new-product.styles';
import { Polish } from '../../store/product/product.types';

const NewProduct = () => {
  const navigate = useNavigate();

  const emptyProduct: Polish = {
    id: uuidv4(),
    brand: '',
    name: '',
    color: '',
    effects: [],
    multichrome: [],
    imageUrls: [],
    other: [],
    volume: 0,
  };

  return (
    <ProductContainer>
      <Button themeType="contained" onClick={() => navigate('/products')}>
        Back to product list
      </Button>
      <ProductTable product={emptyProduct} editable={true} />
    </ProductContainer>
  );
};

export default NewProduct;

// új productnál 