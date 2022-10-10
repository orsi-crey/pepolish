import { DocumentData } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Button, MediaContainer, TextField } from 'react-md';
import { Link } from 'react-router-dom';

import { authState, UserContext } from '../../contexts/user.context';
import { getListQuery, updateItem } from '../../utils/firestore/firestore.utils';

import { MyProfileContainer } from './profile.styles';

const MyProfile = () => {
  const { ownUserId, isLoggedIn } = useContext(UserContext);
  const [edited, setEdited] = useState(false);
  const [user, setUser] = useState({} as DocumentData);

  const userListQuery = getListQuery('users');
  const userList = userListQuery.data;
  const mutation = updateItem(ownUserId, 'users');

  if (userList && Object.keys(user).length === 0) {
    setUser(userList.get(ownUserId) || {});
  }

  const userdataSaveHandler = () => {
    if (!user?.displayName || user?.displayName === '') alert('Please set a displayname before saving!');
    else {
      mutation && mutation.mutate(user);
      userListQuery?.remove();
      setEdited(false);
    }
  };

  return (
    <MyProfileContainer>
      {isLoggedIn === authState.SignedIn ? (
        <>
          <div>
            <h2>Hi {user?.displayName}!</h2>
            <p>Your profile details:</p>
          </div>
          <TextField
            id="name"
            label="Name"
            name="name"
            value={user?.displayName}
            onChange={(event) => {
              setEdited(true);
              setUser({ ...user, displayName: event.currentTarget.value });
            }}
          />
          <TextField
            id="city"
            label="City"
            name="city"
            value={user?.userdata?.city}
            onChange={(event) => {
              setEdited(true);
              setUser({ ...user, userdata: { city: event.currentTarget.value } });
            }}
          />
          <TextField
            id="profilePic"
            label="profilePic"
            name="profilePic"
            value={user?.userdata?.profilePic}
            onChange={(event) => {
              setEdited(true);
              setUser({ ...user, userdata: { profilePic: event.currentTarget.value } });
            }}
          />
          <div>
            <MediaContainer>
              <img src={user?.profilePic} />
            </MediaContainer>
          </div>
          <div>
            <Button theme="primary" themeType="contained" disabled={!edited} onClick={userdataSaveHandler}>
              Save data
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>Hi! You're not logged in!</div>
          <div>
            <Link to="/sign-in">Cick here to sign in</Link>
          </div>
        </>
      )}
    </MyProfileContainer>
  );
};

export default MyProfile;
