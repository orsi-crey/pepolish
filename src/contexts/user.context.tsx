import { createContext, ReactNode, useState } from "react";

export type UserContextType = {
  currentUser: string | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>
};
