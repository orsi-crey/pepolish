import { Button } from '@react-md/button';
import { useContext } from 'react';
import { MediaContainer } from 'react-md';
import { Link, useNavigate } from 'react-router-dom';

import { authState, UserContext } from '../../contexts/user.context';
import { getListQuery } from '../../utils/firestore/firestore.utils';
import { HomeContainer } from './home.styles';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, userdata } = useContext(UserContext);
  const productsQuery = getListQuery('products');

  const favoritePolishes = () => {
    return productsQuery?.data?.docs
      .filter((doc) => userdata.favorites.includes(doc.id))
      .map((doc) => (
        <div key={doc.id}>
          <Link to={`/products/${doc.id}`}>{`${doc.data().brand} - ${doc.data().name}`}</Link>
        </div>
      ));
  };

  const homeLinks = () => {
    switch (isLoggedIn) {
      case authState.LoggedOut:
        return (
          <>
            <div>Hi!</div>
            <div>
              <div>
                <Button theme="primary" themeType="contained" onClick={() => navigate('/sign-in')}>
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
            {productsQuery && <div>Your favorite polishes: </div>}
            {userdata.favorites.length > 0 ? productsQuery && favoritePolishes() : 'No favorite polishes yet!'}
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
