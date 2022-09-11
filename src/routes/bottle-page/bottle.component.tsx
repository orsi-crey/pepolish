import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-md';
import { useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import BottleTable from '../../components/bottle-table/bottle-table.component';
import { getItemQuery, mutationResult, updateItem } from '../../utils/firestore/firestore.utils';
import { PolishBottle } from '../../store/product/product.types';
import EditBottleButtons from '../../components/edit-bottle-buttons/edit-bottle-buttons';

import { BottleContainer } from './bottle.styles';

export type BottleButtonProps = {
  editable: boolean;
  seteditable: (v: boolean) => void;
  onSaveClicked: () => void;
  onCancelClicked: () => void;
  mutation: mutationResult | undefined;
};

export type BottleTableProps = {
  bottleId: string | undefined;
  bottle: PolishBottle | DocumentData;
  editable: boolean;
  setbottle: (v: PolishBottle | DocumentData) => void;
};

const Bottle = () => {
  const navigate = useNavigate();
  const { bottleId } = useParams();
  const [editable, setEditable] = useState(false);
  const [bottle, setBottle] = useState({} as PolishBottle | DocumentData);

  const bottleQuery = getItemQuery(bottleId, 'bottles');

  if (bottleQuery && bottleQuery.data && Object.keys(bottle).length === 0) { setBottle(bottleQuery.data); }

  const mutation = updateItem(bottleId, 'bottles');

  const setEditableFromChild = (editable: boolean) => {
    setEditable(editable);
  };
  
  const saveClickedFromChild = () => {
    mutation && mutation.mutate(bottle);
    setEditable(false);
  };

  const cancelClickedFromChild = () => {
    if (bottleQuery && bottleQuery.data) setBottle(bottleQuery.data);
    setEditable(false);
  };

  const setBottleFromChild = (bottle: PolishBottle | DocumentData) => {
    setBottle(bottle);
  };

  return (
    <BottleContainer>
      <Button themeType="contained" onClick={() => navigate('/bottles')}>
        Back to bottle list
      </Button>
      {bottleQuery && bottleQuery.isSuccess && bottleQuery.data && (
        <>
          <EditBottleButtons
            editable={editable}
            seteditable={setEditableFromChild}
            onSaveClicked={saveClickedFromChild}
            onCancelClicked={cancelClickedFromChild}
            mutation={mutation}
          />
          <BottleTable
            bottleId={bottleId}
            bottle={bottle}
            editable={editable}
            setbottle={setBottleFromChild}
          ></BottleTable>
          <img key={bottle.photoUrl} src={bottle.photoUrl} />
        </>
      )}
    </BottleContainer>
  );
};

export default Bottle;
