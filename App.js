import React, { useState,View } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import MainTabNavigator from './screens/MainTabNavigator';
import HeaderRight from './screens/HeaderRight';
import { ThemeProvider } from './screens/ThemeContext';
import { TrackingProvider } from './screens/TrackingContext';
import { PointsProvider} from './screens/PointsContext';
import { UserProvider } from './screens/UserContext';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Onboarding1 from './screens/Onboarding1';
import ForgotPassword from './screens/ForgotPassword';
import PrivacyPolicy from './screens/PrivacyPolicy';
import TermsAndConditions from './screens/TermsAndConditions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function App() {
  return (
     <TrackingProvider>
      
        <UserProvider>
          <PointsProvider>
            <ThemeProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false, }}>
                  <Stack.Screen name="Onboarding" component={Onboarding1} />
                  <Stack.Screen name="Signup" component={Signup} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Main" component={MainTabNavigator} />
                  <Stack.Screen name='ForgotPassword'  component={ForgotPassword}   />
                  <Stack.Screen  name='PrivacyPolicy' component={PrivacyPolicy}   />
                  <Stack.Screen  name='TermsAndConditions'  component={TermsAndConditions}         />
                </Stack.Navigator>
              </NavigationContainer>
            </ThemeProvider>
          </PointsProvider>
        </UserProvider>
      
    </TrackingProvider>
  
  );
}