import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { Button, TextField } from 'react-md';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getItemQuery, getItemsByWhereQuery, getListQuery, getListSubsetQuery } from '../../utils/firestore/firestore.utils';

import { UserProfileContainer } from './user-profile.styles';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({} as DocumentData);
  const [products, setProducts] = useState([] as QueryDocumentSnapshot<DocumentData>[]);

  const userQuery = getListQuery('users');
  const productsQuery = getListQuery('products');
  const bottlesQuery = getListQuery('bottles');

  // get all relevant info and save in state
  if (userQuery && userQuery.data && Object.keys(user).length === 0) {
    const userToSet = userQuery.data.docs.find((doc) => doc.id === userId);
    if (userToSet) setUser(userToSet.data());
  }

  const productIds: string[] = [];
  if (bottlesQuery && bottlesQuery.data && productIds.length === 0) {
    const relevantProducts = bottlesQuery.data.docs.filter((doc) => doc.data().userId === userId);
    relevantProducts.forEach((doc) => {
      productIds.push(doc.data().productId);
    });
  }
  if (productsQuery?.data?.docs && products.length === 0 && productIds.length > 0) {
    setProducts(productsQuery?.data?.docs?.filter((doc) => productIds.includes(doc.id)));
  }

  const ownedProducts = () => {
    if (products.length === 0) {
      return <div>No polishes yet!</div>;
    }
    return products.map((item) => (
      <div key={item.id}>
        • <Link to={`/bottles/${item.id}`}>{`${item.data().brand} - ${item.data().name}`}</Link>
      </div>
    ));
  };
  console.log(user);

  return (
    <UserProfileContainer>
      <Button themeType="contained" onClick={() => navigate('/users')}>
        Back to user list
      </Button>
      {userQuery && userQuery.isSuccess && userQuery.data && (
        <>
          <div>
            <img src={user?.profilePic} />
          </div>
          <p>Name:</p>
          <TextField id="displayName" name="Display name" disabled={true} value={user?.displayName} />
          <p>City:</p>
          <TextField id="city" name="City" disabled={true} value={user?.city} />
          <p>Polishes owned by {user?.displayName}:</p>
          {ownedProducts()}
        </>
      )}
    </UserProfileContainer>
  );
};

export default UserProfile;
