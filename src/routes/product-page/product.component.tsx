import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Chip, Table, TableBody, TableCell, TableRow } from 'react-md';

import { selectProductList } from '../../store/product/product.selector';
import { fetchProduct } from '../../store/product/product.action';
import { getProduct } from '../../utils/firebase/firebase.utils';

import { ProductContainer } from './product.styles';
import { Polish } from '../../store/product/product.types';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const productList = useSelector(selectProductList);
  const [product, setProduct] = useState({} as Polish);

  useEffect(() => {
    (async () => {
      if (productId && productList.length === 0) {
        const productFromDB = await getProduct(productId);
        dispatch(fetchProduct(productFromDB));
      }
    })();
  }, []);

  useEffect(() => {
    setProduct(productList.find((product: Polish) => product.id === productId));
  }, [productList]);

  return (
    <ProductContainer>
      <Button themeType="contained" onClick={() => navigate('/products')}>Back to product list</Button>
      <Button themeType="contained" onClick={() => navigate(`/products/${productId}/edit`)}>Edit this product</Button>
      {product && (
        <>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Brand:</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name:</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Color:</TableCell>
                <TableCell>{product.color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Effects:</TableCell>
                <TableCell>
                  {product.effects?.map((effect) => {
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
                  {product.multichrome?.map((color) => {
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
                <TableCell>{`${product.volume} ml`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Other:</TableCell>
                <TableCell>
                  {product.other?.map((item) => {
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
          {product.imageUrls?.map((url) => (
            <img key={url} src={url} />
          ))}
        </>
      )}
    </ProductContainer>
  );
};

export default Product;
