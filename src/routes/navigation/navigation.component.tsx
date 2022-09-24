import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { authState, UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer } from './navigation.styles';


const Navigation = () => {
  const { isLoggedIn, clearUserData } = useContext(UserContext);

  const signOutHandler = () => {
    signOutUser();
    clearUserData();
  };

  const navLinks = () => {
    switch (isLoggedIn) {
    case authState.LoggedOut:
      return <div><Link to='/sign-in'>Sign in</Link></div>;
    case authState.SignedIn:
      return <div className='flex-container'>
        <Link to='/'>🏠 Home</Link>
        <Link to='/my-profile'>📝 My Profile</Link>
        <Link to='/' onClick={signOutHandler}>👋 Log out</Link>
      </div>;
    case authState.Loading:
      return <div>loading...</div>;
    default:
      return;
    }
  };

  return (
    <div>
      <NavigationContainer>
        <h2>🐸 pepolish 💅</h2>
        <div className='flex-container'>
          <Link to='/users'>🧑‍🤝‍🧑 Users</Link>
          <Link to='/products'>💅 Products</Link>
          <Link to='/bottles'>🏺 Bottles</Link>
        </div>
        {navLinks()}
      </NavigationContainer>
      <Outlet />
    </div>
  );
};

export default Navigation;
