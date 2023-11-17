import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';


function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      if (status !== 'granted') {
        alert('Camera permission is required to use this feature.');
        return;
      }

      setHasCameraPermission(true);
    })();
  }, []);

  const onBarCodeScanned = ({ data }) => {
    // Handle the scanned barcode data here
    console.log('Scanned Barcode:', data);

    // Check if the scanned data is a valid URL
    if (isURL(data)) {
      // Open the URL in the default browser
      Linking.openURL(data);
    } else {
      Alert.alert('Invalid QR Code', 'The scanned QR code does not contain a valid URL.');
    }
  };

  const isURL = (text) => {
    // A simple check for URL format
    return /^https?:\/\//.test(text);
  };

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera permissions</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          onBarCodeScanned={onBarCodeScanned}
          ref={cameraRef}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default CameraScreen;
