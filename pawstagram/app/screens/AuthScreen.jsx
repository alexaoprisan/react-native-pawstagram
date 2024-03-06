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
});

const AuthScreen = ({ onAuthentication }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate authentication logic (replace with your actual authentication logic)
    if (username === 'example' && password === 'password') {
      onAuthentication(); // Call the onAuthentication function passed from the parent component
    } else {
      alert('Invalid username or password');
    }
  };

  const handleSignup = () => {
    // Simulate sign-up logic (replace with your actual sign-up logic)
    alert('Sign up functionality is not implemented yet');
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../../images/logo.png')}
        style={{ width: 200, height: 200 }} // Specify the width and height of the image
      /> */}
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
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default AuthScreen;
