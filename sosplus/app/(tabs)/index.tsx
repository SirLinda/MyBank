import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


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
  );
}

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
  return <MyDrawer />;
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
  },
});
