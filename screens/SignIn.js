import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SignIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp</Text>
      <Button
        title="Start"
        onPress={() => navigation.navigate('NavigatorScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SignIn;
