import { Button } from 'react-md';
import { BottleButtonProps } from '../../routes/bottle-page/bottle.component';

const NewBottleButtons = ({
  onSaveClicked,
  onCancelClicked,
  mutation
}: BottleButtonProps) => {


  return (
    <>
      <>
        <Button
          disabled={mutation && mutation.isLoading}
          themeType="contained"
          onClick={() => { onSaveClicked(); }}
        >
          Save
        </Button>
        {mutation && mutation.isError && <p>{mutation.error.message}</p>}
      </>
      <Button
        themeType="contained"
        onClick={() => { onCancelClicked(); }}
      >
        Cancel
      </Button>
    </>
  );
};

export default NewBottleButtons;
