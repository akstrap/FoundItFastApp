import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PostItemScreen from './screens/PostItemScreen';
import MapScreen from './screens/MapScreen';
import LoginWithGoogleScreen from './screens/LoginWithGoogleScreen';
import SignUpScreen from './screens/SignUpScreen';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  'Post Item': undefined;
  Map: undefined;
  Details: {itemId: string};
  LoginWithGoogle: undefined;
  SignUp: undefined;
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
        <Stack.Screen
          name="LoginWithGoogle"
          component={LoginWithGoogleScreen}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
