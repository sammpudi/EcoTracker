import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useTracking } from './TrackingContext';

const MovementScreen = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const navigation = useNavigation();
  const { addRecord } = useTracking();

  const startTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required.');
        return;
      }

      const watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        newLocation => {
          const { latitude, longitude } = newLocation.coords;
          setLocation(newLocation);
          setRouteCoordinates(prev => [...prev, { latitude, longitude }]);
        }
      );

      // Start the interval to update elapsed time every second
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);

      setIsTracking(true);
      return () => {
        Location.clearWatchAsync(watchId);
        clearInterval(intervalRef.current);
      };
    } catch (error) {
      console.error('Error starting location tracking: ', error);
    }
  };

  const handleStartStopTracking = () => {
    if (isTracking) {
      // Calculate distance and time traveled
      const distanceTraveled = calculateDistance(routeCoordinates);

      // Save the record
      addRecord(distanceTraveled, elapsedTime);

      // Display distance and time traveled in a dialog box
      Alert.alert(
        'Tracking Summary',
        `Distance Traveled: ${distanceTraveled.toFixed(2)} km\nElapsed Time: ${formatElapsedTime(
          elapsedTime
        )}`,
        [{ text: 'OK', onPress: () => navigation.navigate('SummaryScreen') }]
      );

      // Stop the interval when tracking is stopped
      clearInterval(intervalRef.current);
    } else {
      setElapsedTime(0);
      startTracking();
    }
  };

  const calculateDistance = coordinates => {
    let distance = 0;
    for (let i = 1; i < coordinates.length; i++) {
      const prev = coordinates[i - 1];
      const curr = coordinates[i];
      distance += calculateCoordinateDistance(
        prev.latitude,
        prev.longitude,
        curr.latitude,
        curr.longitude
      );
    }
    return distance;
  };

  const calculateCoordinateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRadians = degrees => {
    return degrees * (Math.PI / 180);
  };

  const formatElapsedTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: routeCoordinates[0]?.latitude || 0,
          longitude: routeCoordinates[0]?.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {routeCoordinates.length > 0 && (
          <>
            <Marker
              coordinate={{
                latitude: routeCoordinates[0].latitude,
                longitude: routeCoordinates[0].longitude,
              }}
              title="Start"
              description="Start of movement"
            />
            <Marker
              coordinate={{
                latitude:
                  routeCoordinates[routeCoordinates.length - 1].latitude,
                longitude:
                  routeCoordinates[routeCoordinates.length - 1].longitude,
              }}
              title="End"
              description="End of movement"
            />
            <Polyline coordinates={routeCoordinates} strokeColor="#000" strokeWidth={4} />
          </>
        )}
      </MapView>

      <Button
        title={isTracking ? 'Stop Tracking' : 'Start Tracking'}
        onPress={handleStartStopTracking}
      />
      {isTracking && (
        <View style={styles.elapsedTimeContainer}>
          <Text style={styles.elapsedTimeText}>{formatElapsedTime(elapsedTime)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  elapsedTimeContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
  elapsedTimeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MovementScreen;

