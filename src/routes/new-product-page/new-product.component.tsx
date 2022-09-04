import { useNavigate } from 'react-router-dom';
import { Button } from 'react-md';
import { useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import ProductTable from '../../components/product-table/product-table.component';
import { Polish } from '../../store/product/product.types';
import NewProductButtons from '../../components/new-product-buttons/new-product-buttons';

import { ProductContainer } from './new-product.styles';

// szoval van egy új product, ami először empty
// save: add doc, redirect to new polish page
// cancel: return to list
// editable true

const NewProduct = () => {
  const emptyProduct: Polish = {
    id: '',
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
  const [product, setProduct] = useState(emptyProduct);

  const setProductFromChild = (product: Polish | DocumentData) => {
    setProduct(product as Polish);
  };

  const cancelClickedFromChild = () => {
    navigate('/products');
  };

  return (
    <ProductContainer>
      <Button themeType="contained" onClick={() => navigate('/products')}>
        Back to product list
      </Button>
      <NewProductButtons
        product={product}
        productId={''}
        editable={true}
        seteditable={()=>{}}
        onCancelClicked={cancelClickedFromChild}
      />
      <ProductTable product={product} editable={true} setproduct={setProductFromChild} />
    </ProductContainer>
  );
};

export default NewProduct;

// új productnál
