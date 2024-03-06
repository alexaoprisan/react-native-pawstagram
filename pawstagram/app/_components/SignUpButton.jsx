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

const SignUpButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
  );
};

export default SignUpButton;
