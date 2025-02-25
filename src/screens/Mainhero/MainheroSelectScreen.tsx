import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '../../components/shared/Header';

import {CustomText} from '../../components/shared';

import MainheroView from '../../components/Mainhero/MainheroView';
import {MainInfo} from '../../lib/types/members';
import {getMembersGetMain} from '../../api/memoring/members';

const MainheroSelectScreen = (): React.JSX.Element => {
  const [mainName, setMainName] = useState<MainInfo>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nameData = await getMembersGetMain();
        console.log('nameData:', nameData);
        setMainName(nameData.data);
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
    };

    fetchData();
  }, []);

  if (!mainName) return <View />;

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
            {mainName.memberName}님, 오늘은
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
