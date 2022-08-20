import { DocumentData } from 'firebase/firestore';
import { Chip, Table, TableBody, TableCell, TableRow } from 'react-md';

import { Polish } from '../../store/product/product.types';

type ProductTableProps = {
  product: Polish | DocumentData
}

const ProductTable = (props: ProductTableProps) => {
  const { product } = props;

  return (
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
            {product.effects?.map((effect: string) => {
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
            {product.multichrome?.map((color: string) => {
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
            {product.other?.map((item: string) => {
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
  );
};

export default ProductTable;
