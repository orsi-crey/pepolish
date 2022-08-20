import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from 'react-md';
import { EditSVGIcon } from '@react-md/material-icons';
import { useNavigate } from 'react-router-dom';

import { fetchProductList } from '../../store/product/product.action';
import { selectProductList } from '../../store/product/product.selector';
import { Polish } from '../../store/product/product.types';
import { getProductList } from '../../utils/firebase/firebase.utils';

import { ProductListContainer } from './product-list.styles';

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(selectProductList);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const productListFromDB = await getProductList();
      dispatch(fetchProductList(productListFromDB));
    })();
  }, []);

  const editProductPage = (product: Polish) => {
    console.log(product.name);
  };

  const showProductPage = (product: Polish) => {
    navigate(`/products/${product.id}`);
  };

  const addPolishRow = (product: Polish) => {
    return (
      <TableRow key={product.id} onClick={() => showProductPage(product)}>
        <TableCell>{product.brand}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.color}</TableCell>
        <TableCell>
          {product.effects?.map((effect) => (
            <div key={effect}>{effect}</div>
          ))}
        </TableCell>
        <TableCell>
          {product.multichrome?.map((color) => (
            <div key={color}>{color}</div>
          ))}
        </TableCell>
        <TableCell>{product.volume}</TableCell>
        <TableCell>
          {product.other?.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </TableCell>
        <TableCell>
          <Button onClick={() => editProductPage(product)}>
            <EditSVGIcon />
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <ProductListContainer>
      <div>filter will be here</div>
      <Table fullWidth>
        <TableHeader>
          <TableRow>
            <TableCell>Brand</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Effects</TableCell>
            <TableCell>Multichrome colors</TableCell>
            <TableCell>Volume (ml)</TableCell>
            <TableCell>Other</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.map((product: Polish) => addPolishRow(product))}
        </TableBody>
      </Table>
    </ProductListContainer>
  );
};

export default ProductList;
