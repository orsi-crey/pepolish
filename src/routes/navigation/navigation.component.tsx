import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer } from './navigation.styles';


const Navigation = () => {
  const { isLoggedIn, clearUserData } = useContext(UserContext);

  const signOutHandler = () => {
    signOutUser();
    clearUserData();
  };

  return (
    <div>
      <NavigationContainer>
        <h2>🐸 pepolish 💅</h2>
        {isLoggedIn ?
          <div>
            <Link to='/' onClick={signOutHandler}>Log out</Link>
          </div>
          :
          <div>
            <Link to='/sign-in'>Sign in</Link>
          </div>}
      </NavigationContainer>
      <Outlet />
    </div>
  );
};

export default Navigation;
