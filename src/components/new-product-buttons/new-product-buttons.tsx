import { Button } from 'react-md';
import { ProductButtonProps } from '../../routes/product-page/product.component';

const NewProductButtons = ({
  onSaveClicked,
  onCancelClicked,
  mutation,
}: ProductButtonProps) => {
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

export default NewProductButtons;
