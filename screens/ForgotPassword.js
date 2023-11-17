import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Ionicons } from "@expo/vector-icons";
  import { sendPasswordResetEmail } from "firebase/auth";
  import { auth } from "../config/firebase";
  
  const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
  
    const handleResetPassword = async () => {
      sendPasswordResetEmail(auth, email)
      .then(() => {
          alert('Check Email for password reset link');
      }) 
      .catch ((error) => {
          const errorCode = error.code;
          const errorMessage = error.message
      })
    }
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Ionicons
              name="arrow-back-outline"
              style={styles.IconButton}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={require("../screens/images/E325.gif")}
              style={styles.image}
            />
          </View>
        </SafeAreaView>
        <View style={styles.logContainer}>
          <KeyboardAvoidingView>
            <View style={{ marginVertical: 30, paddingLeft: 50 }}>
              <Text>Email Address</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={(value) => setEmail(value)}
                placeholder="Enter Email"
              />
             
              {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
              <TouchableOpacity style={styles.signInButton} onPress={handleResetPassword}>
                <Text style={styles.signInText}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "lightgreen",
      paddingTop: 20,
    },
    image: {
      height: 200,
      width: 300,
      marginTop:10
    },
    IconButton: {
      backgroundColor: "yellow",
      width: 50,
      height: 50,
      borderRadius: 50,
      textAlign: "center",
      paddingTop: 20,
      marginHorizontal: 10,
      marginBottom: 5,
    },
    logContainer: {
      flex: 1,
      backgroundColor: "#fff",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      paddingHorizontal: 8,
      paddingVertical: 8,
      marginTop: 100,
    },
    textInput: {
      marginLeft: 16,
      marginVertical: 3,
      padding: 16,
      backgroundColor: "white",
      borderRadius: 16,
    },
    errorMessage: {
      color: "red",
      textAlign: "center",
      marginTop: 10,
    },
    signInButton: {
      backgroundColor: "yellow",
      padding: 10,
      width: "90%",
      alignItems: "center",
      marginTop: 20,
      borderRadius: 10,
    },
    signInText: {
      color: "gray",
      fontSize: 20,
      fontWeight: "bold",
    },
  });
  export default ForgotPassword;