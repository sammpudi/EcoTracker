import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const AppInfoScreen = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.titleColor }]}>App Information</Text>

      <Text style={[styles.contentText, { color: theme.textColor }]}>
        Welcome to Eco-Tracker Mobile, an eco-friendly app dedicated to
        promoting sustainable living and environmental awareness. Our app is
        designed to help you track your eco-friendly actions, learn more about
        sustainability, and contribute to a greener planet.
      </Text>

      <Text style={[styles.contentText, { color: theme.textColor }]}>
        Here are some key details about our app:
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>Version:</Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>1.0.0</Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>Developer:</Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>Sanele Hlongwane</Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>Siphesihle Mazibuko</Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>Samuel Mpudi</Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>Contact:</Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        Email: ecotracker407@gmail.com{'\n'}

      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AppInfoScreen;