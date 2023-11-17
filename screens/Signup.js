import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        // Create the user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Use the user's UID as the unique identifier
        const userUID = user.uid;

        // Add user data to Firestore with a unique userUID
        await setDoc(doc(db, "users", userUID), {
          FullName: name,
          Email: email,
          // You can add more user-related data here
          // createdAt: serverTimestamp(), // Example: Timestamp of user creation
        });

        // User is now signed up and data is added to Firestore
        console.log("User signed up successfully with UID: ", userUID);
      } catch (err) {
        console.log("Error creating user: ", err);
      }
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const authentication = getAuth();
    try {
      // Step 1: User tries to sign in using Google.
      let result = await signInWithPopup(getAuth(), new GoogleAuthProvider());
    } catch (error) {
      // Step 2: User's email already exists.
      if (error.code === "auth/account-exists-with-different-credential") {
        // The pending Google credential.
        let pendingCred = error.credential;

        // Step 3: Save the pending credential in temporary storage,
        const savePendingCredential = async (pendingCred) => {
          // Store the pending credential for later use.
          // Replace this with your preferred storage method.
          await AsyncStorage.setItem(
            "pendingCredential",
            JSON.stringify(pendingCred)
          );
        };

        // Step 4: Let the user know that they already have an account
        // but with a different provider, and let them choose another
        // sign-in method.
      }
    }

    // ...

    try {
      // Step 5: Sign the user in using their chosen method.
      let result = await signInWithPopup(getAuth(), userSelectedProvider);

      // Step 6: Link to the Google credential.
      // TODO: implement `retrievePendingCred` for your app.
      let pendingCred = retrievePendingCred();

      if (pendingCred !== null) {
        // As you have access to the pending credential, you can directly call the
        // link method.
        let user = await linkWithCredential(result.user, pendingCred);
      }

      // Step 7: Continue to app.
    } catch (error) {
      // ...
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleGithub = async () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      // Handle the success case here, as shown in your code.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    } catch (error) {
      // Handle errors, as shown in your code.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    }
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
          <Image
            source={require("../assets/signup.png")}
            style={styles.Image}
          />
        </View>
      </SafeAreaView>
      <View style={styles.logContainer}>
        <View style={{ marginVertical: 30, paddingLeft: 50 }}>
          <Text>Full Name</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder="Enter your full name"
          />
          <Text>Email Address</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Enter Email"
          />
          <Text>Password</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={(value) => setPassword(value)}
              placeholder="Enter Password"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={20}
                color="gray"
                style={{ paddingRight: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Text>By signing up you are agreeing to the </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("TermsAndConditions")}
            >
              <Text style={{ color: "blue" }}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text>and </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("PrivacyPolicy")}
            >
              <Text style={{ color: "blue" }}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.signInText}>Sign Up</Text>
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
          <TouchableOpacity onPress={handleGithub}>
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
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontWeight: "bold", color: "blue" }}>Login</Text>
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
    height: 150,
    width: 250,
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
    marginVertical: 3,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
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

export default Signup;
