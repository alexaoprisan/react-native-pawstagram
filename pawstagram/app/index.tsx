import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Navigation from './_components/Navigation';

export default function App() {
  return (
    <SafeAreaView>
      <Navigation />
      <Text>Hello</Text>
    </SafeAreaView>
  );
}
