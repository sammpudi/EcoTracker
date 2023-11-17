import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You can choose any icon set you like
import { useTheme } from './ThemeContext';
import { FontAwesome } from '@expo/vector-icons';


const carbonEmissionsData = {
  Walking: 0, // 0 gCO2/km
  Cycling: 0, // 0 gCO2/km
  Driving: 120, // Example value in gCO2/km
  Train: 50, // Example value in gCO2/km
  Boat: 150, // Example value in gCO2/km
  Airplane: 200, // Example value in gCO2/km
  
};

const calculateCarbonFootprint = (selectedTransport, totalDistance) => {
  const emissionsRate = carbonEmissionsData[selectedTransport];
  const carbonFootprint = (emissionsRate / 1000) * totalDistance; // Convert gCO2 to kgCO2
  return carbonFootprint;
};


const calculateDistance = (locations) => {
  let totalDistance = 0;
  for (let i = 1; i < locations.length; i++) {
    totalDistance += distance(
      locations[i - 1].coords.latitude,
      locations[i - 1].coords.longitude,
      locations[i].coords.latitude,
      locations[i].coords.longitude
    );
  }
  return totalDistance;
};

const distance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295;  // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 +
    c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p)) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { theme } = useTheme(); // Get the theme from the context
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [locations, setLocations] = useState([]);
  const mapRef = useRef(null);
   // New state variables for the transport selection modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
   const [isTrackingStartedFromModal, setIsTrackingStartedFromModal] = useState(false);

 // Method of transport options
  const transportOptions = [
    { name: 'Walking', icon: 'walk' },
    { name: 'Cycling', icon: 'bike' },
    { name: 'Driving', icon: 'car' },
    { name: 'Train', icon: 'train' },
    { name: 'Boat', icon: 'submarine' },
    { name: 'Airplane', icon: 'airplane' },
    // Add more transport options as needed
  ];

  const handleToggleTracking = () => {
    if (isTrackingStartedFromModal) {
      // If tracking started from the modal, handle it as you did in your original code
      if (isTracking) {
        // Stop tracking
        setIsTracking(false);
        const endTime = new Date();
        const distanceTraveled = calculateDistance(locations);
        const timeElapsed = (endTime - startTime) / 1000;




        Alert.alert(
          'Tracking Summary',
          `Distance Traveled: ${distanceTraveled.toFixed(2)} km\nTime Taken: ${formatTime(elapsedTime)}\nCarbon Footprint: ${calculateCarbonFootprint(selectedTransport, distanceTraveled).toFixed(2)} kg CO2`,
          

          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
              style: 'default',
            },
          ],
          {
            alertContainerStyle: { backgroundColor: 'green' },
          }
        );

   


        setIsModalVisible(false); // Close the transport modal after stopping tracking
        setLocations([]);
        setElapsedTime(0);
      } else {
        setIsModalVisible(true); // Open the transport modal before starting tracking
        // Start tracking
        setIsTracking(true);
        setStartTime(new Date());
      }
    } else {
      // If tracking is not started from the modal, simply set the tracking started state
      setIsTrackingStartedFromModal(true);
      setIsModalVisible(true); // Open the transport modal
    }
  };

  useEffect(() => {
    let timer;
    if (isTracking) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isTracking]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationSubscriber = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High },
        (newLocation) => {
          setLocation(newLocation);
          if (isTracking) {
            setLocations((prevLocations) => [...prevLocations, newLocation]);
          }
        }
      );

      return () => {
        locationSubscriber.remove();
      };
    })();
  }, [isTracking]);


  const handleGoToMyLocation = () => {
    if (location) {
      const { latitude, longitude } = location.coords;
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };


    const formatTime = (seconds) => {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };
   const handleStartTracking = () => {
    if (selectedTransport) {
      setIsModalVisible(false); // Close the transport modal
      setIsTracking(true);
      setStartTime(new Date());
    } else {
      // You can show an error message here or handle it in any way you prefer
      Alert.alert('Please select a method of transport.');
    }
  };


  const handleCancelTracking = () => {
    setIsModalVisible(false);
    setIsTracking(false);
    setLocations([]);
    setElapsedTime(0);
  };
    
  return (
  <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
    {errorMsg ? (
      <Text>{errorMsg}</Text>
    ) : (
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: -26.190452,
          longitude: 28.015084,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {locations.length > 0 && (
          <>
            <Polyline
              coordinates={locations.map((loc) => ({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
              }))}
              strokeColor="#00FF00"
              strokeWidth={2}
            />
            <Marker
              coordinate={{
                latitude: locations[locations.length - 1].coords.latitude,
                longitude: locations[locations.length - 1].coords.longitude,
              }}
              title="Your Location"
              description="This is where you are"
            />
          </>
        )}
      </MapView>
    )}

    <Modal visible={isModalVisible} transparent={true} animationType="slide">
      <View style={[styles.modalContainer, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.modalTitle, { color: theme.titleColor }]}>Select Method of Transport</Text>
        <View style={styles.transportOptionsContainer}>
          <View style={styles.transportOptionsRow}>
            {transportOptions.slice(0, 3).map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.transportOption,
                  selectedTransport === option ? styles.selectedTransport : null,
                ]}
                onPress={() => setSelectedTransport(option)}
              >
                <Icon name={option.icon} size={24} color='black' />
                <Text style={styles.transportOptionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.transportOptionsRow}>
            {transportOptions.slice(3).map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.transportOption,
                  selectedTransport === option ? styles.selectedTransport : {},
                ]}
                onPress={() => setSelectedTransport(option)}
              >
                <Icon name={option.icon} size={24} color='black' />
                <Text style={styles.transportOptionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: theme.buttonColor }]}
          onPress={handleStartTracking}
        >
          <Text style={styles.startButtonText}>Start Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelTracking}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>





    {/* Start/Stop Tracking and Timer Display */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleGoToMyLocation} style={styles.locationButton}>
        <Icon name="map-marker" size={20} color="red" />
        <Text style={styles.locationButtonText}>Go to My Location</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleToggleTracking} style={[styles.button, { backgroundColor: isTracking ? 'red' : 'green' }]}>
        <Icon name={isTracking ? 'stop' : 'play'} size={20} color="black" />
        <Text style={styles.buttonText}>
          {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </Text>
      </TouchableOpacity>

      <View style={styles.timerContainer}>
        {isTracking && (
          <Text style={styles.timerText}>{`Time Elapsed: ${formatTime(elapsedTime)}`}</Text>
        )}
      </View>
    </View>
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
  buttonContainer: {
    position: 'relative',
    top: 10,
    
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin:10,

  },
  buttonText: {
    color: 'white',
  },
  timerContainer: {
    position: 'relative',
    
  },
  timerText: {
    color: 'black',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  locationButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin:10,
  },
  locationButtonText: {
    color: 'black',
  },
 


  modalContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  transportOptionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  transportOptionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transportOption: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  selectedTransport: {
    color: 'red', 
    borderWidth: 3,
  },
  transportOptionText: {
    marginTop: 5,
  },
  startButton: {
    backgroundColor: 'green',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
  },
});



export default MapScreen;