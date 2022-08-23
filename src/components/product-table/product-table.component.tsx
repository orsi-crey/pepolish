import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, Form, TextField } from 'react-md';

import { Polish } from '../../store/product/product.types';
import { updateProduct } from '../../utils/firestore/firestore.utils';
import ChipField from '../chip-field/chip-field.component';

type ProductTableProps = {
  product: Polish | DocumentData;
  editable: boolean;
};

const ProductTable = ({ product, editable }: ProductTableProps) => {
  const [currentProduct, setCurrentProduct] = useState(product);

  return (
    <Form>
      
      <p>Brand:</p>
      <TextField
        id="brand"
        name="Brand"
        disabled={!editable}
        value={currentProduct.brand}
        onChange={(event) =>
          setCurrentProduct({
            ...currentProduct,
            brand: event.currentTarget.value,
          })
        }
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
