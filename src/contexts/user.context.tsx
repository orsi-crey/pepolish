import { createContext, ReactNode, useState } from "react";

export type UserContextType = {
  currentUser: string | null,
  setCurrentUser: (value: string) => void
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState("");
  const value = { currentUser, setCurrentUser };

  

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
