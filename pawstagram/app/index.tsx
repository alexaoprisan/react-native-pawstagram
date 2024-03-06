import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import LoginButton from './_components/LoginButton';
import Navigation from './_components/Navigation';
import SignUpButton from './_components/SignUpButton';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUpPress = () => {
    // Logic to handle sign-up
    setIsLoggedIn(true); // Update isLoggedIn state after successful sign-up
  };

  const handleLoginPress = () => {
    // Logic to handle login
    setIsLoggedIn(true); // Update isLoggedIn state after successful login
  };

  return (
    <SafeAreaView>
      {!isLoggedIn ? (
        <>
          <SignUpButton onPress={handleSignUpPress} />
          <LoginButton onPress={handleLoginPress} />
          <Text>Hello</Text>
        </>
      ) : (
        <Navigation />
      )}
    </SafeAreaView>
  );
}
