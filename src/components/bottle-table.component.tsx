import { useEffect, useState } from 'react';
import { Button, Form, Select, TextField } from 'react-md';
import { ArrowDropDownSVGIcon } from '@react-md/material-icons';
import { BottleTableProps } from '../routes/bottle-page/bottle.component';
import { getListQuery } from '../utils/firestore/firestore.utils';
import { sortAndUniqList } from '../utils/helperFunctions';
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
  newBottle,
}: BottleTableProps) => {
  const [brands, setBrands] = useState([] as string[]);
  const [names, setNames] = useState([] as string[]);
  const [userNames, setUserNames] = useState([] as string[]);
  const [brand, setBrand] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const productList = getListQuery('products').data;
  const userList = getListQuery('users').data;

  if (productList && brands.length === 0) {
    const allBrands = Array.from(productList.values()).map((product) => product.brand);
    setBrands(sortAndUniqList(allBrands));
  }

  if (userList && userNames.length === 0) {
    const allUsernames = Array.from(userList.values()).map((user) => user?.displayName);
    setUserNames(sortAndUniqList(allUsernames));
  }

  const getBrand = () => (productList ? productList?.get(bottle.productId)?.brand : '');
  const getName = () => (productList ? productList?.get(bottle.productId)?.name : '');
  const getUserName = () => (userList ? userList?.get(bottle.userId)?.displayName : '');
  const getLocationUserName = () => (userList ? userList?.get(bottle.locationUserId)?.displayName : '');

  useEffect(() => {
    if (productList && !newBottle) {
      setselectedproduct({
        ...selectedProduct,
        brand: productList?.get(bottle.productId)?.brand,
        name: productList?.get(bottle.productId)?.name,
      });
      setBrand(productList?.get(bottle.productId)?.brand);
    }
  }, [productList]);

  useEffect(() => {
    if (userList && !newBottle) {
      setselecteduser(userList?.get(bottle.userId)?.displayName);
      setselectedlocationuser(userList?.get(bottle.locationUserId)?.displayName);
    }
  }, [userList]);

  useEffect(() => {
    if (productList && brand) {
      const allNames = Object.getOwnPropertyNames(productList)
        .filter((productId) => productList?.get(productId)?.brand === brand)
        .map((productId) => productList?.get(productId)?.name);
      setNames(sortAndUniqList(allNames));
    }
  }, [brand]);

  return (
    <Form>
      <p>Product:</p>
      {!editable ? (
        <TextField id="productId" name="Product Id" disabled={!editable} value={`${getBrand()} - ${getName()}`} />
      ) : (
        <>
          (required)
          <Select
            id="brand"
            name="Brand"
            value={brand}
            options={brands}
            onChange={(item) => setBrand(item)}
            rightChildren={<ArrowDropDownSVGIcon />}
          />
          <Select
            id="name"
            name="Name"
            value={selectedProduct.name}
            disabled={brand.length === 0}
            options={names}
            onChange={(item) =>
              setselectedproduct({
                ...selectedProduct,
                brand: brand,
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
              setBrand(brand);
              setselectedproduct({
                ...selectedProduct,
                brand: brand,
                name: name,
              });
            }}
            closeModal={() => setIsVisible(false)}
          />
        </>
      )}
      <p>User:</p>
      {!editable ? (
        <TextField id="userName" name="Username" disabled={!editable} value={getUserName()} />
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
        <TextField id="locationUsername" name="Location Username" disabled={!editable} value={getLocationUserName()} />
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
        value={`${bottle.photoUrl}`}
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
