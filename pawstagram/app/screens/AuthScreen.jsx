import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { z } from 'zod';
import SignupPage from './SignUpScreen';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    height: 60,
    fontSize: 18,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default function Login() {
  const [username, setUsername] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState('');

  async function handleLogin() {
    //
    const validateLogin = loginSchema.safeParse({ username, passwordHash });
    if (!validateLogin.success) {
      setErrorMessage('Username or password invalid');
      setIsError(true);
    } else {
      const userData = {
        username,
        passwordHash,
      };
      const loginRequest = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).catch(console.error);
      const loginResponse = await loginRequest.json();
      console.log('signup:', loginResponse);
    }
  }

  const handleSignup = () => {
    // Toggle the visibility of the SignupPage
    setShowSignup(true);
  };

  return (
    <View style={styles.container}>
      {!showSignup && (
        <>
          <Image
            style={styles.image}
            source={{
              uri: 'https://seeklogo.com/images/P/paw-paw-logo-9611469C33-seeklogo.com.png',
            }}
          />
          <Text style={styles.title}>Pawstagram</Text>
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
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} style={styles.button} />
            <Button
              title="Sign Up"
              onPress={handleSignup}
              style={styles.button}
            />
          </View>
        </>
      )}
      {/* Conditional rendering of SignupPage */}
      {showSignup && (
        <SignupPage
          onClose={() => setShowSignup(false)} // Pass a callback to handle closing SignupPage
        />
      )}
    </View>
  );
}
