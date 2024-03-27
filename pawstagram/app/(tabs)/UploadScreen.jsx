import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, upload } from 'cloudinary-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  handleUpload,
  Image,
  StyleSheet,
  Text,
  TextInput,
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
    backgroundColor: '#4682B4',
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState('');

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
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
          userId: 1,
          imageUrl: cloudinaryImageUrl,
          imageDescription: description,
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

  // const handleUpload = async () => {
  //   if (image) {
  //     try {
  //       setIsLoading(true);
  //       const uploadedImageUrl = await uploadPickedImage(image);
  //       await storeImageUrl(uploadedImageUrl);
  //       setIsLoading(false);
  //       navigation.navigate('HomeScreen'); // Navigate to home screen after successful upload
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //       setIsLoading(false);
  //       // Handle error
  //     }
  //   } else {
  //     // Handle case where no image is selected
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add your pawtastic image here!</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter image description"
        value={description}
        onChangeText={setDescription}
      />
      {/* Add any loading indicator if needed */}
      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload Post</Text>
      </TouchableOpacity>
    </View>
  );
}
