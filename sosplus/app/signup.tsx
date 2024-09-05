import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Button, TextInput, Image } from 'react-native';
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

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
        <View style={styles.outerContainer}>
            <ThemedView style={styles.container}>
                <ThemedText type="subtitle" style={styles.title}>
                    Create Account
                </ThemedText>

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

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
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
});
