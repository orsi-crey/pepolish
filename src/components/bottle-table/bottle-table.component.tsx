import { useState } from 'react';
import { Form, Select, TextField } from 'react-md';
import { BottleTableProps } from '../../routes/bottle-page/bottle.component';
import {
  getItemQuery,
  getItemsByWhereFilteredFieldsQuery,
  getListFilteredFieldsQuery,
} from '../../utils/firestore/firestore.utils';
import { sortAndUniqList } from '../../utils/helperFunctions';

const BottleTable = ({
  bottle,
  selected,
  editable,
  setbottle,
  setselectedproduct,
  newBottle
}: BottleTableProps) => {
  const [brand, setBrand] = useState('');
  const productQuery = getItemQuery(bottle.productId, 'products', !newBottle);
  const userQuery = getItemQuery(bottle.userId, 'users', !newBottle);
  const locationQuery = getItemQuery(bottle.locationUserId, 'users', !newBottle);
  const allBrandsQuery = getListFilteredFieldsQuery('products', 'brand');

  const allNamesQuery = getItemsByWhereFilteredFieldsQuery(
    brand,
    'brand',
    'products',
    brand.length > 0
  );

  const getBrand = () => {
    if (productQuery && productQuery.isSuccess && productQuery.data) {
      return productQuery.data?.brand;
    } else {
      return '';
    }
  };

  const getName = () => {
    if (productQuery && productQuery.isSuccess && productQuery.data) {
      return productQuery.data?.name;
    } else {
      return '';
    }
  };

  // const getUserName = () => {
  //   if (userQuery && userQuery.isSuccess && userQuery.data) {
  //     return userQuery.data?.displayName;
  //   } else {
  //     return '';
  //   }
  // };

  // const getLocationUserName = () => {
  //   if (locationQuery && locationQuery.isSuccess && locationQuery.data) {
  //     return locationQuery.data?.displayName;
  //   } else {
  //     return '';
  //   }
  // };

  const sortedBrands = () => {
    if (allBrandsQuery && allBrandsQuery.isSuccess && allBrandsQuery.data) {
      return sortAndUniqList(allBrandsQuery.data);
    } else {
      return [];
    }
  };

  const sortedNames = () => {
    if (allNamesQuery && allNamesQuery.isSuccess && allNamesQuery.data) {
      return sortAndUniqList(allNamesQuery.data);
    } else {
      return [];
    }
  };

  return (
    <Form>
      <p>Product: (required)</p>
      {!editable ? (
        <TextField
          id="productId"
          name="Product Id"
          disabled={!editable}
          value={`${getBrand()} - ${getName()}`}
        />
      ) : (
        <>
          <Select
            id="brand"
            name="Brand"
            value={brand}
            options={sortedBrands()}
            onChange={(item) => setBrand(item)}
          />
          <Select
            id="name"
            name="Name"
            value={selected.name}
            disabled={brand.length === 0}
            options={sortedNames()}
            onChange={(item) =>
              setselectedproduct({
                ...selected,
                brand: brand,
                name: item,
              })
            }
          />
        </>
      )}
      <p>User: (required)</p>
      <TextField
        id="userId"
        name="User Id"
        disabled={!editable}
        value={bottle.userId}
        onChange={(event) => {
          setbottle({
            ...bottle,
            userId: event.currentTarget.value,
          });
        }}
      />
      <p>Location User: (required)</p>
      <TextField
        id="locationUserId"
        name="Location User Id"
        disabled={!editable}
        // value={getLocationUserName()}
        onChange={(event) =>
          setbottle({
            ...bottle,
            locationUserId: event.currentTarget.value,
          })
        }
      />
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
