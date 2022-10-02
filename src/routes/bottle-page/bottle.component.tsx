import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowBackSVGIcon,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Grid,
  GridCell,
  TextIconSpacing,
} from 'react-md';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import BottleTable from '../../components/bottle-table.component';
import {
  getItemQuery,
  getItemsByWhereQuery,
  getProductIDWhereQuery,
  mutationResult,
  updateItem,
} from '../../utils/firestore/firestore.utils';
import { PolishBottle } from '../../store/product/product.types';
import EditBottleButtons from '../../components/edit-bottle-buttons';

import { BottleContainer, PaddedDiv, PaddedMediaContainer } from './bottle.styles';

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
  const [showImageFull, setShowImageFull] = useState(false);

  const getProductIDQuery = getProductIDWhereQuery(
    selectedProduct.brand,
    selectedProduct.name,
    selectedProduct.brand.length > 0 && selectedProduct.name.length > 0
  );
  const getUserName = getItemsByWhereQuery(
    selectedUser,
    'displayName',
    'users',
    selectedUser.length > 0
  );
  const getLocationUserName = getItemsByWhereQuery(
    selectedLocationUser,
    'displayName',
    'users',
    selectedLocationUser.length > 0
  );

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
      <PaddedDiv>
        <Button themeType="contained" onClick={() => navigate('/products')}>
          <TextIconSpacing icon={<ArrowBackSVGIcon />}>
            Back to product list
          </TextIconSpacing>
        </Button>
      </PaddedDiv>
      {bottleQuery && bottleQuery.isSuccess && bottleQuery.data && (
        <>
          <PaddedDiv>
            <EditBottleButtons
              editable={editable}
              seteditable={setEditableFromChild}
              onSaveClicked={saveClickedFromChild}
              onCancelClicked={cancelClickedFromChild}
              mutation={mutation}
            />
          </PaddedDiv>
          <Grid>
            <GridCell colSpan={7}>
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
            </GridCell>
            <GridCell colSpan={5}>
              <PaddedMediaContainer>
                {bottle.photoUrl ? (
                  <>
                    <img
                      onClick={() => setShowImageFull(true)}
                      src={bottle.photoUrl}
                    />
                    <Dialog
                      id={`${bottleId}-img`}
                      visible={showImageFull}
                      onRequestClose={() => setShowImageFull(false)}
                      aria-labelledby="dialog-title"
                    >
                      <DialogHeader>
                        <DialogTitle id="dialog-title">
                          {'Photo'}
                        </DialogTitle>
                      </DialogHeader>
                      <DialogContent>
                        <img
                          onClick={() => setShowImageFull(false)}
                          src={bottle.photoUrl}
                        />
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  'No photo'
                )}
              </PaddedMediaContainer>
            </GridCell>
          </Grid>
        </>
      )}
    </BottleContainer>
  );
};

export default Bottle;
