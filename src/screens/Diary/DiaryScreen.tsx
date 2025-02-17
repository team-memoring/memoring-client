import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {TitleHeader, CustomText} from '../../components/shared';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import DiaryContentsView from '../../components/Diary/DiaryContentsView';

const DiaryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', paddingVertical: 10}}>
        <TitleHeader
          onBackPress={() => navigation.navigate('MainheroSelect')}
          title="가족 다이어리"
          color="#CE5419"
        />
      </View>
      <View style={{paddingVertical: 12, paddingHorizontal: 16}}>
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 24,
            color: '#222225',
            lineHeight: 32,
          }}>
          우리 가족 다이어리를{'\n'}함께 확인해보아요.
        </CustomText>
      </View>
      <View style={{paddingTop: 20}}>
        <DiaryContentsView />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
  },
});

export default DiaryScreen;
