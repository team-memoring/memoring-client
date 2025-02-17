import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {BackHeader} from '../../components/shared';
import {
  useNavigation,
  useRoute,
  RouteProp,
  ParamListBase,
} from '@react-navigation/native';

type DiaryContentRouteProp = RouteProp<{params: {image: string}}, 'params'>;

const DiaryContentScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<DiaryContentRouteProp>();
  const imageUrl = route.params?.image;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingVertical: 10}}>
        <BackHeader
          onBackPress={() => navigation.navigate('Diary')}
          color="#222225"
        />
      </View>
      <View style={{paddingHorizontal: 16}}>
        <Image
          source={{uri: imageUrl}}
          style={[styles.image, {paddingHorizontal: 16}]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 246,
    borderRadius: 16,
  },
});

export default DiaryContentScreen;
