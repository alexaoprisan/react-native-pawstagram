import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string().min(8),
  username: z.string(),
  birthdate: z.string(),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    width: '40%', // Adjust button width as needed
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4682B4', // Example styling
    borderRadius: 7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  goBackContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default function Signup() {
  const [username, setUsername] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  async function handleSignup() {
    const userData = {
      username, // Use 'username' instead of 'userName'
      passwordHash,
      birthdate,
      email,
    };
    const validatedNewUser = signupSchema.safeParse(userData);
    console.log('validated signup:', validatedNewUser);
    console.log('userData:', userData);

    if (!validatedNewUser.success) {
      setErrorMessage('Username already taken');
      setError(true);
    } else {
      const response = await fetch(`/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).catch(console.error);
      const data = await response.json();
      console.log('signup:', data);

      if (!response.ok) {
        setErrorMessage(data.errors[0].message);
        setError(true);
      }

      if ('errors' in data) {
        setError(data.errors);
        return;
      }
      if (response.ok) {
        router.navigate('/login'); // Navigate to Login using React Navigation
      }
    }
  }

  const handleGoBack = () => {
    router.navigate('/login');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        accessibilityLabel="picture with two paws"
        source={{
          uri: 'https://seeklogo.com/images/P/paw-paw-logo-9611469C33-seeklogo.com.png',
        }}
      />
      <Text style={styles.title}>Sign Up</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TextInput
            style={styles.input}
            accessibilityLabel="username input field"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            accessibilityLabel="password input field"
            placeholder="Password"
            secureTextEntry
            value={passwordHash}
            onChangeText={setPasswordHash}
          />
          <TextInput
            style={styles.input}
            accessibilityLabel="birthdate input field"
            placeholder="Birthdate (MM/DD/YYYY)"
            value={birthdate}
            onChangeText={setBirthdate}
          />
          <TextInput
            style={styles.input}
            accessibilityLabel="email input field"
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </TouchableWithoutFeedback>
      <Pressable
        onPress={handleSignup}
        accessibilityLabel="sign up button"
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <View style={styles.goBackContainer}>
        <Pressable
          onPress={handleGoBack}
          accessibilityLabel="back to login button"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Go back to login</Text>
        </Pressable>
      </View>
    </View>
  );
}
