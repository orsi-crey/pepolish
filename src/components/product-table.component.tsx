import { AutoComplete, Form, TextField } from 'react-md';
import { ProductTableProps } from '../routes/product-page/product.component';
import { getListFilteredFieldsQuery } from '../utils/firestore/firestore.utils';
import { sortAndUniqList } from '../utils/helperFunctions';

import ChipField from './chip-field.component';

const ProductTable = ({ product, editable, setproduct }: ProductTableProps) => {
  const allBrandsQuery = getListFilteredFieldsQuery('products', 'brand');

  const sortedBrands = () => {
    if (allBrandsQuery && allBrandsQuery.isSuccess && allBrandsQuery.data) {
      const allBrands = allBrandsQuery.data;
      return sortAndUniqList(allBrands);
    } else {
      return [];
    }
  };

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
      <p>Brand: (required)</p>
      <AutoComplete
        id="brand"
        name="Brand"
        disabled={!editable}
        value={product.brand}
        data={sortedBrands()}
        onAutoComplete={(event) => {
          setproduct({
            ...product,
            brand: event.value,
          });
        }}
        onChange={(event) => {
          setproduct({
            ...product,
            brand: event.currentTarget.value,
          });
        }}
      />
      <p>Name: (required)</p>
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
      <p>Color: (required)</p>
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
      <ChipField
        chips={product.effects}
        disabled={!editable}
        setchip={setEffectChipsFromChild}
      />
      <p>Multichrome:</p>
      <ChipField
        chips={product.multichrome}
        disabled={!editable}
        setchip={setMultichromeChipsFromChild}
      />
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
      <ChipField
        chips={product.other}
        disabled={!editable}
        setchip={setOtherChipsFromChild}
      />
      {editable && (
        <>
          <p>Photo URL:</p>
          <TextField
            id="imageUrl"
            name="Image Url"
            value={product.imageUrl}
            onChange={(event) =>
              setproduct({
                ...product,
                imageUrl: event.currentTarget.value,
              })
            }
          />
        </>
      )}
    </Form>
  );
};

export default ProductTable;