import { Form, TextField } from 'react-md';
import { BottleTableProps } from '../../routes/bottle-page/bottle.component';
import { getItemQuery } from '../../utils/firestore/firestore.utils';

const BottleTable = ({ bottleId, bottle, editable, setbottle }: BottleTableProps) => {
  const productQuery = getItemQuery(bottle.productId, 'products');
  const userQuery = getItemQuery(bottle.userId, 'users');
  const locationQuery = getItemQuery(bottle.locationUserId, 'users');

  return (
    <Form>
      <p>Bottle Id:</p>
      <TextField
        id="bottleId"
        name="Bottle Id"
        disabled={true}
        value={bottleId}
      />
      <p>Product Id:</p>
      {productQuery && productQuery.isSuccess && productQuery.data && <p>{`${productQuery.data?.brand}: ${productQuery.data?.name}`}</p>}
      <TextField
        id="productId"
        name="Product Id"
        disabled={!editable}
        value={bottle.productId}
        onChange={(event) => {
          setbottle({
            ...bottle,
            productId: event.currentTarget.value,
          });
        }}
      />
      <p>User Id:</p>
      {userQuery && userQuery.isSuccess && userQuery.data && <p>{userQuery.data?.displayName}</p>}
      <TextField
        id="userId"
        name="User Id"
        disabled={!editable}
        value={bottle.userId}
        onChange={(event) =>
          setbottle({
            ...bottle,
            userId: event.currentTarget.value,
          })
        }
      />
      <p>Location User Id:</p>
      {locationQuery && userQuery && locationQuery.isSuccess && userQuery.data && <p>{locationQuery.data?.displayName}</p>}
      <TextField
        id="locationUserId"
        name="Location User Id"
        disabled={!editable}
        value={bottle.locationUserId}
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
