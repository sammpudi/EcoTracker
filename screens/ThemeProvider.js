import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    backgroundColor: '#4CAF50',
    textColor: '#000',
    buttonTextColor: '#FFD700',
  });

  const toggleTheme = (newTheme) => {
    if (newTheme === 'dark') {
      setTheme({
        backgroundColor: '#333',
        textColor: '#FFF',
        buttonTextColor: '#FFD700',
      });
    } else if (newTheme === 'sunrise') {
      setTheme({
        backgroundColor: '#FFA500',
        textColor: '#000',
        buttonTextColor: '#FFD700',
      });
    } else {
      // Default theme
      setTheme({
        backgroundColor: '#4CAF50',
        textColor: '#000',
        buttonTextColor: '#FFD700',
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
