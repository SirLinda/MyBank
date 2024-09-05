import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type RootStackParamList = {
  signup: undefined;
  '(tabs)': undefined; // Define the types for navigation
  'signin': undefined;
};

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'signin'>;

export default function SignInScreen() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigation = useNavigation<SignInScreenNavigationProp>(); // Initialize navigation

    const handleSignIn = async () => {
        if (username && password) {
            try {
                console.log("Sending request with payload:", {
                    email: username,
                    password
                });
    
                const response = await fetch('http://127.0.0.1:8000/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer your_jwt_token', // Include this if required
                    },
                    body: JSON.stringify({
                        email: username,
                        password,
                    }),
                });
                
    
                const result = await response.json();
                if (response.ok) {
                    Alert.alert("Sign-in successful");
                    navigation.navigate('(tabs)');
                } else {
                    Alert.alert("Sign-in failed", result.detail[0]?.msg || "Unknown error");
                }
            } catch (error) {
                Alert.alert("An error occurred", error instanceof Error ? error.message : String(error));
            }
        } else {
            Alert.alert("Please fill in all fields");
        }
    };
    
    return (
        <View style={styles.outerContainer}>
            <ThemedView style={styles.container}>
                <ThemedText type="subtitle" style={styles.title}>
                    Sign In
                </ThemedText>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
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

                <TouchableOpacity style={styles.signinButton} onPress={handleSignIn}>
                    <Text style={styles.signinButtonText}>Sign In</Text>
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
                    <Text style={styles.googleButtonText}>Sign In with Google</Text>
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
    signinButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: 10,
    },
    signinButtonText: {
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
});
