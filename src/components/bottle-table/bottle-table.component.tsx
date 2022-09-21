import { Form, TextField } from 'react-md';
import { BottleTableProps } from '../../routes/bottle-page/bottle.component';
import { getItemQuery, getItemsByWhereFilteredFieldsQuery, getListFilteredFieldsQuery } from '../../utils/firestore/firestore.utils';


const getBrands = () => {
  return getListFilteredFieldsQuery('products', 'brand');
};

const getNames = (brand: string) => {
  return getItemsByWhereFilteredFieldsQuery(brand, 'brand', 'products');
};

const BottleTable = ({ bottleId, bottle, editable, setbottle }: BottleTableProps) => {
  const productQuery = getItemQuery(bottle.productId, 'products');
  const userQuery = getItemQuery(bottle.userId, 'users');
  const locationQuery = getItemQuery(bottle.locationUserId, 'users');

  const getBrandAndName  = () => {
    if (productQuery && productQuery.isSuccess && productQuery.data) {
      return `${productQuery.data?.brand} - ${productQuery.data?.name}`;
    } else {
      return '';
    }
  };

  const getUserName  = () => {
    if (userQuery && userQuery.isSuccess && userQuery.data ) {
      return userQuery.data?.displayName;
    } else {
      return '';
    }
  };

  const getLocationUserName  = () => {
    if (locationQuery && locationQuery.isSuccess && locationQuery.data ) {
      return locationQuery.data?.displayName;
    } else {
      return '';
    }
  };

  return (
    <Form>
      <p>Product: (required)</p>
      <TextField
        id="productId"
        name="Product Id"
        disabled={!editable}
        value={getBrandAndName()}
        onChange={(event) => {
          setbottle({
            ...bottle,
            productId: event.currentTarget.value,
          });
        }}
      />
      <p>User: (required)</p>
      <TextField
        id="userId"
        name="User Id"
        disabled={!editable}
        value={getUserName()}
        onChange={(event) =>
          setbottle({
            ...bottle,
            userId: event.currentTarget.value,
          })
        }
      />
      <p>Location User: (required)</p>
      <TextField
        id="locationUserId"
        name="Location User Id"
        disabled={!editable}
        value={getLocationUserName()}
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
