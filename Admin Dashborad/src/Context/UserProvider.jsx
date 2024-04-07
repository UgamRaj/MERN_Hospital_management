import { createContext, useContext, useState } from "react";

const UserContext = createContext({ isAuthenticated: false });

export const useHospital = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [noOfDoctor, setNoOfDoctor] = useState(0);

  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    noOfDoctor,
    setNoOfDoctor,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
