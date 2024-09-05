import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Button, TextInput, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";

// SOS Plus Screen with Panic Button
function SOSPlus() {
  const handlePanicPress = () => {
    Alert.alert("Panic button pressed!");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.panicButton} onPress={handlePanicPress}>
        <Text style={styles.panicButtonText}>Panic</Text>
      </TouchableOpacity>
    </View>
  );
}

// Signup Screen
function SignupScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignup = () => {
    // Validate signup fields
    if (username && password && phoneNumber) {
      Alert.alert("Signup successful");
      navigation.navigate("SOS Plus"); // Navigate to the drawer
    } else {
      Alert.alert("Please fill in all fields");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <ThemedText type="title" style={styles.headerTitle}>
          Create Account
        </ThemedText>
      }
    >
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

        <Text style={styles.orText}>--- OR ---</Text>

        <Text style={styles.label}>Signup with Google:</Text>
        <Image source={require('@/assets/images/googleIcon.png')} style={styles.googleIcon} />

        <Button title="Signup" onPress={handleSignup} color="#3498db" />
      </ThemedView>
    </ParallaxScrollView>
  );
}
// Drawer Screens
function AddFriends() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Add Friends Screen</Text>
    </View>
  );
}

function MyFriends() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>My Friends Screen</Text>
    </View>
  );
}

// Drawer Navigation
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

// Main App Component with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Signup">
        <Drawer.Screen name="Signup" component={SignupScreen} />
        <Drawer.Screen name="Main App" component={MyDrawer} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  panicButton: {
    backgroundColor: "red",
    paddingVertical: 65,
    paddingHorizontal: 50,
    borderRadius: 1000, // Circular shape
  },
  panicButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
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
    width: "80%",
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
  orText: {
    marginVertical: 20,
    fontSize: 16,
    color: "#888",
  },
  googleIcon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
});

