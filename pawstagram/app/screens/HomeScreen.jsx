import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    fontWeight: 'bold',
    color: '#00CED1',
    marginTop: 5,
  },
  datestamp: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  postImage: {
    width: '100%',
    height: '100%', // Ensure the image fills the container
  },
  postContainer: {
    width: screenWidth - 16, // Match screen width, subtracting padding
    aspectRatio: 1, // Make it a square
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    overflow: 'hidden',
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
});

// Sample data of posts
const postsData = [
  {
    id: 1,
    username: 'user1',
    picture: 'This is the first picture.',
    date: '2024-03-16',
    description: 'Description for the first post.',
  },
  {
    id: 1,
    username: 'user1',
    picture: 'This is the second picture.',
    date: '2024-03-17',
    description: 'Description for the second post.',
  },
  // Add more posts as needed
];

export default function HomeScreen({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  // Function to render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.datestamp}>{item.date}</Text>
      </View>
      <View style={styles.postContainer}>
        <Text style={styles.description}>{item.picture}</Text>

        {/* Moved inside post container */}
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={postsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
