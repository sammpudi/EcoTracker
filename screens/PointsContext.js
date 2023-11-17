import React, { createContext, useContext, useState } from 'react';

const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [userPoints, setUserPoints] = useState(0);
  const [profileCompletionPercentage, setProfileCompletionPercentage] = useState(50);

  return (
    <PointsContext.Provider value={{ userPoints, setUserPoints, profileCompletionPercentage, setProfileCompletionPercentage }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

