import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ setIsAppStarted }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp</Text>
      <Button
        title="Start"
        onPress={() => setIsAppStarted(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
