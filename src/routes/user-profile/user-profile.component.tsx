import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { Button, TextField } from 'react-md';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getListQuery } from '../../utils/firestore/firestore.utils';

import { UserProfileContainer } from './user-profile.styles';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({} as DocumentData);
  const [hasBottles, setHasBottles] = useState(false);
  const [bottles, setBottles] = useState([] as string[]);

  const bottleList = getListQuery('bottles').data;
  const productList = getListQuery('products').data;
  const userList = getListQuery('users').data;

  if (userList && userId && Object.keys(user).length === 0) {
    setUser(userList[userId]);
  }

  // 1. get bottles of this user
  // 2. go thru bottles to save product ids
  // 3. also save if the user has any bottles or not
  if (bottleList && productList && bottles.length === 0) {
    const relevantBottles = Object.getOwnPropertyNames(bottleList).filter((bottleId: string) => bottleList[bottleId].userId === userId);
    if (relevantBottles.length !== 0) {
      setHasBottles(true);
      setBottles(relevantBottles);
    }
  }

  const ownedProducts = () => {
    if (!hasBottles) {
      return <div>No polishes yet!</div>;
    }
    return (
      productList &&
      bottleList &&
      bottles.map((item) => {
        const bottle = bottleList[item];
        return (
          <div key={item}>
            • <Link to={`/bottles/${item}`}>{`${productList[bottle.productId].brand} - ${productList[bottle.productId].name}`}</Link>
          </div>
        );
      })
    );
  };

  return (
    <UserProfileContainer>
      <Button themeType="contained" onClick={() => navigate('/users')}>
        Back to user list
      </Button>
      {userList && (
        <>
          <div>
            <img src={user?.userdata?.profilePic} />
          </div>
          <p>Name:</p>
          <TextField id="displayName" name="Display name" disabled={true} value={user?.displayName} />
          <p>City:</p>
          <TextField id="city" name="City" disabled={true} value={user?.userdata?.city} />
          <p>Polishes owned by {user?.displayName}:</p>
          {ownedProducts()}
        </>
      )}
    </UserProfileContainer>
  );
};

export default UserProfile;
