import { Button } from 'react-md';
import { useNavigate } from 'react-router-dom';
import { ProductButtonProps } from '../../routes/product-page/product.component';
import { addNewProduct } from '../../utils/firestore/firestore.utils';

const NewProductButtons = ({
  product,
  editable,
  seteditable,
}: ProductButtonProps) => {
  const navigate = useNavigate();
  const mutation = addNewProduct();

  return (
    <>
      <>
        <>
          <Button
            disabled={mutation.isLoading}
            themeType="contained"
            onClick={() => {
              console.log(mutation.mutate(product));
            }}
          >
            Save
          </Button>
          {mutation.isError && <p>{mutation.error.message}</p>}
        </>
        <Button
          themeType="contained"
          onClick={() => {
            () => navigate('/products');
          }}
        >
          Cancel
        </Button>
      </>
    </>
  );
};

export default NewProductButtons;
