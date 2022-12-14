import { useEffect, useState } from 'react';
import { Button, Form, Select, TextField } from 'react-md';
import { Link } from 'react-router-dom';
import { ArrowDropDownSVGIcon } from '@react-md/material-icons';
import { BottleTableProps } from '../routes/bottle-page/bottle.types';
import { getListQuery } from '../utils/firestore/firestore.utils';
import { getAllBrands, getAllDisplaynames, getDisplayName, getNamesOfBrand, getProductBrandAndName } from '../utils/helperFunctions';
import ProductModal from './product-modal/product-modal.component';

const BottleTable = ({
  bottle,
  selectedProduct,
  selectedUser,
  selectedLocationUser,
  editable,
  setbottle,
  setselectedproduct,
  setselecteduser,
  setselectedlocationuser,
}: BottleTableProps) => {
  const [brands, setBrands] = useState([] as string[]);
  const [names, setNames] = useState([] as string[]);
  const [userNames, setUserNames] = useState([] as string[]);
  const [isVisible, setIsVisible] = useState(false);

  const productList = getListQuery('products').data;
  const userList = getListQuery('users').data;

  if (productList && brands.length === 0) {
    setBrands(getAllBrands(productList));
  }

  if (userList && userNames.length === 0) {
    setUserNames(getAllDisplaynames(userList));
  }

  useEffect(() => {
    if (productList && selectedProduct?.brand !== '') {
      setNames(getNamesOfBrand(productList, selectedProduct?.brand));
    }
  }, [selectedProduct]);

  return (
    <Form>
      <p>Product:</p>
      {!editable ? (
        <Link id="productId" to={`/products/${bottle.productId}`}>
          {getProductBrandAndName(productList, bottle.productId)}
        </Link>
      ) : (
        <>
          (required)
          <Select
            id="brand"
            name="Brand"
            value={selectedProduct?.brand || ''}
            options={brands}
            onChange={(item) => {
              setselectedproduct({ brand: item, name: '' });
            }}
            rightChildren={<ArrowDropDownSVGIcon />}
          />
          <Select
            id="name"
            name="Name"
            value={selectedProduct?.name || ''}
            disabled={selectedProduct?.brand?.length === 0}
            options={names}
            onChange={(item) =>
              setselectedproduct({
                ...selectedProduct,
                name: item,
              })
            }
            rightChildren={<ArrowDropDownSVGIcon />}
          />
          <Button themeType="outline" onClick={() => setIsVisible(true)}>
            Can't find polish in list? Add new!
          </Button>
          <ProductModal
            isVisible={isVisible}
            setProductFromModal={(brand, name) => {
              setselectedproduct({
                ...selectedProduct,
                brand: brand,
                name: name,
              });
            }}
            closeModal={() => {
              setIsVisible(false);
              setBrands([]);
            }}
          />
        </>
      )}
      <p>User:</p>
      {!editable ? (
        <Link id="userId" to={`/users/${bottle.userId}`}>
          {getDisplayName(userList, bottle.userId)}
        </Link>
      ) : (
        <>
          (required)
          <Select
            id="username"
            name="Username"
            value={selectedUser}
            options={userNames}
            onChange={(item) => setselecteduser(item)}
            rightChildren={<ArrowDropDownSVGIcon />}
          />
        </>
      )}
      <p>Location User:</p>
      {!editable ? (
        <Link id="locationUserId" to={`/users/${bottle.locationUserId}`}>
          {getDisplayName(userList, bottle.locationUserId)}
        </Link>
      ) : (
        <>
          (required)
          <Select
            id="locationUsername"
            name="Location Username"
            value={selectedLocationUser}
            options={userNames}
            onChange={(item) => setselectedlocationuser(item)}
            rightChildren={<ArrowDropDownSVGIcon />}
          />
        </>
      )}
      <p>Percentage:</p>
      <TextField
        id="fullPercentage"
        name="Percentage"
        type="number"
        min="0"
        disabled={!editable}
        value={`${bottle.fullPercentage}`}
        onChange={(event) =>
          setbottle({
            ...bottle,
            fullPercentage: event.currentTarget.value,
          })
        }
      />
      <p>Photo URL:</p>
      <TextField
        id="photoUrl"
        name="Photo URL"
        disabled={!editable}
        value={bottle.photoUrl || ''}
        onChange={(event) =>
          setbottle({
            ...bottle,
            photoUrl: event.currentTarget.value,
          })
        }
      />
    </Form>
  );
};

export default BottleTable;
