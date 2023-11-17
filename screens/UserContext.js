import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    name: 'Samuel',
    surname: 'Doe',
    email: 'ecotracker@gmail.com',
    location: '',
    gender:'',
    avatar: '',
    bio:'',
   
  });

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
