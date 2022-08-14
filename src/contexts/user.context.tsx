import { User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { onAuthStateChangedListener, getUserDocFromAuth } from '../utils/firebase/firebase.utils';

type userData = {
  name: string,
  city: string,
  phone: string
}

const initialUserdata = {
  name: '',
  city: '',
  phone: ''
};

export type UserContextType = {
  username: string | null,
  setUsername: (value: string) => void,
  userdata: userData
  setUserdata: (value: userData) => void,
  isLoggedIn: boolean,
  setIsLoggedIn: (value: boolean) => void,
}

export const UserContext = createContext<UserContextType>({
  username: null,
  setUsername: () => { },
  userdata: initialUserdata,
  setUserdata: () => { },
  isLoggedIn: false,
  setIsLoggedIn: () => { }
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [userdata, setUserdata] = useState(initialUserdata);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = { username, setUsername, userdata, setUserdata, isLoggedIn, setIsLoggedIn };

  useEffect(() =>  {
    const unsubscribe = onAuthStateChangedListener(async (user: User) => {
      if (user) {
        const userData = await getUserDocFromAuth(user);
        setUsername(userData?.displayName);
        setIsLoggedIn(true);
      }
      console.log('===========', user);
      //setUsername(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
