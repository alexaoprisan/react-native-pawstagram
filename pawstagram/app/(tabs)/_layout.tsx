import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthScreen from '../(auth)/login';
// Screens
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import UploadScreen from './UploadScreen';

// Screen names
const homeName = 'Home';
const uploadName = 'Upload';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let iconColor = focused ? '#00CED1' : 'black';

    if (route.name === homeName) {
      iconName = focused ? 'home-outline' : 'home-outline';
    } else if (route.name === uploadName) {
      iconName = focused ? 'chevron-up-outline' : 'chevron-up-outline';
    } else if (route.name === profileName) {
      iconName = focused ? 'paw-outline' : 'paw-outline';
    }

    return <Ionicons name={iconName} size={size + 5} color={iconColor} />;
  },
  tabBarLabel: ({ focused }) => {
    let labelColor = focused ? '#00CED1' : 'black'; // Text color when selected or not
    return (
      <Text style={{ color: labelColor, fontSize: 10 }}>{route.name}</Text>
    );
  },
});

export default function TabNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthentication = () => {
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView className="flex-1">
      {isLoggedIn ? (
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
                headerTitleAlign: 'center',
                headerStyle: {
                  height: 70,
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
                headerTitleAlign: 'center',
                headerStyle: {
                  height: 70,
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
                headerTitleAlign: 'center',
                headerStyle: {
                  height: 70, // Adjust header height
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <AuthScreen /> // Render authentication screen if user is not authenticated
      )}
    </SafeAreaView>
  );
}