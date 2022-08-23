import { Button } from 'react-md';
import { ProductButtonProps } from '../../routes/product-page/product.component';
import { updateProduct } from '../../utils/firestore/firestore.utils';



const EditProductButtons = ({
  product,
  editable,
  seteditable,
}: ProductButtonProps) => {
  const mutation = updateProduct(product);

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
              disabled={mutation.isLoading}
              themeType="contained"
              onClick={() => {
                mutation.mutate(product);
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
              seteditable(false);
            }}
          >
            Cancel
          </Button>
        </>
      )}
    </>
  );
};

export default EditProductButtons;
