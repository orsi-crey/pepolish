import { DocumentData } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-md';

import { authState, UserContext } from '../contexts/user.context';
import { getListQuery, updateItem } from '../utils/firestore/firestore.utils';

const FavoriteToggle = ({ productId }: { productId: string }) => {
  const { isLoggedIn, ownUserId } = useContext(UserContext);
  const [ownUserData, setOwnUserData] = useState({} as DocumentData);
  const [isFavorite, setIsFavorite] = useState(false);

  const userList = getListQuery('users').data;
  const userMutation = updateItem(ownUserId, 'users');

  if (isLoggedIn === authState.SignedIn && userList && Object.keys(ownUserData).length === 0) {
    setOwnUserData(userList?.get(ownUserId) || {});
  }

  const toggleFavorite = () => {
    const favorites = ownUserData?.userdata?.favorites || [];
    const index = favorites?.indexOf(productId ? productId : '');

    // removing fav
    if (isFavorite && index !== -1) {
      favorites.splice(index, 1);
    }
    // adding fav
    if (!isFavorite && index === -1 && productId) {
      favorites.push(productId);
    }
    const userdataToSet = { ...ownUserData, userdata: { ...ownUserData.userdata, favorites: favorites } };
    userMutation && userMutation.mutate(userdataToSet);
    setOwnUserData(userdataToSet);
  };

  useEffect(() => {
    setIsFavorite(ownUserData?.userdata?.favorites?.includes(productId ? productId : ''));
  }, [isLoggedIn, ownUserData, productId]);

  return (
    <Button buttonType="icon" themeType="outline" onClick={toggleFavorite} style={{ fontSize: 20 }}>
      {isFavorite ? '💔' : '❤️'}
    </Button>
  );
};

export default FavoriteToggle;
