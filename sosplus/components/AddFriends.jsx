import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

const AddFriends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friendsList, setFriendsList] = useState([
    { id: '1', name: 'John Doe', email: 'johnDoe@gmail.com', phone: '0739238982', requestSent: false },
    { id: '2', name: 'Jane Smith', email: 'janeSmith@gmail.com', phone: '0723456789', requestSent: false },
    { id: '3', name: 'Emily Johnson', email: 'emilyJohnson@gmail.com', phone: '0731234567', requestSent: false },
  ]);

  const [myFriends, setMyFriends] = useState([]);

  const handleAddFriend = (friend) => {
    if (!myFriends.some(f => f.id === friend.id)) {
      setMyFriends([...myFriends, friend]);
      Alert.alert(`${friend.name} added to My Friends`);
    } else {
      Alert.alert(`${friend.name} is already in My Friends`);
    }
  };

  const handleSendRequest = (friendId) => {
    setFriendsList(prevFriends =>
      prevFriends.map(friend =>
        friend.id === friendId ? { ...friend, requestSent: true } : friend
      )
    );
  };

  const filteredFriends = friendsList.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search friends..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredFriends}
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
            <TouchableOpacity
              style={[
                styles.requestButton,
                item.requestSent ? styles.requestSentButton : styles.sendRequestButton,
              ]}
              onPress={() => handleSendRequest(item.id)}
              disabled={item.requestSent} // Disable button if request has already been sent
            >
              <Text style={styles.requestButtonText}>
                {item.requestSent ? 'Request Sent ✔️' : 'Send Request'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
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
  requestButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sendRequestButton: {
    backgroundColor: '#3498db',
  },
  requestSentButton: {
    backgroundColor: '#2ecc71',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  myFriendsContainer: {
    marginTop: 20,
  },
  myFriendsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  myFriendCard: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  myFriendName: {
    fontSize: 16,
  },
  noFriendsText: {
    fontSize: 14,
    color: '#555',
  },
});

export default AddFriends;



