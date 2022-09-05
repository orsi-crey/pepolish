import { useEffect } from 'react';
import { Button } from 'react-md';
import { useNavigate } from 'react-router-dom';
import { BottleButtonProps } from '../../routes/bottle-page/bottle.component';
import { addNewItem } from '../../utils/firestore/firestore.utils';

const NewBottleButtons = ({
  bottle,
}: BottleButtonProps) => {
  const navigate = useNavigate();
  const mutation = addNewItem('bottles');

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate(`/bottles/${mutation.data?.id}`);
    }
  }, [mutation]);

  return (
    <>
      <>
        <Button
          disabled={mutation.isLoading}
          themeType="contained"
          onClick={() => {
            mutation.mutate(bottle);
          }}
        >
          Save
        </Button>
        {mutation.isError && <p>{mutation.error.message}</p>}
      </>
      <Button
        themeType="contained"
        onClick={() => {
          navigate('/bottles');
        }}
      >
        Cancel
      </Button>
    </>
  );
};

export default NewBottleButtons;
