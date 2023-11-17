import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import TipsScreen from './TipsScreen';
import ChallengesScreen from './ChallengesScreen';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import MapStack from '../components/MapStack';
import HomeStack from '../components/HomeStack';
import { ThemeProvider } from './ThemeContext';
import CustomHeader from '../components/CustomHeader'; 
import NotificationScreen from './NotificationsScreen';
import HomeScreenNavigation from '../Navigation/HomeScreenNavigation'

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: 'black',
      borderTopWidth: 1,
      borderTopColor: 'green',
    },
    tabItemActive: {
      color: 'green',
    },
    tabItemInactive: {
      color: 'darkorange',
    },
    tabIcon: {
      marginTop: 5,
    },
  });

  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'leaf' : 'home-outline';
          } else if (route.name === 'Tips') {
            iconName = focused ? 'flash' : 'bulb-outline';
          } else if (route.name === 'Challenges') {
            iconName = focused ? 'medal' : 'trophy-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'bell' : 'ring-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'earth' : 'earth-outline';
          } else if (route.name === 'Tracking') {
            iconName = focused ? 'walk' : 'bicycle-outline';
          }
          else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubbles-outline';
          }




          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? styles.tabItemActive.color : styles.tabItemInactive.color}
              style={styles.tabIcon}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: styles.tabItemActive.color,
        inactiveTintColor: styles.tabItemInactive.color,
        style: styles.tabBar,
      }}
    >
       <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: (false),
        }}
      />


<Tab.Screen
        name="Chat"
        component={HomeScreenNavigation}
        options={{
          headerShown: (false),
        }}
      />










      
      <Tab.Screen
        name="Tips"
        component={TipsScreen}
        options={{
          headerTitle: () => (
            <CustomHeader title="Tips" iconSource={require('./images/E325.gif')} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          headerTitle: () => (
            <CustomHeader title="Challenges" iconSource={require('./images/E325.gif')} />
          ),
        }}
      />
      <Tab.Screen
        name="Tracking"
        component={MapStack}
        options={{
          headerTitle: () => (
            <CustomHeader title="Tracking" iconSource={require('./images/E325.gif')} />
          ),
        }}
      />
    </Tab.Navigator>
   
  );
};

export default MainTabNavigator;