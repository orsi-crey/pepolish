import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowBackSVGIcon,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Divider,
  Grid,
  GridCell,
  TextIconSpacing,
} from 'react-md';
import { useContext, useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import ProductTable from '../../components/product-table.component';
import {
  getListQuery,
  mutationResult,
  updateItem,
} from '../../utils/firestore/firestore.utils';
import { Polish } from '../../store/product/product.types';
import EditProductButtons from '../../components/edit-product-buttons';

import { PaddedDiv, PaddedMediaContainer, ProductContainer } from './product.styles';
import { UserContext, authState } from '../../contexts/user.context';
import { uploadDataToUser } from '../../utils/firebase/firebase.utils';

export type ProductButtonProps = {
  editable: boolean;
  seteditable: (v: boolean) => void;
  onSaveClicked: () => void;
  onCancelClicked: () => void;
  mutation: mutationResult | undefined;
};

export type ProductTableProps = {
  product: Polish | DocumentData;
  productId: string | undefined;
  editable: boolean;
  setproduct: (v: Polish | DocumentData) => void;
};

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { isLoggedIn, userdata, setUserdata } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [editable, setEditable] = useState(false);
  const [product, setProduct] = useState({} as Polish | DocumentData);
  const [showImageFull, setShowImageFull] = useState(false);

  const productsQuery = getListQuery('products');
  if (productsQuery && productsQuery.data && Object.keys(product).length === 0) {
    const productToSet = productsQuery.data.docs.find((doc) => doc.id === productId);
    if (productToSet) setProduct(productToSet.data());
  }

  const bottlesQuery = getListQuery('bottles');
  const userIds: string[] = [];
  if (bottlesQuery && bottlesQuery.data && userIds.length === 0) {
    const relevantBottles = bottlesQuery.data.docs.filter((doc) => doc.data().productId === productId);
    relevantBottles.forEach((doc) => {
      userIds.push(doc.data().userId);
    });
  }

  const userQuery = getListQuery('users');
  const users = userQuery?.data?.docs?.filter((doc) => userIds.includes(doc.id));

  const mutation = updateItem(productId, 'products');

  useEffect(() => {
    setIsFavorite(userdata?.favorites?.includes(productId ? productId : ''));
  }, [isLoggedIn, userdata.favorites]);

  const toggleFavorite = () => {
    const favorites = userdata?.favorites;
    const index = favorites.indexOf(productId ? productId : '');
    if (isFavorite && index !== -1) {
      setUserdata({ ...userdata, favorites: favorites.splice(index, 1) });
    }
    if (!isFavorite && index === -1 && productId) {
      favorites.push(productId);
      setUserdata({ ...userdata, favorites: favorites });
    }
    uploadDataToUser({ userdata: userdata });
    setIsFavorite(!isFavorite);
  };

  const productMissingData = () => {
    if (product.brand.length > 0 && product.name.length > 0 && product.color.length > 0) return false;
    else return true;
  };

  const owningUsers = () => {
    return users?.map((item: DocumentData) => {
      return (
        <div key={item.id}>
          • <Link to={`/users/${item.id}`}>{item.data().displayName}</Link>
        </div>
      );
    });
  };

  const setEditableFromChild = (editable: boolean) => {
    setEditable(editable);
  };

  const saveClickedFromChild = () => {
    if (productMissingData()) alert('Please fill all required fields before saving!');
    else {
      mutation && mutation.mutate(product);
      // it seemed like refetch does nothing?
      productsQuery?.remove();
      setEditable(false);
    }
  };

  const cancelClickedFromChild = () => {
    if (productsQuery && productsQuery.data) setProduct(productsQuery.data);
    setEditable(false);
  };

  const setProductFromChild = (product: Polish | DocumentData) => {
    setProduct(product);
  };

  return (
    <ProductContainer>
      <PaddedDiv>
        <Button themeType="contained" onClick={() => navigate('/products')}>
          <TextIconSpacing icon={<ArrowBackSVGIcon />}>Back to product list</TextIconSpacing>
        </Button>
        {isLoggedIn === authState.SignedIn && (
          <Button buttonType="icon" themeType="contained" onClick={toggleFavorite}>
            {isFavorite ? '💔' : '❤️'}
          </Button>
        )}
      </PaddedDiv>
      {productsQuery && productsQuery.isSuccess && productsQuery.data && (
        <>
          <PaddedDiv>
            <EditProductButtons
              editable={editable}
              seteditable={setEditableFromChild}
              onSaveClicked={saveClickedFromChild}
              onCancelClicked={cancelClickedFromChild}
              mutation={mutation}
            />
          </PaddedDiv>
          <Grid>
            <GridCell colSpan={7}>
              <ProductTable productId={productId} product={product} editable={editable} setproduct={setProductFromChild} />
            </GridCell>
            <GridCell colSpan={5}>
              <PaddedMediaContainer>
                {product.imageUrl ? (
                  <>
                    <img onClick={() => setShowImageFull(true)} src={product.imageUrl} />
                    <Dialog
                      id={`${productId}-img`}
                      visible={showImageFull}
                      onRequestClose={() => setShowImageFull(false)}
                      aria-labelledby="dialog-title"
                    >
                      <DialogHeader>
                        <DialogTitle id="dialog-title">{`${product.brand} - ${product.name}`}</DialogTitle>
                      </DialogHeader>
                      <DialogContent>
                        <img onClick={() => setShowImageFull(false)} src={product.imageUrl} />
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  'No photo'
                )}
              </PaddedMediaContainer>
              <Divider />
              {productsQuery && productsQuery.isSuccess && userQuery.isSuccess && userQuery.data?.docs?.length > 0 && (
                <>
                  <p>List of users who own this polish:</p>
                  {owningUsers()}
                </>
              )}
            </GridCell>
          </Grid>
        </>
      )}
    </ProductContainer>
  );
};

export default Product;
