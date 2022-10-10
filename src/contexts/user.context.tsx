import { createContext, ReactNode, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

export enum authState {
  SignedIn,
  LoggedOut,
  Loading,
}

export type UserContextType = {
  ownUserId: string;
  setOwnUserId: (value: string) => void;
  isLoggedIn: authState;
  setIsLoggedIn: (value: authState) => void;
};

export const UserContext = createContext<UserContextType>({
  ownUserId: ' ',
  setOwnUserId: () => {},
  isLoggedIn: authState.Loading,
  setIsLoggedIn: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [ownUserId, setOwnUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(authState.Loading);

  const value = { ownUserId, setOwnUserId, isLoggedIn, setIsLoggedIn };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user: User) => {
      if (user) {
        setOwnUserId(user.uid);
        setIsLoggedIn(authState.SignedIn);
      } else {
        setIsLoggedIn(authState.LoggedOut);
        setOwnUserId(' ');
      }
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
