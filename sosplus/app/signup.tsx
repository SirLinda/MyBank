import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type RootStackParamList = {
  signup: undefined;
  '(tabs)': undefined; // Define the types for navigation
  'signin': undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'signup'>;

const countryCodes = [
  { code: '+27', label: 'South Africa' },
  { code: '+1', label: 'United States' },
  // Add more country codes here
];

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState(countryCodes[0].code); // Default to the first country code
  const navigation = useNavigation<SignupScreenNavigationProp>(); // Initialize navigation

  const handleSignup = async () => {
    // Validate inputs
    if (!email || !username || !password || !phoneNumber) {
      Alert.alert("Please fill in all fields");
      return;
    }
  
    // Format the phone number with the selected country code
    const formattedPhoneNumber = `${countryCode}${phoneNumber}`;
    console.log("Formatted Phone Number:", formattedPhoneNumber);
  
    try {
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name: username,
          phone: formattedPhoneNumber,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Alert.alert(result.message);
        navigation.navigate('signin'); // Navigate to the 'signin' screen on successful signup
      } else {
        Alert.alert("Signup failed", result.detail ? JSON.stringify(result.detail) : "An error occurred");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("An error occurred", error.message);
      } else {
        Alert.alert("An error occurred", "An unknown error happened");
      }
    }
  };
  
  return (
    <View style={styles.outerContainer}>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.title}>
          Create Account
        </ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.phoneContainer}>
          <Picker
            selectedValue={countryCode}
            style={styles.countryPicker}
            onValueChange={(itemValue) => setCountryCode(itemValue)}
          >
            {countryCodes.map((country) => (
              <Picker.Item key={country.code} label={country.label} value={country.code} />
            ))}
          </Picker>
          <TextInput
            style={styles.phoneInput}
            placeholder="Cellphone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}>OR</Text>
          <View style={styles.separator} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={{ uri: "/app/(tabs)/icons/googleIcon.png" }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign Up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signinLink} onPress={() => navigation.navigate('signin')}>
          <Text style={styles.signinText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  phoneContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
  },
  countryPicker: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#f9f9f9",
    height: 50,
    marginRight: 10,
  },
  phoneInput: {
    flex: 2,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#999',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#333',
  },
  signinLink: {
    marginTop: 20,
  },
  signinText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
  },
});
