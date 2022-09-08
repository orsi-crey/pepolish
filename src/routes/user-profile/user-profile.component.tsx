import { Button, TextField } from 'react-md';
import { useNavigate, useParams } from 'react-router-dom';

import { getItemQuery } from '../../utils/firestore/firestore.utils';

import { UserProfileContainer } from './user-profile.styles';


const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userQuery = getItemQuery(userId, 'users');

  return (
    <UserProfileContainer>
      <Button themeType="contained" onClick={() => navigate('/users')}>
        Back to user list
      </Button>
      {userQuery.isSuccess && userQuery.data && (
        <>
          <div><img src={ userQuery.data?.userdata?.profilePic } /></div>
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
        </>
      )}
    </UserProfileContainer>
  );
};

export default UserProfile;
