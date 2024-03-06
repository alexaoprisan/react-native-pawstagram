import React from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text onPress={() => alert('This is the Home Screen.')}>Homescreen</Text>
    </View>
  );
}
