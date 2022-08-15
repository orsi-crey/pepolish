import { useContext, useEffect } from 'react';
import { Button, TextField } from 'react-md';

import { authState, initialUserdata, UserContext } from '../../contexts/user.context';
import { getAllUserData, uploadDataToUser } from '../../utils/firebase/firebase.utils';

import { ProfileContainer } from './profile.styles';


const Profile = () => {
  const { isLoggedIn, username, userdata, setUserdata } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const data = await getAllUserData();
      if (data?.userdata) {
        setUserdata({ initialUserdata, ...data?.userdata });
      }
    })();
  }, [isLoggedIn]);

  const userdataSaveHandler = () => {
    uploadDataToUser({ userdata: userdata });
  }

  return (
    <ProfileContainer>
      {isLoggedIn === authState.SignedIn ?
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
            onChange={(event) => setUserdata({ ...userdata, name: event.currentTarget.value })}
          />
          <TextField
            id="city"
            label="City"
            name="city"
            value={userdata.city}
            onChange={(event) => setUserdata({ ...userdata, city: event.currentTarget.value })}
          />
          <TextField
            id="phone"
            label="Phone"
            name="phone"
            value={userdata.phone}
            onChange={(event) => setUserdata({ ...userdata, phone: event.currentTarget.value })}
          />
          <div>
            <Button theme="primary" themeType="contained" onClick={userdataSaveHandler}>
              Save data
            </Button>
          </div>
        </>
        :
        <>
          <div>Hi! You're not logged in!</div>
        </>
      }
    </ProfileContainer>
  );
};

export default Profile;