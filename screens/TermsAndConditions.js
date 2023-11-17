import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const TermsAndConditions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Ionicons
          name="arrow-back-outline"
          size={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Terms and Conditions</Text>
      </View>
      <ScrollView
        style={{ marginHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          1. Acceptance of Terms
        </Text>
        <Text>
          By using our environmental application EcoTracker, you agree to be
          bound by these Terms and Conditions. If you do not agree to these
          terms, please refrain from using the App.
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          2. User Responsibilities
        </Text>
        <Text>
          You agree to use the App for lawful and environmentally responsible
          purposes.
        </Text>
        <Text>
          You will not engage in any activity that may disrupt or interfere with
          the functioning of the App.
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          3. Intellectual Property
        </Text>
        <Text>
          The App and its content are protected by copyright and intellectual
          property laws.
        </Text>
        <Text>
          You may not copy, distribute, modify, or reproduce any part of the App
          without explicit permission.
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          4. Privacy
        </Text>
        <Text>
          Our privacy policy, outlined separately, governs the collection and
          use of your data.
        </Text>
        <Text>
          By using the App, you consent to the collection and use of your data
          as described in the privacy policy.
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          5. Limitation of Liability
        </Text>
        <Text>
          We do not guarantee the accuracy, reliability, or completeness of
          information provided by the App.
        </Text>
        <Text>
          We are not responsible for any damage or loss resulting from the use
          of the App.
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          6. Change to Terms
        </Text>
        <Text>
          We may revise these terms at any time without notice. It is your
          responsibility to review the terms periodically
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          7. Termination
        </Text>
        <Text>
          We reserve the right to terminate your access to the App if you
          violate these terms or engage in unauthorized or unlawful activities.
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          8. Contact information
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('MailScreen')}>
          <Text style={{ textDecorationLine: "underline" }}>
            Contact us at ecotracker407@gmail.com
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditions;

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
    marginHorizontal: 30,
  },
});
