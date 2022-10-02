import { useContext, useState } from 'react';
import { Button, TextField } from 'react-md';

import { authState, UserContext } from '../../contexts/user.context';
import { uploadDataToUser } from '../../utils/firebase/firebase.utils';

import { MyProfileContainer } from './profile.styles';

const MyProfile = () => {
  const { isLoggedIn, username, userdata, setUserdata } = useContext(UserContext);
  const [edited, setEdited] = useState(false);

  const userdataSaveHandler = () => {
    uploadDataToUser({ userdata: userdata });
    setEdited(false);
  };

  return (
    <MyProfileContainer>
      {isLoggedIn === authState.SignedIn ? (
        <>
          <div>
            <h2>Hi {username}!</h2>
            <p>Your profile details:</p>
          </div>
          <TextField
            id="name"
            label="Name"
            name="name"
            value={userdata.name}
            onChange={(event) => {
              setEdited(true);
              setUserdata({ ...userdata, name: event.currentTarget.value });
            }}
          />
          <TextField
            id="city"
            label="City"
            name="city"
            value={userdata.city}
            onChange={(event) => {
              setEdited(true);
              setUserdata({ ...userdata, city: event.currentTarget.value });
            }}
          />
          <TextField
            id="profilePic"
            label="profilePic"
            name="profilePic"
            value={userdata.profilePic}
            onChange={(event) => {
              setEdited(true);
              setUserdata({ ...userdata, profilePic: event.currentTarget.value });
            }}
          />
          <img src={userdata.profilePic} />
          <div>
            <Button theme="primary" themeType="contained" disabled={!edited} onClick={userdataSaveHandler}>
              Save data
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>Hi! You're not logged in!</div>
        </>
      )}
    </MyProfileContainer>
  );
};

export default MyProfile;
