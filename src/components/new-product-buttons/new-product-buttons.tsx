import { useEffect } from 'react';
import { Button } from 'react-md';
import { useNavigate } from 'react-router-dom';
import { ProductButtonProps } from '../../routes/product-page/product.component';
import { addNewProduct } from '../../utils/firestore/firestore.utils';

const NewProductButtons = ({
  product,
}: ProductButtonProps) => {
  const navigate = useNavigate();
  const mutation = addNewProduct();

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate(`/products/${mutation.data?.id}`);
    }
  }, [mutation]);

  return (
    <>
      <>
        <Button
          disabled={mutation.isLoading}
          themeType="contained"
          onClick={() => {
            mutation.mutate(product);
          }}
        >
          Save
        </Button>
        {mutation.isError && <p>{mutation.error.message}</p>}
      </>
      <Button
        themeType="contained"
        onClick={() => {
          navigate('/products');
        }}
      >
        Cancel
      </Button>
    </>
  );
};

export default NewProductButtons;
