import React, {useEffect} from 'react';

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
import OnboardingStartScreen from './src/screens/Onboarding/OnboardingStartScreen';
import MemberHomeScreen from './src/screens/Member/MemberHomeScreen';
import MemberRegisterScreen from './src/screens/Member/MemberRegisterScreen';
import MemberQuizGenScreen from './src/screens/Member/MemberQuizGenScreen';
import MemberQuizListScreen from './src/screens/Member/MemberQuizListScreen';

import MainheroSelectScreen from './src/screens/Mainhero/MainheroSelectScreen';
import QuizScreen from './src/screens/Quiz/QuizScreen';
import QuizEndScreen from './src/screens/Quiz/QuizEndScreen';
import MemberQuizCompleteScreen from './src/screens/Member/MemberQuizCompleteScreen';
import MemberQuizDetailScreen from './src/screens/Member/MemberQuizDetailScreen';
import MemberStatisticsScreen from './src/screens/Member/MemberStatisticsScreen';

import DiaryScreen from './src/screens/Diary/DiaryScreen';
import DiaryContentScreen from './src/screens/Diary/DiaryContentScreen';

import {AuthProvider} from './src/contexts/AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/utils/navigationHelper';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

// 앱의 루트 컴포넌트
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
      <QueryClientProvider client={queryClient}>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaProvider>
            <AuthProvider>
              <AppNavigator />
            </AuthProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </PortalProvider>
  );
}

// 인증 상태에 따라 내비게이션을 관리하는 컴포넌트
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Login'}>
      {/* No Auth needed*/}
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

      {/* Onboarding */}
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
      <Stack.Screen
        name="OnboardingStart"
        component={OnboardingStartScreen}
        options={{
          headerShown: false,
          animation: 'none',
        }}
      />

      {/* Member */}
      <Stack.Screen
        name="MemberHome"
        component={MemberHomeScreen}
        options={{
          headerShown: false,
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="MemberRegister"
        component={MemberRegisterScreen}
        options={{
          headerShown: false,
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="MemberQuizGen"
        component={MemberQuizGenScreen}
        options={{
          headerShown: false,
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="MemberQuizList"
        component={MemberQuizListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MemberQuizComplete"
        component={MemberQuizCompleteScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MemberQuizDetail"
        component={MemberQuizDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MemberStatistics"
        component={MemberStatisticsScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Hero */}
      <Stack.Screen
        name="MainheroSelect"
        component={MainheroSelectScreen}
        options={{
          headerShown: false,
          animation: 'none',
        }}
      />

      {/* Quiz */}
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          headerShown: false,
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="QuizEnd"
        component={QuizEndScreen}
        options={{
          headerShown: false,
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="Diary"
        component={DiaryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DiaryContent"
        component={DiaryContentScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default App;
