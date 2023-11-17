import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const PrivacyPolicy = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Ionicons
          name="arrow-back-outline"
          size={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Privacy Policy</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 10 }}
      >
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          1. Information Collection
        </Text>
        <Text>
          We may collect personal information, such as your name, email address,
          and location when you use the App.
        </Text>
        <Text>
          We may also collect non-personal data such as usage statistics and
          environmental data.
        </Text>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          2. Use of Information
        </Text>
        <Text>
          We use your personal information for user account management and to
          provide a customized App experience.
        </Text>
        <Text>
          Environmental data may be used for analysis, research, and improving
          the App
        </Text>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          3. Data Sharing
        </Text>
        <Text>
          We do not sell or share your personal information with third parties
          without your consent, except as required by law.
        </Text>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          4. Security
        </Text>
        <Text>
          We employ industry-standard security measures to protect your data;
          however, no data transmission is entirely secure
        </Text>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          5. Cookies and Tracking
        </Text>
        <Text>
          We may use cookies and other tracking technologies to enhance user
          experience and collect non-personal data.
        </Text>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          6. Third-Party Links
        </Text>
        <Text>
          The App may contain links to third-party websites. We are not
          responsible for their privacy practices.
        </Text>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          7. Data Retention
        </Text>
        <Text>
          We retain your data for as long as necessary to provide the App's
          services and comply with legal obligations.
        </Text>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          8. Policy Changes
        </Text>
        <Text>
          We may update this privacy policy periodically. The date of the most
          recent revision will be indicated at the top
        </Text>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          9. Contact Information
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("MailScreen")}>
          <Text style={{ textDecorationLine: "underline" }}>
            If you have questions or concerns about your privacy, please contact us at {"ecotracker407@gmail.com"}. By using the App, you agree to this privacy policy and the terms and conditions outlined above.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 60,
  },
});
