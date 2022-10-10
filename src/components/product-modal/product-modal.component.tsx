import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AutoComplete, Button, DialogContent, DialogFooter, DialogHeader, DialogTitle, Form, TextField } from 'react-md';
import { addNewItem, getListQuery } from '../../utils/firestore/firestore.utils';
import { getAllBrands } from '../../utils/helperFunctions';

import ChipField from '../chip-field.component';
import { StyledDialog } from './product-modal.styles';

const emptyProduct: DocumentData = {
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

const ProductModal = ({
  isVisible,
  closeModal,
  setProductFromModal,
}: {
  isVisible: boolean;
  closeModal: () => void;
  setProductFromModal: (b: string, n: string) => void;
}) => {
  const [product, setProduct] = useState(emptyProduct);
  const [brands, setBrands] = useState([] as string[]);

  const productList = getListQuery('products').data;
  const mutation = addNewItem('products');

  if (productList && brands.length === 0) {
    setBrands(getAllBrands(productList));
  }

  const saveClicked = () => {
    if (productMissingData()) {
      alert('Please fill all required fields before saving!');
    } else {
      mutation.mutate(product);
    }
  };

  useEffect(() => {
    if (mutation.isSuccess && isVisible) {
      setProductFromModal(product.brand, product.name);
      setProduct(emptyProduct);
      closeModal();
    }
  }, [mutation]);

  const productMissingData = () => {
    if (product.brand.length > 0 && product.name.length > 0 && product.color.length > 0) return false;
    else return true;
  };

  return (
    <>
      <StyledDialog id="product-modal" visible={isVisible} onRequestClose={closeModal} aria-labelledby="dialog-title">
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
            <ChipField disabled={false} chips={product.effects} setchip={(chips: string[]) => setProduct({ ...product, effects: chips })} />
            <p>Multichrome:</p>
            <ChipField
              disabled={false}
              chips={product.multichrome}
              setchip={(chips: string[]) => setProduct({ ...product, multichrome: chips })}
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
            <ChipField disabled={false} chips={product.other} setchip={(chips: string[]) => setProduct({ ...product, other: chips })} />
            <p>Photo URL:</p>
            <TextField
              id="imageUrl"
              name="Image Url"
              value={product.imageUrl}
              onChange={(event) =>
                setProduct({
                  ...product,
                  imageUrl: event.currentTarget.value,
                })
              }
            />
          </Form>
        </DialogContent>
        <DialogFooter>
          <Button onClick={saveClicked}>Save</Button>
          <Button
            id="dialog-close"
            onClick={() => {
              setProduct(emptyProduct);
              closeModal();
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </StyledDialog>
    </>
  );
};

export default ProductModal;
