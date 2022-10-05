import { Table, TableHeader, TableRow, TableCell, TableBody, Button } from 'react-md';
import { useNavigate } from 'react-router-dom';

import { ProductListContainer } from './product-list.styles';
import { getListQuery } from '../../utils/firestore/firestore.utils';

const ProductList = () => {
  const navigate = useNavigate();

  const productList = getListQuery('products').data;

  const showProductPage = (id: string) => {
    navigate(`/products/${id}`);
  };

  const addPolishRows = () => {
    return (
      productList &&
      Object.getOwnPropertyNames(productList).map((productId: string) => {
        const product = productList[productId];
        return (
          <TableRow key={productId} onClick={() => showProductPage(productId)}>
            <TableCell>{product.imageUrl && <img src={product.imageUrl} />}</TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.color}</TableCell>
            <TableCell>
              {product.effects?.map((effect: string) => (
                <div key={effect}>{effect}</div>
              ))}
            </TableCell>
            <TableCell>
              {product.other?.map((item: string) => (
                <div key={item}>{item}</div>
              ))}
            </TableCell>
          </TableRow>
        );
      })
    );
  };

  return (
    <ProductListContainer>
      {/* <div>filter will be here</div> */}
      <Button themeType="contained" onClick={() => navigate('/products/new')}>
        Add polish to the list
      </Button>
      {productList && (
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableCell style={{ width: '50px' }} />
              <TableCell>Brand</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Effects</TableCell>
              <TableCell>Other</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>{productList && addPolishRows()}</TableBody>
        </Table>
      )}
    </ProductListContainer>
  );
};

export default ProductList;
