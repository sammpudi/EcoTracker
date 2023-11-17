import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "./ThemeContext";

const HelpCenterScreen = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <Text style={[styles.title, { color: theme.titleColor }]}>
        Help Center
      </Text>

      <Text style={[styles.contentText, { color: theme.textColor }]}>
        Welcome to the Eco-Tracker Mobile Help Center. We're here to assist you
        with any questions, issues, or concerns you may have regarding our app
        and its features.
      </Text>

      <Text style={[styles.contentText, { color: theme.textColor }]}>
        Here are some common topics you can find assistance with:
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>
        Frequently Asked Questions (FAQs)
      </Text>
      <Text style={[styles.question, { color: theme.textColor }]}>
        1. How can I download and install the eco-friendly React Native app?
      </Text>
      <Text style={[styles.answer, { color: theme.textColor }]}>
        To download and install our eco-friendly React Native application,
        follow these simple steps:
      </Text>
      <Text style={[styles.answer, { color: theme.textColor }]}>
        - For iOS: Visit the Apple App Store and search for our app. Tap
        "Install" to download and install it on your iOS device.
      </Text>
      <Text style={[styles.answer, { color: theme.textColor }]}>
        - For Android: Head to the Google Play Store, search for our app, and
        click "Install" to get it on your Android device.
      </Text>

      <Text style={[styles.question, { color: theme.textColor }]}>
        2. What eco-friendly features does the React Native app offer for
        sustainable living?
      </Text>
      <Text style={[styles.answer, { color: theme.textColor }]}>
        Our React Native app is designed to empower users with eco-friendly
        features, including tips on sustainable living, energy-saving tools, and
        real-time environmental impact tracking.
      </Text>

      <Text style={[styles.question, { color: theme.textColor }]}>
        3. Does the React Native app have a community feature for sharing
        eco-friendly ideas and challenges?
      </Text>
      <Text style={[styles.answer, { color: theme.textColor }]}>
        Yes, our React Native app provides a community section where users can
        connect, share eco-friendly ideas, and participate in challenges to
        promote sustainability.
      </Text>

      <Text style={[styles.question, { color: theme.textColor }]}>
        4. Is my personal data and usage information secure and private in the
        React Native app?
      </Text>
      <Text style={[styles.answer, { color: theme.textColor }]}>
        We take user privacy seriously. Your personal data and usage information
        in the React Native app are securely handled and protected in compliance
        with data privacy regulations.
      </Text>

      <Text style={[styles.question, { color: theme.textColor }]}>
        5. How can I report issues or provide feedback to the React Native app
        developers?
      </Text>
      <Text style={[styles.answer, { color: theme.textColor }]}>
        Reporting issues or providing feedback is easy. Simply navigate to the
        "Settings" or "Help" section within the app and use the provided tools
        to contact our support team. Your feedback helps us improve the app for
        a better user experience.
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>
        Contact Support
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        If you can't find the answer you're looking for, don't hesitate to
        contact our support team for personalized assistance.
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>
        Report a Bug
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        Encountered a bug or issue with the app? Use our bug reporting tool to
        let us know, and we'll work to resolve it.
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>
        Give Feedback
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        We value your feedback. Share your suggestions and ideas to help us
        improve our app and your experience.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default HelpCenterScreen;
