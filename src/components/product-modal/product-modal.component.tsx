import { useState } from 'react';
import {
  AutoComplete,
  Button,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  TextField,
} from 'react-md';
import { Polish } from '../../routes/product-page/product.types';
import {
  addNewItem,
  getListQuery,
} from '../../utils/firestore/firestore.utils';
import { sortAndUniqList } from '../../utils/helperFunctions';

import ChipField from '../chip-field.component';
import { StyledDialog } from './product-modal.styles';

const ProductModal = ({
  isVisible,
  closeModal,
  setProductFromModal
}: {
  isVisible: boolean;
  closeModal: () => void;
  setProductFromModal: (b: string, n: string) => void;
}) => {
  const [brands, setBrands] = useState([] as string[]);

  const productList = getListQuery('products').data;

  if (productList && brands.length === 0) {
    const allBrands = Array.from(productList.values()).map((product) => product.brand);
    setBrands(sortAndUniqList(allBrands));
  }

  const setEffectChipsFromChild = (chips: string[]) => {
    setProduct({ ...product, effects: chips });
  };

  const setMultichromeChipsFromChild = (chips: string[]) => {
    setProduct({ ...product, multichrome: chips });
  };

  const setOtherChipsFromChild = (chips: string[]) => {
    setProduct({ ...product, other: chips });
  };

  const emptyProduct: Polish = {
    id: '',
    brand: '',
    name: '',
    color: '',
    effects: [],
    multichrome: [],
    imageUrl: '',
    other: [],
    volume: 0,
  };

  const [product, setProduct] = useState(emptyProduct);

  const mutation = addNewItem('products');

  const saveClicked = () => {
    if (productMissingData()) {
      alert('Please fill all required fields before saving!');
    } else {
      mutation.mutate(product);
      setProductFromModal(product.brand, product.name);
      setProduct(emptyProduct);
      closeModal();
    }
  };

  const productMissingData = () => {
    if (
      product.brand.length > 0 &&
      product.name.length > 0 &&
      product.color.length > 0
    )
      return false;
    else return true;
  };

  return (
    <>
      <StyledDialog
        id="product-modal"
        visible={isVisible}
        onRequestClose={closeModal}
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">Add new polish</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Form>
            <p>Brand: (required)</p>
            <AutoComplete
              id="brand"
              name="Brand"
              value={product.brand}
              data={brands}
              onAutoComplete={(event) => {
                setProduct({
                  ...product,
                  brand: event.value,
                });
              }}
              onChange={(event) => {
                setProduct({
                  ...product,
                  brand: event.currentTarget.value,
                });
              }}
            />
            <p>Name: (required)</p>
            <TextField
              id="name"
              name="Name"
              value={product.name}
              onChange={(event) =>
                setProduct({
                  ...product,
                  name: event.currentTarget.value,
                })
              }
            />
            <p>Color: (required)</p>
            <TextField
              id="color"
              name="Color"
              value={product.color}
              onChange={(event) =>
                setProduct({
                  ...product,
                  color: event.currentTarget.value,
                })
              }
            />
            <p>Effects:</p>
            <ChipField
              disabled={false}
              chips={product.effects}
              setchip={setEffectChipsFromChild}
            />
            <p>Multichrome:</p>
            <ChipField
              disabled={false}
              chips={product.multichrome}
              setchip={setMultichromeChipsFromChild}
            />
            <p>Volume:</p>
            <TextField
              id="volume"
              name="Volume (ml)"
              type="number"
              min="0"
              value={`${product.volume}`}
              onChange={(event) =>
                setProduct({
                  ...product,
                  volume: +event.currentTarget.value,
                })
              }
            />
            <p>Other:</p>
            <ChipField
              disabled={false}
              chips={product.other}
              setchip={setOtherChipsFromChild}
            />
          </Form>
        </DialogContent>
        <DialogFooter>
          <Button onClick={saveClicked}>Save</Button>
          <Button id="dialog-close" onClick={() => {
            setProduct(emptyProduct);
            closeModal();
          }}>
            Cancel
          </Button>
        </DialogFooter>
      </StyledDialog>
    </>
  );
};

export default ProductModal;
