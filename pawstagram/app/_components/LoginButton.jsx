import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

const LoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
