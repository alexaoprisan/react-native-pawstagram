import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

// Get screen width using Dimensions
const { width: screenWidth } = Dimensions.get('window');

// Define styles for the HomeScreen component
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

// Define the HomeScreen component
export default function HomeScreen({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetchPostsData(); // Fetch posts data when the component mounts
  }, []);

  // Function to fetch posts data from the server
  const fetchPostsData = async () => {
    try {
      const response = await fetch('/api/posts'); // Replace '/api/posts' with your actual API endpoint
      if (response.ok) {
        const data = await response.json();
        console.log(data.showPosts[0]);
        setPostsData(data.showPosts); // Set the fetched posts data to state
      } else {
        throw new Error('Failed to fetch posts data');
      }
    } catch (error) {
      console.error('Error fetching posts data:', error);
    }
  };

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.datestamp}>{item.date}</Text>
      </View>

      <View style={styles.postContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        {/* Render the image */}
      </View>
      <Text style={styles.description}>{item.imageDescription}</Text>
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
