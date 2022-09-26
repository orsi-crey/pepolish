import { Button } from '@react-md/button';
import { useContext } from 'react';
import { MediaContainer } from 'react-md';
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
    // case authState.LoggedOut:
    //   return <>
    //     <div>Hi!</div>
    //     <div>
    //       <Button theme="primary" themeType="contained" onClick={handleLoginClick}>
    //           Click to log in
    //       </Button>
    //     </div>
    //   </>;
    case authState.LoggedOut:
    case authState.SignedIn:
      return (
        <div>
          <div>Hi {username}!</div>
          <MediaContainer>
            <img src="pepolish.png"></img>
          </MediaContainer>
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
