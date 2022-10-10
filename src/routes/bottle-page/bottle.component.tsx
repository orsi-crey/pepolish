import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBackSVGIcon, Button, Dialog, DialogContent, DialogHeader, DialogTitle, Grid, GridCell, TextIconSpacing } from 'react-md';
import { DocumentData } from 'firebase/firestore';

import BottleTable from '../../components/bottle-table.component';
import { getListQuery, updateItem } from '../../utils/firestore/firestore.utils';
import EditBottleButtons from '../../components/edit-bottle-buttons';

import { BottleContainer, PaddedDiv, PaddedMediaContainer } from './bottle.styles';
import { ProductData } from './bottle.types';
import {
  getDisplayName,
  getProductBrand,
  getProductIdByProductData,
  getProductName,
  getUserIdByDisplayname,
} from '../../utils/helperFunctions';
import { authState, UserContext } from '../../contexts/user.context';

const Bottle = () => {
  const navigate = useNavigate();
  const { bottleId } = useParams();
  const { isLoggedIn } = useContext(UserContext);
  const [editable, setEditable] = useState(false);
  const [bottle, setBottle] = useState({} as DocumentData);
  const [selectedProduct, setSelectedProduct] = useState({} as ProductData);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedLocationUser, setSelectedLocationUser] = useState('');
  const [showImageFull, setShowImageFull] = useState(false);

  const bottleListQuery = getListQuery('bottles');
  const bottleList = bottleListQuery.data;
  const productList = getListQuery('products').data;
  const userList = getListQuery('users').data;
  const mutation = updateItem(bottleId, 'bottles');

  if (bottleList && userList && bottleId && Object.keys(bottle).length === 0) {
    setBottle(bottleList?.get(bottleId) || {});
  }

  if (userList && Object.keys(bottle).length > 0 && selectedUser === '' && selectedLocationUser === '') {
    setSelectedUser(getDisplayName(userList, bottle.userId));
    setSelectedLocationUser(getDisplayName(userList, bottle.locationUserId));
  }

  if (productList && Object.keys(bottle).length > 0 && Object.keys(selectedProduct).length === 0) {
    setSelectedProduct({
      brand: getProductBrand(productList, bottle.productId),
      name: getProductName(productList, bottle.productId),
    });
  }

  const bottleMissingData = () => {
    if (bottle.productId.length > 0 && bottle.userId.length > 0 && bottle.locationUserId.length > 0) {
      return false;
    } else return true;
  };

  const setProductFromChild = (data: ProductData) => {
    setSelectedProduct(data);
    if (productList) {
      const productId = getProductIdByProductData(productList, data);
      setBottle({ ...bottle, productId });
    }
  };

  const setUserFromChild = (displayName: string) => {
    const userId = getUserIdByDisplayname(userList, displayName);
    setSelectedUser(displayName);
    setBottle({ ...bottle, userId });
  };

  const setLocationUserFromChild = (locationDisplayName: string) => {
    const locationUserId = getUserIdByDisplayname(userList, locationDisplayName);
    setSelectedLocationUser(locationDisplayName);
    setBottle({ ...bottle, locationUserId });
  };

  const saveClickedFromChild = () => {
    if (bottleMissingData()) alert('Please fill all required fields before saving!');
    else {
      mutation && mutation.mutate(bottle);
      setEditable(false);
    }
  };

  const cancelClickedFromChild = () => {
    if (bottleList && bottleId) setBottle(bottleList?.get(bottleId) || {});
    setEditable(false);
  };

  return (
    <BottleContainer>
      <PaddedDiv>
        <Button themeType="contained" onClick={() => navigate('/bottles')}>
          <TextIconSpacing icon={<ArrowBackSVGIcon />}>Back to bottle list</TextIconSpacing>
        </Button>
      </PaddedDiv>
      {bottleList && (
        <>
        {isLoggedIn === authState.SignedIn && (
          <PaddedDiv>
            <EditBottleButtons
              editable={editable}
              seteditable={(editable: boolean) => setEditable(editable)}
              onSaveClicked={saveClickedFromChild}
              onCancelClicked={cancelClickedFromChild}
              mutation={mutation}
            />
          </PaddedDiv>
          )}
          <Grid>
            <GridCell colSpan={7}>
              <BottleTable
                bottleId={bottleId}
                bottle={bottle}
                selectedProduct={selectedProduct}
                selectedUser={selectedUser}
                selectedLocationUser={selectedLocationUser}
                editable={editable}
                setbottle={(bottle: DocumentData) => setBottle(bottle)}
                setselectedproduct={setProductFromChild}
                setselecteduser={setUserFromChild}
                setselectedlocationuser={setLocationUserFromChild}
                newBottle={false}
              ></BottleTable>
            </GridCell>
            <GridCell colSpan={5}>
              <PaddedMediaContainer>
                {bottle.photoUrl ? (
                  <>
                    <img onClick={() => setShowImageFull(true)} src={bottle.photoUrl} />
                    <Dialog
                      id={`${bottleId}-img`}
                      visible={showImageFull}
                      onRequestClose={() => setShowImageFull(false)}
                      aria-labelledby="dialog-title"
                    >
                      <DialogHeader>
                        <DialogTitle id="dialog-title">{'Photo'}</DialogTitle>
                      </DialogHeader>
                      <DialogContent>
                        <img onClick={() => setShowImageFull(false)} src={bottle.photoUrl} />
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
