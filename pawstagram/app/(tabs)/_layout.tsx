import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../(auth)/login';
// screens
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import UploadScreen from './UploadScreen';

// Define constant names for tab names
const homeName = 'Home';
const uploadName = 'Upload';
const profileName = 'Profile';

// Create bottom tab navigator and native stack navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Define screen options for tab icons and labels
const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let iconColor = focused ? '#00CED1' : 'black';

    // Set icon name based on route name
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

// Define the main navigation container
export default function AppNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Define the main tab navigator
function Main() {
  return (
    <Tab.Navigator initialRouteName={homeName} screenOptions={screenOptions}>
      {/* Home Tab */}
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Pawstagram</Text>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            height: 70,
          },
        }}
      />
      {/* Upload Tab */}
      <Tab.Screen
        name={uploadName}
        component={UploadScreen}
        options={{
          headerTitle: () => (
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Pawstagram</Text>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            height: 70,
          },
        }}
      />
      {/* Profile Tab */}
      <Tab.Screen
        name={profileName}
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Pawstagram</Text>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            height: 70, // Adjust header height
          },
        }}
      />
    </Tab.Navigator>
  );
}
