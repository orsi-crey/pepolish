import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-md';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import BottleTable from '../../components/bottle-table/bottle-table.component';
import {
  getItemQuery,
  getItemsByWhereQuery,
  getProductIDWhereQuery,
  mutationResult,
  updateItem,
} from '../../utils/firestore/firestore.utils';
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
  selectedProduct: ProductData;
  selectedUser: string;
  selectedLocationUser: string;
  editable: boolean;
  setbottle: (v: PolishBottle | DocumentData) => void;
  setselectedproduct: (v: ProductData) => void;
  setselecteduser: (v: string) => void;
  setselectedlocationuser: (v: string) => void;
  newBottle: boolean;
};

export type ProductData = {
  brand: string;
  name: string;
};

const Bottle = () => {
  const navigate = useNavigate();
  const { bottleId } = useParams();
  const [editable, setEditable] = useState(false);
  const [bottle, setBottle] = useState({} as PolishBottle | DocumentData);
  const [selectedProduct, setSelectedProduct] = useState({
    brand: '',
    name: '',
  });
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedLocationUser, setSelectedLocationUser] = useState('');

  const getProductIDQuery = getProductIDWhereQuery(
    selectedProduct.brand,
    selectedProduct.name,
    selectedProduct.brand.length > 0 && selectedProduct.name.length > 0
  );
  const getUserName = getItemsByWhereQuery(selectedUser, 'displayName', 'users', selectedUser.length>0);
  const getLocationUserName = getItemsByWhereQuery(selectedLocationUser, 'displayName', 'users', selectedLocationUser.length>0);

  const bottleQuery = getItemQuery(bottleId, 'bottles');

  if (bottleQuery && bottleQuery.data && Object.keys(bottle).length === 0) {
    setBottle(bottleQuery.data);
  }

  const mutation = updateItem(bottleId, 'bottles');

  const bottleMissingData = () => {
    if (
      bottle.productId.length > 0 &&
      bottle.userId.length > 0 &&
      bottle.locationUserId.length > 0
    )
      return false;
    else return true;
  };
 
  const setEditableFromChild = (editable: boolean) => {
    setEditable(editable);
  };

  const setProductFromChild = (data: ProductData) => {
    setSelectedProduct(data);
  };

  const setUsernameFromChild = (name: string) => {    
    setSelectedUser(name);
  };

  const setLocationUsernameFromChild = (name: string) => {
    setSelectedLocationUser('');
    setSelectedLocationUser(name);
  };

  const saveClickedFromChild = () => {
    if (bottleMissingData())
      alert('Please fill all required fields before saving!');
    else {
      mutation && mutation.mutate(bottle);
      // it seemed like refetch does nothing?
      bottleQuery?.remove();
      setEditable(false);
    }
  };

  const cancelClickedFromChild = () => {
    if (bottleQuery && bottleQuery.data) setBottle(bottleQuery.data);
    setEditable(false);
  };

  const setBottleFromChild = (bottle: PolishBottle | DocumentData) => {
    setBottle(bottle);
  };  

  useEffect(() => {
    if (getProductIDQuery.isSuccess && getProductIDQuery.data?.docs) {
      const productId = getProductIDQuery.data?.docs[0].id;
      setBottle({ ...bottle, productId });
    }
  }, [getProductIDQuery.dataUpdatedAt]);

  useEffect(() => {
    if (getUserName.isSuccess && getUserName.data?.docs) {
      const userId = getUserName.data?.docs[0].id;
      setBottle({ ...bottle, userId });
    }
  }, [getUserName.dataUpdatedAt]);

  useEffect(() => {
    if (getLocationUserName.isSuccess && getLocationUserName.data?.docs) {
      const locationUserId = getLocationUserName.data?.docs[0].id;
      setBottle({ ...bottle, locationUserId });
    }
  }, [getLocationUserName.dataUpdatedAt]);

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
            selectedProduct={selectedProduct}
            selectedUser={selectedUser}
            selectedLocationUser={selectedLocationUser}
            editable={editable}
            setbottle={setBottleFromChild}
            setselectedproduct={setProductFromChild}
            setselecteduser={setUsernameFromChild}
            setselectedlocationuser={setLocationUsernameFromChild}
            newBottle={false}
          ></BottleTable>
          <img key={bottle.photoUrl} src={bottle.photoUrl} />
        </>
      )}
    </BottleContainer>
  );
};

export default Bottle;
