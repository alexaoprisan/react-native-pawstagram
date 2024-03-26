import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, upload } from 'cloudinary-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
  },
});

export default function UploadScreen() {
  // const path = usePathname();
  // const emptyScreenImage = require('../../assets/profile.jpg');
  // const avatarPlaceholderImage = require('../../assets/avatar.jpg');
  // const [user, setUser] = useState(null);
  // const [avatar, setAvatar] = useState(avatarPlaceholderImage);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to pick an image from
  // the device's media library
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log('file',result.assets[0].uri)
    console.log('result:',result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsLoading(true);
      uploadPickedImage(result.assets[0].uri);
    }
  };

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region cloudinary image upload function

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dwqot3kc3',
    },
    url: {
      secure: true,
    },
  });

  // Cloudinary options config
  const options = {
    upload_preset: 'flecsraj',
    unsigned: true,
  };

  // image upload function
  const uploadPickedImage = async (imagePath) => {
    await upload(cld, {
      file: imagePath,
      options: options,
      callback: (error: any, response: any) => {
        if (error) {
          console.log('this',error);
          setIsLoading(false);
          return {
            success: false,
            error: error,
          };
        } else {
          console.log({
            success: true,
            imageUrl: response.url,
          });
          storeImageUrl(response.url);
          // console.log(response.url)
          return {
            success: true,
            imageUrl: response.url,
          };
        }
      },
    });
  };

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region store uploaded image URL in database

  const storeImageUrl = async (cloudinaryImageUrl) => {
    try {
      const response = await fetch(`${nextHost}/api/users`, {
        method: 'PUT',
        body: JSON.stringify({
          userId: user.id,
          imageUrl: cloudinaryImageUrl,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data.imageUrl; // Return the stored image URL
      } else {
        throw new Error('Failed to store image URL');
      }
    } catch (error) {
      console.error('Error storing image URL:', error);
      return null;
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add your pawtastic image here!</Text>

      {/* Button to choose an image */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>

      {/* Conditionally render the image
			or error message */}


        {/* <View style={styles.imageContainer}>
          <Image source={{ uri: file }} style={styles.image} />
        </View> */}

       {/* <Text style={styles.errorText}>{error}</Text> */}

    </View>
  );
}
