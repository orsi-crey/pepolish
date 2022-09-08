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
          <Button theme="primary" onClick={() => navigate('/users')}>
              Click to check users!
          </Button>
        </div>
        <div>
          <Button theme="primary" onClick={() => navigate('/products')}>
              Click to check polishes!
          </Button>
        </div>
        <div>
          <Button theme="primary" onClick={() => navigate('/bottles')}>
              Click to check polish bottles!
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