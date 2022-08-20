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
import { useQueryClient } from 'react-query';

import { ProductListContainer } from './product-list.styles';
import { getProductListQuery } from '../../utils/firestore/firestore.utils';
import { DocumentData } from 'firebase/firestore';

const ProductList = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const productList = getProductListQuery();

  const editProductPage = (product: DocumentData) => {
    console.log(product.name);
  };

  const showProductPage = (product: DocumentData) => {
    navigate(`/products/${product.id}`);
  };

  const addPolishRow = (product: DocumentData) => {
    return (
      <TableRow key={product.id} onClick={() => showProductPage(product)}>
        <TableCell>{product.brand}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.color}</TableCell>
        <TableCell>
          {product.effects?.map((effect: string) => (
            <div key={effect}>{effect}</div>
          ))}
        </TableCell>
        <TableCell>
          {product.multichrome?.map((color: string) => (
            <div key={color}>{color}</div>
          ))}
        </TableCell>
        <TableCell>{product.volume}</TableCell>
        <TableCell>
          {product.other?.map((item: string) => (
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
      <Button themeType="contained" onClick={() => navigate('/products/new')}>
        Add polish to the list
      </Button>
      {productList.isSuccess && (
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
            {productList.data?.map((product) => addPolishRow(product))}
          </TableBody>
        </Table>
      )}
    </ProductListContainer>
  );
};

export default ProductList;
