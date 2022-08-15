import { Button } from '@react-md/button';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { authState, UserContext } from '../../contexts/user.context';
import { HomeContainer } from './home.styles';

const Home = () => {
  const navigate = useNavigate();

  const { isLoggedIn, username } = useContext(UserContext);

  function handleLoginClick() {
    navigate('/sign-in');
  }
  function handleProfileClick() {
    navigate('/profile');
  }

  const homeLinks = () => {
    switch (isLoggedIn) {
    case authState.LoggedOut:
      return <>
        <div>Hi!</div>
        <div>
          <Button theme="primary" themeType="contained" onClick={handleLoginClick}>
              Click to log in
          </Button>
        </div>
      </>;
    case authState.SignedIn:
      return <>
        <div>Hi {username}!</div>
        <div>
          <Button theme="primary" onClick={handleProfileClick}>
              Click to edit profile!
          </Button>
        </div>
      </>;
    case authState.Loading:
      return <div>loading...</div>;
    default:
      return;
    }
  };


  return (
    <HomeContainer>
      { homeLinks() }
    </HomeContainer>

  );
};

export default Home;