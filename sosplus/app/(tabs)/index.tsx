<<<<<<< HEAD
// index.tsx
import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen'; // Adjust the path as necessary

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
=======
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Button, TextInput } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";


function SOSPlus() {
  const handlePanicPress = () => {
    Alert.alert('Panic button pressed!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.panicButton} onPress={handlePanicPress}>
        <Text style={styles.panicButtonText}>Panic</Text>
      </TouchableOpacity>
    </View>
  )}


function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignup = () => {
    // Add logic for signup validation
    if (username && password && phoneNumber) {
      Alert.alert("Signup successful");
      return <MyDrawer />;

    } else {
      Alert.alert("Please fill in all fields");
    }
  };

  return (
    <View>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Signup
        </ThemedText>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Full Name:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Password:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Cellphone Number:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your cellphone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />
        </View>
        --- OR ---
        <p>Signup with google </p>
        <img
          src="/app/(tabs)/icons/googleIcon.png"
          alt="Google Icon"
          style={{ width: "50px", height: "50px" }}
        />

        <Button title="Signup" onPress={() => MyDrawer} color="#3498db" />
      </ThemedView>
    </View>
>>>>>>> 314fbea687fe10af96ca7845586b1c3686953675
  );
};

<<<<<<< HEAD
registerRootComponent(App);
=======
function AddFriends() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

function MyFriends() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="SOS Plus" component={SOSPlus} />
      <Drawer.Screen name="Add Friends" component={AddFriends} />
      <Drawer.Screen name="My Friends" component={MyFriends} />
    </Drawer.Navigator>
  );
}

// No need for NavigationContainer here if it's already in the root of the app
export default function App() {
  return <SignupScreen  />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  panicButton: {
    backgroundColor: 'red',
    paddingVertical: 65,
    paddingHorizontal: 50,
    borderRadius: 1000, // Makes the button circular
  },
  panicButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
    color: "#333",
  },
  inputContainer: {
    width: "30%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
});
>>>>>>> 314fbea687fe10af96ca7845586b1c3686953675
