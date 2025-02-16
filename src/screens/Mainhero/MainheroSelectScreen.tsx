import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '../../components/shared/Header';

import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomText} from '../../components/shared';
import {getUser} from '../../utils/storage';

import MainheroView from '../../components/Mainhero/MainheroView';

const MainheroSelectScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [username, setUsername] = React.useState<string | null>(null);

  useEffect(() => {
    const loadUsername = async () => {
      const user = await getUser();

      if (user) {
        setUsername(user.nickname);
      }
    };

    loadUsername();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View>
        <View style={styles.text}>
          <CustomText
            weight="ExtraBold"
            style={{
              fontSize: 25,
              marginTop: 0,
              color: '#222225',
              lineHeight: 32,
            }}>
            {username}님, 오늘은
          </CustomText>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 25, color: '#222225', marginBottom: 20}}>
            어떤 추억을 떠올려볼까요?
          </CustomText>
        </View>
        <MainheroView />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
  },
  text: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});

export default MainheroSelectScreen;
