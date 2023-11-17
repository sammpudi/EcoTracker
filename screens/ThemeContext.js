import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    backgroundColor: 'lightblue',
    textColor: '#333',
    buttonTextColor: 'black',
    titleColor: 'black',
    buttonColor: '#007BFF',
    containerColor:  'lightgreen',
    contentColor:  'lightgreen',
    contentColorTwo: 'white',
    iconColor: 'black',
  });

  const toggleTheme = (newTheme) => {
    if (newTheme === 'dark') {
      setTheme({
        backgroundColor: 'black',
        textColor: '#FFF',
        buttonTextColor: 'black',
        titleColor: '#00FF00',
        buttonColor: '#00FF00',
        containerColor:  '#333',
        contentColorTwo:  '#D3D3D3',
        contentColor:  '#333',
        iconColor: 'lightblue',
        infoContainerBackgroundColor: "white",
      });
    } else if (newTheme === 'sunrise') {
      setTheme({
        backgroundColor: 'gold',
        textColor: '#4CAF50',
        buttonTextColor: 'gold',
        titleColor: 'red',
        buttonColor: 'black',
        containerColor:  'orange',
        contentColorTwo:  'lightgrey',
        contentColor:  'black',
        iconColor: 'black',
      });
    } else {
      // Default theme
      setTheme({
        backgroundColor: 'lightblue',
        textColor: '#4CAF50',
        buttonTextColor: 'black',
        titleColor: 'black',
        buttonColor: '#007BFF',
        containerColor:  'lightyellow',
        contentColorTwo:  'white',
        contentColor:  'white',
        iconColor: 'black',
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};