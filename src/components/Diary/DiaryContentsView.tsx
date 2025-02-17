import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import {CustomText} from '../../components/shared';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// const categoryData = {}  TODO: DB에서 불러오기

const categoryData: Record<
  string,
  {
    id: string;
    image: string;
    quizCnt: number;
    totalCnt: number;
    title: string;
  }[]
> = {
  categories: [
    {
      id: '1',
      image: '/Users/mingyucheon/work/dataset/memoring/Example.PNG',
      quizCnt: 3,
      totalCnt: 10,
      title: 'FLY AI OT 참석',
    },
  ],
};

const DiaryContentsView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const data = categoryData.categories || [];

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      ListFooterComponent={<View style={{height: 200}} />}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DiaryContent', {
              image: item.image,
              title: item.title,
            })
          }
          style={styles.card}>
          <Image source={{uri: item.image}} style={styles.image} />
          <CustomText weight="ExtraBold" style={{fontSize: 24, marginTop: 20}}>
            {item.title}
          </CustomText>
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
      snapToAlignment="start" // 스크롤 후 정렬 위치
      decelerationRate="fast" // 부드러운 스냅 효과
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    height: 330,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 246,
    borderRadius: 16,
  },
  button4New: {
    backgroundColor: '#f5e2d8',
    borderRadius: 48.48,
    alignItems: 'center',
    marginTop: 14,
    paddingVertical: 14,
  },
  button4Sec: {
    backgroundColor: '#F0F0F3',
    borderRadius: 48.48,
    alignItems: 'center',
    marginTop: 14,
    paddingVertical: 14,
  },
});

export default DiaryContentsView;
