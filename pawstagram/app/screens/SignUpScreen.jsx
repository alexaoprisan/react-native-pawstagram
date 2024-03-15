import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

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
    marginTop: 70,
  },
});

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  async function handleSignup() {
    const userData = {
      username,
      passwordHash,
      birthdate,
      email,
    };
    const signUpRequest = await fetch(`/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }).catch(console.error);
    const signUpResponse = await signUpRequest.json();
    console.log('signup:', signUpResponse);
  }

  const handleGoBack = () => {
    navigation.navigate('AuthScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://seeklogo.com/images/P/paw-paw-logo-9611469C33-seeklogo.com.png',
        }}
      />
      <Text style={styles.title}>Sign Up</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Birthdate (MM/DD/YYYY)"
        value={birthdate}
        onChangeText={setBirthdate}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Sign Up" onPress={handleSignup} />

      <View style={styles.buttonContainer}>
        <Button title="Go back to login" onPress={handleGoBack} />
      </View>
    </View>
  );
}
