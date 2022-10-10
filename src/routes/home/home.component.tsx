import { Button } from '@react-md/button';
import { useContext, useState } from 'react';
import { MediaContainer } from 'react-md';
import { Link, useNavigate } from 'react-router-dom';

import { authState, UserContext } from '../../contexts/user.context';
import { getListQuery } from '../../utils/firestore/firestore.utils';
import { getProductBrandAndName } from '../../utils/helperFunctions';
import { HomeContainer } from './home.styles';

const Home = () => {
  const navigate = useNavigate();
  const { ownUserId, isLoggedIn } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const hasFavorites = favorites[0] !== ' ' && favorites.length > 0;

  const userList = getListQuery('users').data;
  const productList = getListQuery('products').data;

  if (userList && favorites.length === 0 && displayName.length === 0) {
    const getOwnUserdata = userList?.get(ownUserId);
    setFavorites(getOwnUserdata?.userdata?.favorites || [' ']);
    setDisplayName(getOwnUserdata?.displayName || '');
  }

  const favoritePolishes = () => {
    return (
      productList &&
      favorites?.map((productId) => {
        return (
          <div key={productId}>
            <Link to={`/products/${productId}`}>{getProductBrandAndName(productList, productId)}</Link>
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
          <div>Hi {displayName}!</div>
          {productList && <div>Your favorite polishes: </div>}
          {hasFavorites ? productList && favoritePolishes() : 'No favorite polishes yet!'}
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
