import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    admin,
    setAdmin,
  };

  return <AppContext.Provider value={value}>
            {children}
         </AppContext.Provider>;
}
