import { useState } from 'react';
import { Form, TextField } from 'react-md';
import { ProductTableProps } from '../../routes/product-page/product.component';

import ChipField from '../chip-field/chip-field.component';

const ProductTable = ({ product, editable, setproduct }: ProductTableProps) => {
  const [currentProduct, setCurrentProduct] = useState(product);

  return (
    <Form>
      <p>Brand:</p>
      <TextField
        id="brand"
        name="Brand"
        disabled={!editable}
        value={currentProduct.brand}
        onChange={(event) => {
          setCurrentProduct({
            ...currentProduct,
            brand: event.currentTarget.value,
          });
          setproduct({
            ...currentProduct,
            brand: event.currentTarget.value,
          });
        }}
      />
      <p>Name:</p>
      <TextField
        id="name"
        name="Name"
        disabled={!editable}
        value={currentProduct.name}
        onChange={(event) =>
          setCurrentProduct({
            ...currentProduct,
            name: event.currentTarget.value,
          })
        }
      />
      <p>Color:</p>
      <TextField
        id="color"
        name="Color"
        disabled={!editable}
        value={currentProduct.color}
        onChange={(event) =>
          setCurrentProduct({
            ...currentProduct,
            color: event.currentTarget.value,
          })
        }
      />
      <p>Effects:</p>
      <ChipField chips={currentProduct.effects} disabled={!editable} />
      <p>Multichrome:</p>
      <ChipField chips={currentProduct.multichrome} disabled={!editable} />
      <p>Volume:</p>
      <TextField
        id="volume"
        name="Volume (ml)"
        type="number"
        min="0"
        disabled={!editable}
        value={`${currentProduct.volume}`}
        onChange={(event) =>
          setCurrentProduct({
            ...currentProduct,
            volume: event.currentTarget.value,
          })
        }
      />
      <p>Other:</p>
      <ChipField chips={currentProduct.other} disabled={!editable} />
    </Form>
  );
};

export default ProductTable;
