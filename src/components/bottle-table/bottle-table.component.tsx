import { Form, TextField } from 'react-md';
import { BottleTableProps } from '../../routes/bottle-page/bottle.component';

const BottleTable = ({ bottleId, bottle, editable, setbottle }: BottleTableProps) => {

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
