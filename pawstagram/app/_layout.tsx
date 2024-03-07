import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Navigation from './_components/Navigation';
import AuthScreen from './screens/AuthScreen';

export default function HomeLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user authentication

  // Function to handle successful login or sign-up
  const handleAuthentication = () => {
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView className="flex-1">
      {isLoggedIn ? (
        <Navigation /> // Render the BottomNavigation component if user is authenticated
      ) : (
        <AuthScreen onAuthentication={handleAuthentication} /> // Render authentication screen if user is not authenticated
      )}
    </SafeAreaView>
  );
}
