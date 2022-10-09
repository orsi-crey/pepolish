import { Button } from 'react-md';
import { BottleButtonProps } from '../routes/bottle-page/bottle.types';

const NewBottleButtons = ({
  onSaveClicked,
  onCancelClicked,
  mutation,
}: BottleButtonProps) => {
  return (
    <>
      <>
        <Button
          disabled={mutation && mutation.isLoading}
          theme="secondary"
          themeType="contained"
          onClick={() => {
            onSaveClicked();
          }}
        >
          Save
        </Button>
        {mutation && mutation.isError && <p>{mutation.error.message}</p>}
      </>
      <Button
        theme="error"
        themeType="outline"
        onClick={() => {
          onCancelClicked();
        }}
      >
        Cancel
      </Button>
    </>
  );
};

export default NewBottleButtons;
