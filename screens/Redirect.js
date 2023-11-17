import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const Redirect = () => {
   const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.titleColor }]}>Thank you for contacting us</Text>
      <Text style={[styles.subtitle, { color: theme.textColor }]}>We will get in touch with you soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
  },
});

export default Redirect;
