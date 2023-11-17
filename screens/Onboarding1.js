import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";


const Onboarding1 = ({navigation}) => {
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "lightblue",  }}>
      <View style={{ flex: 1, justifyContent: "space-around",  }}>
        <Text
          style={{
            color: "black",
            fontSize: 36,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Welcome To EcoTracker
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          source={require("../assets/SaveEarth.png")}
          style={styles.image}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signInText}>Start</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: "center", marginBottom: 200}}>
          <Text style={{color: "gray", fontWeight: "bold"}}>Already have an account?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{fontWeight: 'bold',color: "blue"}}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: "yellow",
    padding: 10,
    width: "70%",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 5,
    marginHorizontal: 60,
  },
  signInText: {
    color: "gray",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 400,
    height: 280
  }
});
export default Onboarding1;
