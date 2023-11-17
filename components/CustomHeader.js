import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomHeader = ({ title, iconSource }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerIcon}>
        <Image source={iconSource} style={styles.iconImage} />
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 10,
  },
  iconImage: {
    width: 40, // Set the width and height as needed
    height: 40,
  },
  headerTitle: {
    fontSize: 20,
    color: 'green', // Change to your eco-friendly color
  },
});

export default CustomHeader;
