import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowBackSVGIcon,
  Button,
  Divider,
  Grid,
  GridCell,
  MediaContainer,
  TextIconSpacing,
} from 'react-md';
import { useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import ProductTable from '../../components/product-table/product-table.component';
import {
  getItemQuery,
  getItemsByWhereQuery,
  getListSubsetQuery,
  mutationResult,
  updateItem,
} from '../../utils/firestore/firestore.utils';
import { Polish } from '../../store/product/product.types';
import EditProductButtons from '../../components/edit-product-buttons/edit-product-buttons';

import { PaddedDiv, PaddedMediaContainer, ProductContainer } from './product.styles';

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
  const [editable, setEditable] = useState(false);
  const [product, setProduct] = useState({} as Polish | DocumentData);

  const productQuery = getItemQuery(productId, 'products');
  if (productQuery && productQuery.data && Object.keys(product).length === 0) {
    setProduct(productQuery.data);
  }

  const bottlesQuery = getItemsByWhereQuery(productId, 'productId', 'bottles');
  const userIds: string[] = ['-'];
  bottlesQuery?.data?.docs.forEach((item) => {
    userIds.push(item.data().userId);
  });

  const userQuery = getListSubsetQuery(
    userIds,
    'users',
    bottlesQuery.isSuccess
  );

  const mutation = updateItem(productId, 'products');

  const productMissingData = () => {
    if (
      product.brand.length > 0 &&
      product.name.length > 0 &&
      product.color.length > 0
    )
      return false;
    else return true;
  };

  const owningUsers = () => {
    return userQuery.data?.docs.map((item: any) => {
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
    if (productMissingData())
      alert('Please fill all required fields before saving!');
    else {
      mutation && mutation.mutate(product);
      // it seemed like refetch does nothing?
      productQuery?.remove();
      setEditable(false);
    }
  };

  const cancelClickedFromChild = () => {
    if (productQuery && productQuery.data) setProduct(productQuery.data);
    setEditable(false);
  };

  const setProductFromChild = (product: Polish | DocumentData) => {
    setProduct(product);
  };

  return (
    <ProductContainer>
      <PaddedDiv>
        <Button themeType="contained" onClick={() => navigate('/products')}>
          <TextIconSpacing icon={<ArrowBackSVGIcon />}>
            Back to product list
          </TextIconSpacing>
        </Button>
      </PaddedDiv>
      {productQuery && productQuery.isSuccess && productQuery.data && (
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
              <ProductTable
                productId={productId}
                product={product}
                editable={editable}
                setproduct={setProductFromChild}
              />
            </GridCell>
            <GridCell colSpan={5}>
              <PaddedMediaContainer>
                {product.imageUrl ? <img src={product.imageUrl} /> : 'No photo'}
              </PaddedMediaContainer>
              <Divider />
              {productQuery &&
                productQuery.isSuccess &&
                userQuery.isSuccess &&
                userQuery.data?.docs?.length > 0 && (
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
