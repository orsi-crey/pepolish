import { Button } from '@react-md/button';
import { useContext, useEffect } from 'react';
import { MediaContainer } from 'react-md';
import { Link, useNavigate } from 'react-router-dom';

import {
  authState,
  initialUserdata,
  UserContext,
} from '../../contexts/user.context';
import { getAllUserData } from '../../utils/firebase/firebase.utils';
import { HomeContainer } from './home.styles';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, userdata, setUserdata } =
    useContext(UserContext);

  function handleLoginClick() {
    navigate('/sign-in');
  }

  useEffect(() => {
    (async () => {
      const data = await getAllUserData();
      if (data?.userdata) {
        setUserdata({ ...initialUserdata, ...data?.userdata });
      }
    })();
  }, [isLoggedIn]);

  const homeLinks = () => {
    switch (isLoggedIn) {
    case authState.LoggedOut:
      return (
        <>
          <div>Hi!</div>
          <div>
            <div>
              <Button
                theme="primary"
                themeType="contained"
                onClick={handleLoginClick}
              >
                  Click to log in
              </Button>
            </div>
            <MediaContainer>
              <img src="pepolish.png"></img>
            </MediaContainer>
          </div>
        </>
      );
    case authState.SignedIn:
      return (
        <div>
          <div>Hi {username}!</div>
          <div>Your favorite polishes: </div>
          {userdata.favorites.map((item) => {
            return (
              <div key={item}>
                <Link to={`/products/${item}`}>{item}</Link>
              </div>
            );
          })}
        </div>
      );
    case authState.Loading:
      return <div>loading...</div>;
    default:
      return;
    }
  };

  return <HomeContainer>{homeLinks()}</HomeContainer>;
};

export default Home;
