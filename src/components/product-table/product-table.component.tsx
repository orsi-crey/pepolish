import { Form, TextField } from 'react-md';
import { ProductTableProps } from '../../routes/product-page/product.component';

import ChipField from '../chip-field/chip-field.component';

const ProductTable = ({ productId, product, editable, setproduct }: ProductTableProps) => {
  const setEffectChipsFromChild = (chips: string[]) => {
    setproduct({ ...product, effects: chips });
  };

  const setMultichromeChipsFromChild = (chips: string[]) => {
    setproduct({ ...product, multichrome: chips });
  };

  const setOtherChipsFromChild = (chips: string[]) => {
    setproduct({ ...product, other: chips });
  };

  return (
    <Form>
      <p>Product Id:</p>
      <TextField
        id="productId"
        name="Product Id"
        disabled={true}
        value={productId}
      />
      <p>Brand:</p>
      <TextField
        id="brand"
        name="Brand"
        disabled={!editable}
        value={product.brand}
        onChange={(event) => {
          setproduct({
            ...product,
            brand: event.currentTarget.value,
          });
        }}
      />
      <p>Name:</p>
      <TextField
        id="name"
        name="Name"
        disabled={!editable}
        value={product.name}
        onChange={(event) =>
          setproduct({
            ...product,
            name: event.currentTarget.value,
          })
        }
      />
      <p>Color:</p>
      <TextField
        id="color"
        name="Color"
        disabled={!editable}
        value={product.color}
        onChange={(event) =>
          setproduct({
            ...product,
            color: event.currentTarget.value,
          })
        }
      />
      <p>Effects:</p>
      <ChipField chips={product.effects} disabled={!editable} setchip={setEffectChipsFromChild} />
      <p>Multichrome:</p>
      <ChipField chips={product.multichrome} disabled={!editable} setchip={setMultichromeChipsFromChild} />
      <p>Volume:</p>
      <TextField
        id="volume"
        name="Volume (ml)"
        type="number"
        min="0"
        disabled={!editable}
        value={`${product.volume}`}
        onChange={(event) =>
          setproduct({
            ...product,
            volume: event.currentTarget.value,
          })
        }
      />
      <p>Other:</p>
      <ChipField chips={product.other} disabled={!editable} setchip={setOtherChipsFromChild} />
    </Form>
  );
};

export default ProductTable;
