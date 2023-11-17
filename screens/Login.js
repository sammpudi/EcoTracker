import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../config/firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("Home", { userName: email });
      } catch (err) {
        setErrorMessage("Invalid email or password. Please sign up if you don't have an account.");
      }
    } else {
      setErrorMessage("Please enter both email and password.");
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
          <Image source={require("../assets/Login.png")} style={styles.Image} />
        </View>
      </SafeAreaView>
      <View style={styles.logContainer}>
        <View style={{ marginVertical: 30, paddingLeft: 50 }}>
          <Text>Email Address</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Enter Email"
          />
          <Text>Password</Text>
          <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>

          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder="Enter Password"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons 
            name={isPasswordVisible ? "eye": "eye-off"}
            size={20}
            color="gray"
            style={{paddingRight: 10}}
            />
          </TouchableOpacity>
          </View>
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <TouchableOpacity
            style={{ flexDirection: "row-reverse", marginBottom: 5 }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signInButton} onPress={() =>navigation.navigate('Main')}>
            <Text style={styles.signInText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          Or
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity onPress={handleGoogle}>
            <Image
              source={require("../assets/Google.png")}
              style={styles.logImage}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/github.png")}
              style={styles.logImage}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "gray", fontWeight: "bold" }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ fontWeight: "bold", color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
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
  Image: {
    height: 200,
    width: 300,
  },
  logContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
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
  logImage: {
    height: 40,
    width: 40,
  },
});

export default Login;
