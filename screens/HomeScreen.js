import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from './ThemeContext';
import { useTracking } from './TrackingContext'; // Import the context
import { usePoints } from './PointsContext'; // Import the context
import { useUser } from './UserContext'; // Import the UserContext
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const { trackingData, percentageEmissionsReducedBy } = useTracking();
  const { userPoints } = usePoints(); // Access the userPoints from PointsContext
  const { profileCompletionPercentage } = usePoints();
  const { userDetails } = useUser();
  const userPicture = userDetails.avatar || require('./images/E325.gif' );


 


  return (
  <ScrollView
  style={{ backgroundColor: theme.backgroundColor }}
  contentContainerStyle={styles.container}
>
    <View style={styles.containerTwo}>
        <Text style={[styles.title, { color: theme.titleColor }]}>Welcome to Eco Tracker</Text>
        <Text style={[styles.subtitle, { color: theme.textColor }]}>
          Your Friend in Keeping Mother Earth Healthy
        </Text>
  
        {/* <Text style={[styles.userPoints, { color: theme.textColor }]}>
          Points: <Text style={[styles.pointsValue, { color: theme.titleColor }]}>{userPoints}</Text>
        </Text> */}
  
        <View style={styles.userPictureContainer}>
          <Image source={userPicture} style={styles.userPicture} />
          {/* <Text style={[styles.profileCompletion, { color: theme.textColor }]}>
            Profile Completion: <Text style={[styles.pointsValue, { color: theme.titleColor }]}>{profileCompletionPercentage.toFixed(2)}%</Text>
          </Text> */}
        </View>
  
        <View style={[styles.contentContainer, { backgroundColor: theme.contentColor }]}>
          <Text style={[styles.contentTitle, { color: theme.titleColor }]}>Your Carbon Emission Summary</Text>
  
          <Text style={[styles.contentText, { color: theme.textColor }]}>
            Total Distance: <Text style={[styles.highlight, { color: theme.titleColor }]}>{trackingData.totalDistance.toFixed(2)} m</Text>
          </Text>
          <Text style={[styles.contentText, { color: theme.textColor }]}>
            Total Carbon Footprint: <Text style={[styles.highlight, { color: theme.titleColor }]}>{trackingData.totalCarbonFootprint.toFixed(2)} kg CO2</Text>
          </Text>
  
          <Text style={[styles.contentText, { color: theme.textColor }]}>
            Emissions Reduced By:
          </Text>
  
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.titleColor }}>
              {percentageEmissionsReducedBy ? percentageEmissionsReducedBy.toFixed(2) : '0'}
            </Text>
            <Text style={[styles.contentText, { color: theme.titleColor }]}>%</Text>
          </View>
  
          <View style={[styles.contentContainer, { backgroundColor: theme.contentColorTwo }]}>
            <Text style={[styles.contentTitle, { color: theme.titleColor }]}>Reduce, Reuse, Recycle</Text>
            <Text style={[styles.contentText, { color: theme.textColor }]}>
              The three R's – Reduce, Reuse, and Recycle – are a set of principles aimed at reducing waste and conserving resources. Here's how you can make a positive impact:
            </Text>
            <Text style={[styles.contentText, { color: theme.textColor }]}>
              - <Text style={[styles.highlight, { color: theme.backgroundColor }]}>Reduce:</Text> Consume less, use resources efficiently, and buy only what you need.
            </Text>
            <Text style={[styles.contentText, { color: theme.textColor }]}>
              - <Text style={[styles.highlight, { color: theme.backgroundColor }]}>Reuse:</Text> Find creative ways to use items again or repurpose them.
            </Text>
            <Text style={[styles.contentText, { color: theme.textColor }]}>
              - <Text style={[styles.highlight, { color: theme.backgroundColor }]}>Recycle:</Text> Properly recycle materials to prevent them from ending up in landfills.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    top:0,
    
  },

  containerTwo: {
    
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    top:0,
    marginTop:30,
    
    
  },
  userPictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  userPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileCompletion: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    top:100,
  },
  pointsValue: {
    fontSize: 24,
    color: 'red',
    
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    top:80,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    top:0,
    
  },
  contentContainer: {
    padding: 20,
    borderRadius: 8,
    elevation: 50,
    marginBottom:50,
    top:50,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  highlight: {
    color: 'green',
    fontWeight: 'bold',
  },
  userPoints: {
    fontSize: 15,
    fontWeight: 'bold',
    position: 'absolute',
    top: 200,
    right: 5,
    zIndex: 1,
  },
 
});

export default HomeScreen;