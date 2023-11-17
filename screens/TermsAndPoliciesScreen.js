import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext';

const TermsAndPoliciesScreen = ({navigation}) => {
   const { theme, toggleTheme } = useTheme();
  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      

      <Text style={[styles.contentText, { color: theme.textColor }]}>
        Welcome to Eco-Tracker Mobile, an eco-friendly app dedicated to
        environmental sustainability. Please review our Terms of Use and
        Privacy Policy below.
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>Terms of Use</Text>
     <Text style={[styles.contentText, { color: theme.textColor }]}>
        1. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Acceptance of Terms:</Text> By using Eco-Tracker Mobile, you agree to these Terms of Use. Please read them carefully.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        2. <Text style={[styles.highlight, { color: theme.buttonColor }]}>User Registration:</Text> You may need to create an account to use certain features. You are responsible for maintaining your account information and ensuring its accuracy.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        3. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Content Usage:</Text> The content on our app is for informational purposes only. You may not reproduce, distribute, or modify it without our written consent.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        4. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Privacy:</Text> Your use of Eco-Tracker Mobile is also governed by our Privacy Policy, which explains how we collect, use, and protect your data.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        5. <Text style={[styles.highlight, { color: theme.buttonColor }]}>User Conduct:</Text> You agree not to engage in any activities that may harm the app or its users, including posting harmful or inappropriate content.
      </Text>
     <Text style={[styles.contentText, { color: theme.textColor }]}>
        6. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Changes and Updates:</Text> We may modify these Terms of Use at any time. Check for updates regularly. Your continued use of the app indicates your acceptance of these changes.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        7. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Termination:</Text> We reserve the right to terminate or suspend your account if you violate these Terms of Use or engage in any harmful activities.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        8. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Disclaimers:</Text> Eco-Tracker Mobile provides content as-is. We make no warranties regarding accuracy, reliability, or fitness for a particular purpose.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        9. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Limitation of Liability:</Text> Eco-Tracker Mobile and its affiliates are not liable for any damages, whether direct or indirect, arising from your use of the app.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        10. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Governing Law:</Text> These Terms of Use are governed by the laws of [Your Jurisdiction].
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>Privacy Policy</Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        1. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Information Collection:</Text> We collect data you provide during registration and your usage of the app, such as location, device information, and app usage.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        2. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Data Usage:</Text> We use your data to provide and improve our services, such as personalizing content and sending notifications.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        3. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Data Sharing:</Text> We do not sell your data to third parties. We may share data with trusted partners for app functionality.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        4. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Security:</Text> We employ industry-standard security measures to protect your data. However, no method of transmission over the internet is entirely secure.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        5. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Cookies:</Text> Eco-Tracker Mobile uses cookies to enhance user experience. You can control cookie settings in your browser.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        6. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Children's Privacy:</Text> Our app is not intended for children under 13. We do not knowingly collect data from children.
      </Text>
      <Text style={[styles.contentText, { color: theme.textColor }]}>
        7. <Text style={[styles.highlight, { color: theme.buttonColor }]}>Contact Us:</Text> If you have questions about our Privacy Policy, please contact us at <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}><Text style={styles.highlightC}>ecotracker407@gmail.com</Text></TouchableOpacity>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  highlight: {
    color: 'green',
  },
  highlightC: {
    color: 'blue',
  },
});

export default TermsAndPoliciesScreen;

