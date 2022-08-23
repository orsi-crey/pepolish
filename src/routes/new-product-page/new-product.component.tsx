import { useNavigate } from 'react-router-dom';
import { Button } from 'react-md';
import { v4 as uuidv4 } from 'uuid';

import ProductTable from '../../components/product-table/product-table.component';

import { ProductContainer } from './new-product.styles';
import { Polish } from '../../store/product/product.types';
import NewProductButtons from '../../components/new-product-buttons/new-product-buttons';
import { useState } from 'react';
import { DocumentData } from 'firebase/firestore';

const NewProduct = () => {
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

  const navigate = useNavigate();
  const [editable, setEditable] = useState(true);
  const [product, setProduct] = useState(emptyProduct);

  const setEditableFromChild = (editable: boolean) => {
    setEditable(editable);
  };

  const setProductFromChild = (product: Polish | DocumentData) => {
    setProduct(product);
  };

  return (
    <ProductContainer>
      <Button themeType="contained" onClick={() => navigate('/products')}>
        Back to product list
      </Button>
      <NewProductButtons
        product={product}
        editable={true}
        seteditable={setEditableFromChild}
      />
      <ProductTable product={emptyProduct} editable={true} setproduct={setProductFromChild} />
    </ProductContainer>
  );
};

export default NewProduct;

// új productnál
