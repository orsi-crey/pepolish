import { Button } from 'react-md';
import { ProductButtonProps } from '../../routes/product-page/product.component';

const EditProductButtons = ({
  editable,
  seteditable,
  onSaveClicked,
  onCancelClicked,
  mutation
}: ProductButtonProps) => {

  return (
    <>
      {!editable ? (
        <Button
          themeType="contained"
          onClick={() => {
            seteditable(true);
          }}
        >
          Edit this product
        </Button>
      ) : (
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
      )}
    </>
  );
};

export default EditProductButtons;
