import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UploadScreen from '../screens/UploadScreen';

// Screen names
const homeName = 'Home';
const uploadName = 'Upload';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === homeName) {
      iconName = focused ? 'home-outline' : 'home-outline';
    } else if (route.name === uploadName) {
      iconName = focused ? 'chevron-up-outline' : 'chevron-up-outline';
    } else if (route.name === profileName) {
      iconName = focused ? 'paw-outline' : 'paw-outline';
    }

    return <Ionicons name={iconName} size={size + 5} color={color} />;
  },
});

export default function Navigation() {
  return (
    <SafeAreaView>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={screenOptions}
        >
          <Tab.Screen
            name={homeName}
            component={HomeScreen}
            headerShown={false}
          />
          <Tab.Screen
            name={uploadName}
            component={UploadScreen}
            headerShown={false}
          />
          <Tab.Screen
            name={profileName}
            component={ProfileScreen}
            headerShown={false}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
