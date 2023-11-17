// DonationsContext.js

import React, { createContext, useState, useEffect } from 'react';

export const DonationsContext = createContext();

const DonationsProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // You can fetch donation data from a database or API here and update the state
    // For now, it's empty because we'll add donations dynamically
  }, []);

  // Function to add a new donation
  const addDonation = (donation) => {
    // Generate a unique ID for the new donation (you can use a library like uuid)
    const id = Math.random().toString(36).substr(2, 9);
    donation.id = id;

    setDonations((prevDonations) => [...prevDonations, donation]);
  };

  // Function to remove a donation (if needed)
  const removeDonation = (id) => {
    setDonations((prevDonations) => prevDonations.filter((donation) => donation.id !== id));
  };

  return (
    <DonationsContext.Provider value={{ donations, addDonation, removeDonation }}>
      {children}
    </DonationsContext.Provider>
  );
};

export default DonationsProvider;

