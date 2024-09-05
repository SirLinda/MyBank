import { useState } from "react";
import { TextInput, Button, StyleSheet, Alert, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignup = () => {
    // Add logic for signup validation
    if (username && password && phoneNumber) {
      Alert.alert("Signup successful");
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
        --- OR ---
        <p>Signup with google </p>
        <img
          src="/app/(tabs)/icons/googleIcon.png"
          alt="Google Icon"
          style={{ width: "50px", height: "50px" }}
        />

        <Button title="Signup" onPress={handleSignup} color="#3498db" />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
