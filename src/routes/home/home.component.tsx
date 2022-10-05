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

  const productList = getListQuery('products').data;

  const favoritePolishes = () => {
    return (
      productList &&
      Object.getOwnPropertyNames(productList)
        .filter((productId) => userdata.favorites.includes(productId))
        .map((productId) => {
          const product = productList[productId];
          return (
            <div key={productId}>
              <Link to={`/products/${productId}`}>{`${product.brand} - ${product.name}`}</Link>
            </div>
          );
        })
    );
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
            {productList && <div>Your favorite polishes: </div>}
            {userdata.favorites.length > 0 ? productList && favoritePolishes() : 'No favorite polishes yet!'}
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
