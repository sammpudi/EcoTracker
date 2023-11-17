import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

const tips = [
  { "id": 1, "text": "Reduce water consumption by taking shorter showers." },
  { "id": 2, "text": "Use energy-efficient LED bulbs to save on electricity." },
  // ... (rest of the tips)
];

const NotificationScreen = () => {
  const [receivedNotifications, setReceivedNotifications] = useState([]);

  useEffect(() => {
    // Handle incoming notifications
    const subscription = Notifications.addNotificationReceivedListener(handleNotification);

    async function handleNotification(notification) {
      const tipId = notification.request.content.data.randomTipId;
      const receivedTip = tips.find((tip) => tip.id === tipId);

      if (receivedTip) {
        setReceivedNotifications((prevNotifications) => [
          ...prevNotifications,
          receivedTip.text,
        ]);
      }
    }

    // Send a notification every 30 seconds
    const intervalId = setInterval(() => {
      try {
        const randomIndex = Math.floor(Math.random() * tips.length);
        const randomTip = tips[randomIndex];

        const localNotification = {
          title: 'Eco Tip of the Day',
          body: randomTip.text,
          data: { randomTipId: randomTip.id },
        };

        const schedulingOptions = {
          time: new Date().getTime() + 30000, // 30 seconds from now
        };

        Notifications.scheduleNotificationAsync(localNotification, schedulingOptions)
          .then((notificationId) => {
            console.log('Scheduled Notification ID:', notificationId);
          })
          .catch((error) => {
            console.error('Failed to schedule notification:', error);
          });
      } catch (error) {
        console.error('Failed to send notification:', error);
      }
    }, 30000);

    // Request notification permissions when the component mounts
    const getNotificationPermissions = async () => {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
          if (newStatus === 'granted') {
            console.log('Notification permissions granted');
          } else {
            console.log('Notification permissions denied');
          }
        }
      } catch (error) {
        console.error('Failed to get notification permissions:', error);
      }
    };

    getNotificationPermissions();

    // Clean up the subscription and interval when the component unmounts
    return () => {
      subscription.remove();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Notificationg Screen</Text>
      {receivedNotifications.map((notification, index) => (
        <Text key={index}>{notification}</Text>
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
});

export default NotificationScreen;

