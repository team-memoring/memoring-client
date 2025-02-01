import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from './src/screens/Login/LoginScreen';
import SplashScreen from './src/screens/\bSplashScreen';
import LoginSelectScreen from './src/screens/Login/LoginSelectScreen';
import OnboardingCreateScreen from './src/screens/Onboarding/OnboardingCreateScreen';
import {PortalProvider} from '@gorhom/portal';
import OnboardingInviteScreen from './src/screens/Onboarding/OnboardingInviteScreen';
import {Linking} from 'react-native';
import OnboardingCodeScreen from './src/screens/Onboarding/OnboardingCodeScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    const handleDeepLink = (event: {url: string}) => {
      console.log('Deep Link detected:', event.url);
      const url = event.url;
      if (url.includes('invite')) {
        //TODO: Code screen으로 다이렉트, code 파라미터로 전달
        console.log('code');
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url});
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <PortalProvider>
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
            <Stack.Screen
              name="OnboardingInvite"
              component={OnboardingInviteScreen}
              options={{
                headerShown: false,
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="OnboardingCode"
              component={OnboardingCodeScreen}
              options={{
                headerShown: false,
                animation: 'none',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PortalProvider>
  );
}

export default App;
