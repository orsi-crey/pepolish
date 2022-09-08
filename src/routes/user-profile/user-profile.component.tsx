import { Button, TextField } from 'react-md';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getItemQuery, getItemsByWhereQuery, getListSubsetQuery } from '../../utils/firestore/firestore.utils';

import { UserProfileContainer } from './user-profile.styles';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userQuery = getItemQuery(userId, 'users');

  const bottleQuery = getItemsByWhereQuery(userId, 'userId', 'bottles');

  const productsList: string[] = ['-'];
  bottleQuery.data?.docs.forEach(element => {
    productsList.push(element.data().productId);
  });

  const productsQuery = getListSubsetQuery(productsList, 'products', bottleQuery.isSuccess);

  const productsMap = new Map<string, string>();
  productsQuery.data?.docs?.forEach(item => {
    productsMap.set(item.id, `${item.data().brand} - ${item.data().name}`);
  });

  const ownedProducts = () => {
    if (bottleQuery.isSuccess && bottleQuery.data?.docs.length === 0) {
      return <div>No polishes!</div>;
    }
    return bottleQuery.data?.docs.map((item: any) => {
      return <div key={item.id}>
        • <Link to={`/bottles/${item.id}`}>{productsMap.get(item.data().productId)}</Link>
      </div>;
    });
  };

  return (
    <UserProfileContainer>
      <Button themeType="contained" onClick={() => navigate('/users')}>
        Back to user list
      </Button>
      {userQuery.isSuccess && userQuery.data && (
        <>
          <div><img src={userQuery.data?.userdata?.profilePic} /></div>
          <p>User Id:</p>
          <TextField
            id="userId"
            name="User Id"
            disabled={true}
            value={userId}
          />
          <p>Name:</p>
          <TextField
            id="displayName"
            name="Display name"
            disabled={true}
            value={userQuery.data?.displayName}
          />
          <p>City:</p>
          <TextField
            id="city"
            name="City"
            disabled={true}
            value={userQuery.data?.userdata?.city}
          />
          <p>Polishes owned by {userQuery.data?.displayName}:</p>
          {ownedProducts()}
        </>
      )}
    </UserProfileContainer>
  );
};

export default UserProfile;
