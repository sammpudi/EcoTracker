// Device.js

import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const Device = ({ deviceId }) => {
  const [data, setData] = useState({
    energyUsage: 0,
    waterConsumption: 0,
  });

  useEffect(() => {
    // Simulate IoT data updates (replace with real IoT data retrieval logic)
    const interval = setInterval(() => {
      setData({
        energyUsage: Math.random() * 100,
        waterConsumption: Math.random() * 50,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Device ID: {deviceId}</Text>
      <Text>Energy Usage: {data.energyUsage} kWh</Text>
      <Text>Water Consumption: {data.waterConsumption} gallons</Text>
    </View>
  );
};

export default Device;
