import { Button } from 'react-md';
import { BottleButtonProps } from '../../routes/bottle-page/bottle.component';

const EditBottleButtons = ({
  editable,
  seteditable,
  onSaveClicked,
  onCancelClicked,
  mutation,
}: BottleButtonProps) => {

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
          {<>
            <Button
              disabled={mutation && mutation.isLoading}
              themeType="contained"
              onClick={() => { onSaveClicked(); }}
            >
              Save
            </Button>
            {mutation && mutation.isError && <p>{mutation.error.message}</p>}
          </>}
          <Button
            themeType="contained"
            onClick={() => { onCancelClicked(); }}
          >
            Cancel
          </Button>
        </>
      )}
    </>
  );
};

export default EditBottleButtons;
