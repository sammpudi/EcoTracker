import React from 'react';
import { View, Text } from 'react-native';
import { useTracking } from './TrackingContext';

const SummaryScreen = () => {
  const { records } = useTracking();

  return (
    <View>
      <Text>Tracking Records:</Text>
      {records.map((record, index) => (
        <Text key={index}>
          Distance: {record.distance.toFixed(2)} km, Time: {record.time} seconds
        </Text>
      ))}
    </View>
  );
};

export default SummaryScreen;
