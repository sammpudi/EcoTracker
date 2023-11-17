import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

function Map() {
  // Initial coordinates (e.g., your current location)
  const initialCoords = {
    latitude: 37.78825, // Replace with your latitude
    longitude: -122.4324, // Replace with your longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialCoords}
        showsUserLocation={true} // Show the user's location on the map
      >
        <Marker
          coordinate={initialCoords}
          title="Your Location"
          description="This is where you are"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
