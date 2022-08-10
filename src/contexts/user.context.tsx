import { createContext, ReactNode, useState } from "react";

type userData = {
  name: string,
  city: string,
  phone: string
}

const initialUserdata = {
  name: "",
  city: "",
  phone: ""
}

export type UserContextType = {
  username: string | null,
  setUsername: (value: string) => void,
  userdata: userData
  setUserdata: (value: userData) => void,
}

export const UserContext = createContext<UserContextType>({
  username: null,
  setUsername: () => { },
  userdata: initialUserdata,
  setUserdata: () => { }
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [userdata, setUserdata] = useState(initialUserdata);
  const value = { username, setUsername, userdata, setUserdata };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
