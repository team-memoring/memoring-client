import React, {useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import {CustomText} from '../../components/shared';

// const categoryData = {}  TODO: DB에서 불러오기

interface MainheroViewProps {
  selectedCategory: string;
}

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
  '가족 여행': [
    {
      id: '1',
      image:
        '/Users/mingyucheon/work/skt_fly_ai/OpenCV/chap04/images/matplot.jpg',
      quizCnt: 3,
      totalCnt: 10,
      title: '우리 가족 미술관 여행',
    },
    {
      id: '2',
      image:
        '/Users/mingyucheon/work/skt_fly_ai/OpenCV/chap08/images/scaling.jpg',
      quizCnt: 0,
      totalCnt: 10,
      title: '우리 가족 유적지 여행',
    },
    {
      id: '3',
      image:
        '/Users/mingyucheon/work/skt_fly_ai/OpenCV/chap08/images/translate.jpg',
      quizCnt: 10,
      totalCnt: 10,
      title: '개쩌는 여행',
    },
  ],
  '취미 활동': [
    {
      id: '4',
      image:
        '/Users/mingyucheon/work/skt_fly_ai/OpenCV/chap06/images/hist_stretch.jpg',
      quizCnt: 4,
      totalCnt: 10,
      title: '고양이 키우기',
    },
  ],
};

const MainheroView: React.FC<MainheroViewProps> = ({selectedCategory}) => {
  const data = categoryData[selectedCategory] || [];

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      ListFooterComponent={<View style={{height: 200}} />}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Image source={{uri: item.image}} style={styles.image} />
          <CustomText
            weight="ExtraBold"
            style={{
              fontSize: 16,
              marginTop: 26,
              color: item.quizCnt === item.totalCnt ? '#939396' : '#CE5419',
            }}>
            {item.quizCnt === item.totalCnt
              ? '풀이 완료'
              : item.quizCnt > 0
              ? `${item.quizCnt}/${item.totalCnt}개 진행 중`
              : '신규 퀴즈'}
          </CustomText>
          <CustomText weight="ExtraBold" style={{fontSize: 20, marginTop: 8}}>
            {item.title}
          </CustomText>
          <TouchableOpacity
            style={
              item.quizCnt < item.totalCnt
                ? styles.button4New
                : styles.button4Sec
            }>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 16,
                color: item.quizCnt < item.totalCnt ? '#CE5419' : '#555558',
              }}>
              {item.quizCnt === item.totalCnt
                ? '다시 풀기'
                : item.quizCnt < item.totalCnt && 0 < item.quizCnt
                ? '이어서 하기'
                : '퀴즈 시작하기'}
            </CustomText>
          </TouchableOpacity>
        </View>
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
    height: 410,
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

export default MainheroView;
