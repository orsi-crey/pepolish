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
    setUser(userList?.get(userId) || {});
  }

  // 1. get bottles of this user
  // 2. go thru bottles to save product ids
  // 3. also save if the user has any bottles or not
  // 4. if not, set bottles to fake array so we skip this check
  if (bottleList && bottles.length === 0) {
    const relevantBottles = new Set<string>();
    bottleList.forEach((bottle, bottleId) => {
      if (bottle.userId === userId) {
        relevantBottles.add(bottleId);
      }
    });

    if (relevantBottles.size > 0) {
      setHasBottles(true);
      setBottles(Array.from(relevantBottles));
    } else {
      setBottles(['']);
    }
  }

  const ownedProducts = () => {
    if (!hasBottles) {
      return <div>No polishes yet!</div>;
    }
    return (
      productList &&
      bottleList &&
      bottles.map((bottleId) => {
        const bottle = bottleList.get(bottleId);
        const product = productList.get(bottle?.productId)
        return (
          <div key={bottleId}>
            • <Link to={`/bottles/${bottleId}`}>{`${product?.brand} - ${product?.name}`}</Link>
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
