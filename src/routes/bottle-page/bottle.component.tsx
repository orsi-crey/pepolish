import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-md';
import { useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import BottleTable from '../../components/bottle-table/bottle-table.component';
import { getItemQuery } from '../../utils/firestore/firestore.utils';
import { PolishBottle } from '../../store/product/product.types';
import EditBottleButtons from '../../components/edit-bottle-buttons/edit-bottle-buttons';

import { BottleContainer } from './bottle.styles';

export type BottleButtonProps = {
  bottle: PolishBottle | DocumentData;
  bottleId: string | undefined;
  editable: boolean;
  seteditable: (v: boolean) => void;
  onCancelClicked: () => void;
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
  console.log('bottleQuery', bottleQuery);
  console.log('bottleQuery data', bottleQuery.data);

  if (bottleQuery.data && Object.keys(bottle).length === 0) { setBottle(bottleQuery.data); }

  const setEditableFromChild = (editable: boolean) => {
    setEditable(editable);
  };

  const cancelClickedFromChild = () => {
    if (bottleQuery.data) setBottle(bottleQuery.data);
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
      {bottleQuery.isSuccess && bottleQuery.data && (
        <>
          <EditBottleButtons bottle={bottle} bottleId={bottleId} editable={editable} seteditable={setEditableFromChild} onCancelClicked={cancelClickedFromChild} />
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
