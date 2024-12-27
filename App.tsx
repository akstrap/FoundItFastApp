import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PostItemScreen from './screens/PostItemScreen';
import MapScreen from './screens/MapScreen';

// Define the types for navigation
export type RootStackParamList = {
  Login: undefined; // Add this line for the Login screen
  Home: undefined;
  'Post Item': undefined;
  Map: undefined;
  Details: {itemId: string};
};

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Post Item" component={PostItemScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
