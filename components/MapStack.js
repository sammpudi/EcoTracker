import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

const MapStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen
      name="Map"
      component={MapScreen}
      options={{ headerShown: false }} // Set a header title
    />
  </Stack.Navigator>
);

export default MapStack;
