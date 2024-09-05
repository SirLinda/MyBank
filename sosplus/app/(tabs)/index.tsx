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
  return <MyDrawer  />;
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
