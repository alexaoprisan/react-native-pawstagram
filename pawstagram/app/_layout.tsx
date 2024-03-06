import { SafeAreaView, View } from 'react-native';
import Header from './_components/Header';
import Navigation from './_components/Navigation';

export default function HomeLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Header label="" />
      <Navigation />
    </SafeAreaView>
  );
}
