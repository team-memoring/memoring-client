import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from './src/screens/Login/LoginScreen';
import SplashScreen from './src/screens/\bSplashScreen';
import LoginSelectScreen from './src/screens/Login/LoginSelectScreen';
import OnboardingCreateScreen from './src/screens/Onboarding/OnboardingCreateScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="LoginSelect"
            component={LoginSelectScreen}
            options={{
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="OnboardingCreate"
            component={OnboardingCreateScreen}
            options={{
              headerShown: false,
              animation: 'none',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
