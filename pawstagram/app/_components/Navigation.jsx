import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UploadScreen from '../screens/UploadScreen';

// // Screen namesr
const homeName = 'Home';
const uploadName = 'Upload';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let iconColor = focused ? '#00CED1' : color;

    if (route.name === homeName) {
      iconName = focused ? 'home-outline' : 'home-outline';
    } else if (route.name === uploadName) {
      iconName = focused ? 'chevron-up-outline' : 'chevron-up-outline';
    } else if (route.name === profileName) {
      iconName = focused ? 'paw-outline' : 'paw-outline';
    }

    return <Ionicons name={iconName} size={size + 5} color={iconColor} />;
  },
});

export default function Navigation() {
  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={screenOptions}
        >
          <Tab.Screen
            name={homeName}
            component={HomeScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Pawstagram
                </Text>
              ),
              headerTitleAlign: 'center', // Center align the header title
              headerStyle: {
                height: 70, // Adjust the height as needed
              },
            }}
          />
          <Tab.Screen
            name={uploadName}
            component={UploadScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Pawstagram
                </Text>
              ),
              headerTitleAlign: 'center', // Center align the header title
              headerStyle: {
                height: 70, // Adjust the height as needed
              },
            }}
          />
          <Tab.Screen
            name={profileName}
            component={ProfileScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Pawstagram
                </Text>
              ),
              headerTitleAlign: 'center', // Center align the header title
              headerStyle: {
                height: 70, // Adjust the height as needed
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
