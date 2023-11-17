import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import {
  signOut,
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const user = auth.currentUser;
  const userId = user ? user.uid : null; // Get the user's unique ID

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newName, setNewName] = useState(user?.FullName || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const handleEditProfile = () => {
    toggleEditModal();
  };

  const handleAddPicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled) {
      navigation.navigate("Home", { selectedImage: pickerResult.assets[0] });
    }

    if (pickerResult.assets && pickerResult.assets.length > 0) {
      setAvatar({ uri: pickerResult.assets[0].uri });
    }
  };

  const handleRead = async () => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserInfo(docSnap.data());
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.log("Error reading document", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;

      // Send an email verification to the new email
      await sendEmailVerification(user);

      // Update the Firestore document (without changing the email yet)
      const docRef = doc(db, "users", userId);
      const updatedData = {
        FullName: newName,
        Email: newEmail,
      };

      // Update the Firestore document first
      await updateDoc(docRef, updatedData);

      // Update the email in Firebase Authentication
      await updateEmail(user, newEmail);

      // Update the state with the new values after successful updates
      setNewName(newName);
      setNewEmail(newEmail);

      // Toggle the edit modal to allow the user to check their email
      toggleEditModal();
    } catch (error) {
      console.log("Error updating document or sending verification email", error);
    }
  };

  const handleDelete = async (userPassword) => {
    try {
      const authentication = getAuth();
      const user = authentication.currentUser;

      if (user) {
        const credential = EmailAuthProvider.credential(user.email, userPassword);
        await reauthenticateWithCredential(user, credential);
        await deleteUser(user);
        await deleteDoc(doc(db, "users", user.uid));

        navigation.navigate("Signup");
      } else {
        console.log("No authenticated user found.");
      }
    } catch (error) {
      console.log("Error deleting user or document:", error);
    }
  };

  useEffect(() => {
    handleRead();
  }, []);

  return (
    <View style={styles.container}>
      {avatar && <Image source={avatar} style={styles.avatar} />}
      <TouchableOpacity onPress={handleAddPicture}>
        <Image source={user?.photoUrl} />
        <Text style={styles.pictureButtonText}>Choose or Take a Picture</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.detail}>{newName}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text>{newEmail}</Text>

      <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleDelete}>
        <Text style={styles.editButtonText}>Delete Account</Text>
      </TouchableOpacity>

      <Modal isVisible={isEditModalVisible} style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Edit Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newName}
          onChangeText={(text) => setNewName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={toggleEditModal}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    paddingTop: 100,
    backgroundColor: "lightgreen",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  pictureButtonText: {
    fontSize: 16,
    marginBottom: 16,
    color: "blue",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detail: {
    fontSize: 16,
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  saveButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default ProfileScreen;
