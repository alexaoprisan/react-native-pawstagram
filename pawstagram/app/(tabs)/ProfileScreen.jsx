// import { Cloudinary } from '@cloudinary/url-gen';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileDescription: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00CED1',
    textAlign: 'center',
    marginBottom: 10,
  },
  postGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  postImage: {
    aspectRatio: 1,
    width: '50%',
    marginBottom: 10,
  },
  optionsContainer: {
    position: 'absolute',
    top: 120, // Adjust this value as needed
    left: 20, // Adjust this value as needed
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

const ProfileScreen = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleImagePress = (isProfilePicture) => {
    if (isProfilePicture) {
      setShowOptions(true); // Show options only if it's the profile picture
    }
  };

  const handleOptionPress = async (option) => {
    setShowOptions(false);
    if (option === 'Open Gallery') {
      // Logic to open the phone gallery
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        console.log(result.uri);
        // Handle the selected image
      }
    } else if (option === 'Upload Picture') {
      // Logic to handle picture upload
      // For example, navigate to a screen for picture upload
      navigation.navigate('UploadScreen');
    }
  };

  // Sample data for profile posts
  const profilePosts = [
    {
      id: 1,
      imageUrl:
        'https://image.petmd.com/files/styles/978x550/public/2023-09/black-cat-breeds.jpg?w=2048&q=75',
    },
    {
      id: 2,
      imageUrl:
        'https://image.petmd.com/files/inline-images/black-cat-breeds-american-shorthair.jpeg?VersionId=FHXiYOmOykNtIdlZ.V5LQC_E8wXzlgyG',
    },
    // { id: 3, imageUrl: 'https://via.placeholder.com/200' },
    // Add more posts as needed
  ];

  // Calculate the width of each post image based on the number of images per row
  const imagesPerRow = 3;
  const imageWidth = (windowWidth - 40) / imagesPerRow; // Subtract padding

  return (
    <View style={styles.container}>
      {/* Profile header */}
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={() => handleImagePress(true)}>
          <Image
            source={{
              uri: 'https://image.petmd.com/files/styles/978x550/public/2023-09/black-cat-breeds.jpg?w=2048&q=75',
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.username}>Tofu2023</Text>
        <Text style={styles.profileDescription}>
          5 year old black cat for good luck. I love playing with my red ball.
        </Text>
      </View>

      {/* Profile posts grid */}
      <View style={styles.postGrid}>
        {profilePosts.map((post) => (
          <TouchableOpacity
            key={post.id}
            onPress={() => handleImagePress(false)}
          >
            <Image
              source={{ uri: post.imageUrl }}
              style={[styles.postImage, { width: imageWidth }]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Options modal */}
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionPress('Open Gallery')}
          >
            <Text style={styles.optionText}>Open Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionPress('Upload Picture')}
          >
            <Text style={styles.optionText}>Upload Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => setShowOptions(false)}
          >
            <Text style={styles.optionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
