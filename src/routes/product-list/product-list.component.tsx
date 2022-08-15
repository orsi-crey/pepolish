import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProductList } from '../../store/product/product.action';
import { selectProductList } from '../../store/product/product.selector';
import { Polish } from '../../store/product/product.types';
import { getProductList } from '../../utils/firebase/firebase.utils';

import { ProductListContainer } from './product-list.styles';


const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(selectProductList);

  useEffect(() => {
    (async () => {
      const productListFromDB = await getProductList();
      dispatch(fetchProductList(productListFromDB));
    })();
  }, []);

  return (
    <ProductListContainer>
      {productList.map((product: Polish) => 
        <div key={product.name}>
          {`${product.brand}: ${product.name} - ${product.color} `}
        </div>)}
    </ProductListContainer>
  );
};

export default ProductList;
