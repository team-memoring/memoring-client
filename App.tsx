/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {
  fetchKakaoProfile,
  signInWithKakao,
  signOutWithKakao,
  unlinkKakao,
} from './src/api/kakao';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const handleSignIn = async () => {
    const token = await signInWithKakao();
    console.log('Token:', token);
  };

  const handleSignOut = async () => {
    const message = await signOutWithKakao();
    console.log('Logout:', message);
  };

  const handleUnlink = async () => {
    const message = await unlinkKakao();
    console.log('Unlink:', message);
  };

  const handleGetProfile = async () => {
    const profile = await fetchKakaoProfile();
    console.log('Profile:', profile);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title="Sign In with Kakao" onPress={handleSignIn} />
          <Button title="Sign Out with Kakao" onPress={handleSignOut} />
          <Button title="Unlink Kakao" onPress={handleUnlink} />
          <Button title="Get Profile" onPress={handleGetProfile} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
