import React from 'react';
import { Text, View } from 'react-native';

export default function UploadScreen({ navigation }) {
  return (
    <View>
      <Text onPress={() => alert('This is the Upload Screen.')}>
        Uploadscreen
      </Text>
    </View>
  );
}
