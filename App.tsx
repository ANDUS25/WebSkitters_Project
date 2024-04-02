/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
// import {Provider} from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/Home';
import LogIn from './Screens/LogIn';
import SignIn from './Screens/SignIn';
import WelcomeScreen from './Screens/Welcome';
import { default as useAuth } from './hooks/useAuth';
// import {store} from './toolkit/store';

const Stack = createNativeStackNavigator();

const App = () => {
  const {user} = useAuth();
  return (
    // <Provider store={store}>

    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    // </Provider>
  );
};

export default App;
