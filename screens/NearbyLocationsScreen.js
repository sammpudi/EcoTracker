import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const NearbyLocationsScreen = () => {
  const [nearbyLocations, setNearbyLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Replace with actual latitude and longitude
        const latitude = 37.7749;
        const longitude = -122.4194;
        const radius = 1000; // 1 kilometer

        const response = await axios.get(
          `https://api.openstreetmap.org/api/0.6/map?bbox=${longitude - 0.1},${latitude - 0.1},${longitude + 0.1},${latitude + 0.1}`
        );

        // Parsing the response to extract locations, you may need to adjust this based on the actual response structure
        const locations = response.data.features.map((feature) => ({
          id: feature.id,
          name: feature.properties.name || 'Eco Location',
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
        }));

        setNearbyLocations(locations);
      } catch (error) {
        console.error('Error fetching nearby locations: ', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Nearby Locations</Text>
      {nearbyLocations.map((location) => (
        <View key={location.id} style={styles.locationItem}>
          <Text>{location.name}</Text>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default NearbyLocationsScreen;
