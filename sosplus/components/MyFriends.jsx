import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MyFriends = () => {
  const [friendsList, setFriendsList] = useState([
    { id: '1', name: 'John Doe', email: 'johnDoe@gmail.com', phone: '0739238982', requestAccepted: true },
    { id: '2', name: 'Jane Smith', email: 'janeSmith@gmail.com', phone: '0723456789', requestAccepted: false },
    { id: '3', name: 'Emily Johnson', email: 'emilyJohnson@gmail.com', phone: '0731234567', requestAccepted: true },
  ]);

  // Filter friends who have accepted the request
  const acceptedFriends = friendsList.filter(friend => friend.requestAccepted);

  return (
    <View style={styles.container}>
      <View style={styles.myFriendsContainer}>
        {acceptedFriends.length > 0 ? (
          <FlatList
            data={acceptedFriends}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.friendCard}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.name[0]}</Text>
                  </View>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.friendName}>{item.name}</Text>
                  <Text style={styles.friendEmail}>{item.email}</Text>
                  <Text style={styles.friendPhone}>{item.phone}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noFriendsText}>No friends have accepted your request yet.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  friendCard: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center',
    justifyContent: 'space-between', // Spread items across the row
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendEmail: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  friendPhone: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  myFriendsContainer: {
    marginTop: 20,
  },
  myFriendsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noFriendsText: {
    fontSize: 14,
    color: '#555',
  },
});

export default MyFriends;
