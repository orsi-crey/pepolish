import { Button } from 'react-md';
import { ProductButtonProps } from '../../routes/product-page/product.component';

const NewProductButtons = ({
  onSaveClicked,
  onCancelClicked,
  mutation
}: ProductButtonProps) => {
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

export default NewProductButtons;
