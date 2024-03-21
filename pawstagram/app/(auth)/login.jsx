import { router, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string(),
  passwordHash: z.string().min(8),
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
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '30%', // Adjust button width as needed
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4682B4', // Example styling
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  scrollViewContent: {
    marginTop: 120,
  },
});

export default function Login() {
  const [username, setUsername] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setIsError] = useState('');
  const navigation = useNavigation(); // Get navigation object

  async function handleLogin() {
    const userData = {
      username,
      passwordHash,
    };

    // input validation
    const validatedLogin = loginSchema.safeParse(userData);
    console.log('validated Login:', validatedLogin);
    if (!validatedLogin.success) {
      setErrorMessage('Username or password invalid');
      setIsError(true);
    } else {
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      // console.log('Response:', response);

      const data = await response.json();
      console.log('fetched data:', data);

      if (!response.ok) {
        setErrorMessage(data.errors[0].message);
        setIsError(true);
      }

      if (response.ok) {
        router.navigate('../HomeScreen'); // Navigate to HomeScreen using React Navigation
      }
    }
  }

  const handleGoToSignup = () => {
    router.push('/signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            accessibilityLabel="picture with two paws"
            source={{
              uri: 'https://seeklogo.com/images/P/paw-paw-logo-9611469C33-seeklogo.com.png',
            }}
          />
          <Text style={styles.title}>Pawstagram</Text>
          <Text style={styles.description}>
            Where Every Paw Tells a Story - Connect with Pet Lovers, Share
            Adventures, and Create Lasting Memories!
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={passwordHash}
              onChangeText={setPasswordHash}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleLogin}
            accessibilityLabel="login button"
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable
            onPress={handleGoToSignup}
            accessibilityLabel="signup button"
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
