import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

type Props = {
  label: string;
};

export default function Header(props: Props) {
  return (
    <SafeAreaView className="pt-6">
      <View>
        <Text>{props.label}</Text>
      </View>
    </SafeAreaView>
  );
}
