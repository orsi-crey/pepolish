import { useNavigate } from 'react-router-dom';
import { Button } from 'react-md';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import ProductTable from '../../components/product-table.component';
import NewProductButtons from '../../components/new-product-buttons';

import { PaddedDiv, ProductContainer } from './new-product.styles';
import { addNewItem } from '../../utils/firestore/firestore.utils';

const NewProduct = () => {
  const emptyProduct: DocumentData = {
    id: '',
    brand: '',
    name: '',
    color: '',
    effects: [],
    multichrome: [],
    imageUrl: '',
    other: [],
    volume: 0,
  };

  const navigate = useNavigate();
  const [product, setProduct] = useState(emptyProduct);

  const mutation = addNewItem('products');

  const productMissingData = () => {
    if (product.brand.length > 0 && product.name.length > 0 && product.color.length > 0) {
      return false;
    }
    return true;
  };

  const saveClickedFromChild = () => {
    if (productMissingData()) alert('Please fill all required fields before saving!');
    else mutation.mutate(product);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate(`/products/${mutation.data?.id}`);
    }
  }, [mutation]);

  return (
    <ProductContainer>
      <PaddedDiv>
        <Button themeType="contained" onClick={() => navigate('/products')}>
          Back to product list
        </Button>
      </PaddedDiv>
      <PaddedDiv>
        <NewProductButtons
          editable={true}
          seteditable={() => {}}
          onSaveClicked={saveClickedFromChild}
          onCancelClicked={() => navigate('/products')}
          mutation={mutation}
        />
      </PaddedDiv>
      <ProductTable
        productId={'This will be generated by Firestore'}
        product={product}
        editable={true}
        setproduct={(product) => setProduct(product)}
      />
    </ProductContainer>
  );
};

export default NewProduct;
