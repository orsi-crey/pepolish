import { Button } from 'react-md';
import { BottleButtonProps } from '../../routes/bottle-page/bottle.component';
import { updateItem } from '../../utils/firestore/firestore.utils';

const EditBottleButtons = ({
  bottle,
  bottleId,
  editable,
  seteditable,
  onCancelClicked
}: BottleButtonProps) => {
  const mutation = updateItem(bottleId, 'bottles');

  return (
    <>
      {!editable ? (
        <Button
          themeType="contained"
          onClick={() => {
            seteditable(true);
          }}
        >
          Edit this bottle
        </Button>
      ) : (
        <>
          <>
            <Button
              disabled={mutation.isLoading}
              themeType="contained"
              onClick={() => {
                mutation.mutate(bottle);
                seteditable(false);
              }}
            >
              Save
            </Button>
            {mutation.isError && <p>{mutation.error.message}</p>}
          </>
          <Button
            themeType="contained"
            onClick={() => {
              onCancelClicked();
            }}
          >
            Cancel
          </Button>
        </>
      )}
    </>
  );
};

export default EditBottleButtons;
