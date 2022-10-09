import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBackSVGIcon, Button, Dialog, DialogContent, DialogHeader, DialogTitle, Grid, GridCell, TextIconSpacing } from 'react-md';
import { DocumentData } from 'firebase/firestore';

import BottleTable from '../../components/bottle-table.component';
import { getListQuery, updateItem } from '../../utils/firestore/firestore.utils';
import { PolishBottle } from '../product-page/product.types';
import EditBottleButtons from '../../components/edit-bottle-buttons';

import { BottleContainer, PaddedDiv, PaddedMediaContainer } from './bottle.styles';
import { ProductData } from './bottle.types';

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

  const bottleListQuery = getListQuery('bottles');
  const bottleList = bottleListQuery.data;
  const productList = getListQuery('products').data;
  const userList = getListQuery('users').data;
  const mutation = updateItem(bottleId, 'bottles');

  if (bottleList && userList && bottleId && Object.keys(bottle).length === 0) {
    setBottle(bottleList?.get(bottleId) || {});
  }

  const bottleMissingData = () => {
    if (bottle.productId.length > 0 && bottle.userId.length > 0 && bottle.locationUserId.length > 0) {
      return false;
    } else return true;
  };

  const setEditableFromChild = (editable: boolean) => {
    setEditable(editable);
  };

  const setProductFromChild = (data: ProductData) => {
    setSelectedProduct(data);
    if (productList) {
      const productId = Object.getOwnPropertyNames(productList).filter(
        (productId) => productList?.get(productId)?.brand === data.brand && productList?.get(productId)?.name === data.name
      );
      setBottle({ ...bottle, productId });
    }
  };

  const setUsernameFromChild = (name: string) => {
    setSelectedUser(name);
    if (userList) {
      const userId = Object.getOwnPropertyNames(userList).filter((userId) => userList?.get(userId)?.displayName === name);
      setBottle({ ...bottle, userId });
    }
  };

  const setLocationUsernameFromChild = (name: string) => {
    setSelectedLocationUser(name);
    if (userList) {
      const locationUserId = Object.getOwnPropertyNames(userList).filter((userId) => userList?.get(userId)?.displayName === name);
      setBottle({ ...bottle, locationUserId });
    }
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

  const setBottleFromChild = (bottle: PolishBottle | DocumentData) => {
    setBottle(bottle);
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
