// TrackingContext.js

import React, { createContext, useContext, useState } from 'react';

const TrackingContext = createContext();

  const carbonEmissionsData = {
    Walking: 0,
    Cycling: 0,
    Driving: 120,
    Train: 50,
    Boat: 150,
    Airplane: 200,
  };

export const TrackingProvider = ({ children }) => {
  const [trackingData, setTrackingData] = useState({
    totalDistance: 0,
    totalCarbonFootprint: 0,
  });

  const emissionsRateForDriving = carbonEmissionsData.Driving;
  const totalDistanceInKm = trackingData.totalDistance ; // Convert distance to kilometers
  const emissionsForDriving = emissionsRateForDriving * totalDistanceInKm; // Emissions for driving in gCO2
  const emissionsReducedBy = trackingData.totalCarbonFootprint - emissionsForDriving;

  const percentageEmissionsReducedBy = (emissionsReducedBy / trackingData.totalCarbonFootprint) * 100;

  return (
    <TrackingContext.Provider value={{ trackingData, setTrackingData, percentageEmissionsReducedBy }}>
      {children}
    </TrackingContext.Provider>
  );
};


export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};
