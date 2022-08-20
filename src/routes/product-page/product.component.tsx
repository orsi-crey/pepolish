import { useNavigate, useParams } from 'react-router-dom';
import { Button, Chip, Table, TableBody, TableCell, TableRow } from 'react-md';
import { useQueryClient } from 'react-query';

import { Polish } from '../../store/product/product.types';
import { getProductQuery } from '../../utils/firestore/firestore.utils';

import { ProductContainer } from './product.styles';

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  
  const queryClient = useQueryClient();
  const productQuery = getProductQuery(productId);

  console.log(productQuery)
  let product: Polish
  if (productQuery.isSuccess) {
    product = productQuery.data[0] as Polish
  }

  return (
    <ProductContainer>
      <Button themeType="contained" onClick={() => navigate('/products')}>Back to product list</Button>
      <Button themeType="contained" onClick={() => navigate(`/products/${productId}/edit`)}>Edit this product</Button>
      {productQuery.isSuccess && productQuery.data && (
        <>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Brand:</TableCell>
                <TableCell>{productQuery.data[0].brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name:</TableCell>
                <TableCell>{productQuery.data[0].name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Color:</TableCell>
                <TableCell>{productQuery.data[0].color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Effects:</TableCell>
                <TableCell>
                  {productQuery.data[0].effects?.map((effect: string) => {
                    return (
                      <Chip key={effect} theme="outline" noninteractable>
                        {effect}
                      </Chip>
                    );
                  })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Multichrome:</TableCell>
                <TableCell>
                  {productQuery.data[0].multichrome?.map((color: string) => {
                    return (
                      <Chip key={color} theme="outline" noninteractable>
                        {color}
                      </Chip>
                    );
                  })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Volume:</TableCell>
                <TableCell>{`${productQuery.data[0].volume} ml`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Other:</TableCell>
                <TableCell>
                  {productQuery.data[0].other?.map((item: string) => {
                    return (
                      <Chip key={item} theme="outline" noninteractable>
                        {item}
                      </Chip>
                    );
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {productQuery.data[0].imageUrls?.map((url: string) => (
            <img key={url} src={url} />
          ))}
        </>
      )}
    </ProductContainer>
  );
};

export default Product;
