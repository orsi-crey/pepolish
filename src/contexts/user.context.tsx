import { User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { onAuthStateChangedListener, getUserDocFromAuth } from '../utils/firebase/firebase.utils';

type userData = {
  name: string,
  city: string,
  profilePic: string
}

export const initialUserdata = {
  name: '',
  city: '',
  profilePic: ''
};

export enum authState {
  SignedIn,
  LoggedOut,
  Loading
}

export type UserContextType = {
  username: string | null,
  setUsername: (value: string) => void,
  userdata: userData
  setUserdata: (value: userData) => void,
  isLoggedIn: authState,
  setIsLoggedIn: (value: authState) => void,
  clearUserData: () => void
}

export const UserContext = createContext<UserContextType>({
  username: null,
  setUsername: () => { },
  userdata: initialUserdata,
  setUserdata: () => { },
  isLoggedIn: authState.Loading,
  setIsLoggedIn: () => { },
  clearUserData: () => { }
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [userdata, setUserdata] = useState(initialUserdata);
  const [isLoggedIn, setIsLoggedIn] = useState(authState.Loading);
  const clearUserData = () => {
    setUsername('');
    setUserdata(initialUserdata);
    setIsLoggedIn(authState.LoggedOut);
  };

  const value = { username, setUsername, userdata, setUserdata, isLoggedIn, setIsLoggedIn, clearUserData };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user: User) => {
      if (user) {
        const userData = await getUserDocFromAuth(user);
        setUsername(userData?.displayName);
        setIsLoggedIn(authState.SignedIn);
      } else {
        setIsLoggedIn(authState.LoggedOut);
      }
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
