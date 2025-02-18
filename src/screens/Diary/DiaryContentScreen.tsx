import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFormContext, useWatch} from 'react-hook-form';

import {TitleHeader, CustomText} from '../../components/shared';
import {
  useNavigation,
  useRoute,
  RouteProp,
  ParamListBase,
} from '@react-navigation/native';

const indexMap: {[key: number]: string} = {
  0: '첫번째',
  1: '두번째',
  2: '세번째',
  3: '네번째',
  4: '다섯번째',
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type DiaryContentRouteProp = RouteProp<
  {params: {image: string; title: string}},
  'params'
>;

const Memory: Record<
  string,
  {
    id: string;
    image: string;
    date: string;
    description: string;
  }[]
> = {
  events: [
    {
      id: '1',
      image: '/Users/mingyucheon/work/dataset/memoring/Example_2.PNG',
      date: '2024년 12월 23일',
      description:
        '아침에 일찍 가야해서 아침을 못 먹고 갔는데 간식으로 샌드위치를 줘서 맛있게 먹었어.',
    },
    {
      id: '2',
      image: '/Users/mingyucheon/work/dataset/memoring/Example_3.PNG',
      date: '2024년 12월 23일',
      description:
        '오리엔테이션을 다 듣고 열정반, 패기반으로 나뉘었는데 패기반에 합류하게 되었어.',
    },
    {
      id: '3',
      image: '/Users/mingyucheon/work/dataset/memoring/Example_4.PNG',
      date: '2024년 12월 23일',
      description:
        '팀장들은 득표수가 많은 사람들이 대표해서 맡게 되었는데 우리팀 팀장을 이규호였어.',
    },
  ],
};

const DiaryContentScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<DiaryContentRouteProp>();
  const title = route.params.title;
  const imageUrl = route.params.image;

  const data = Memory.events || [];

  const offsetY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingVertical: 2}}>
        <TitleHeader
          onBackPress={() => navigation.navigate('Diary')}
          title={title}
          color="#222225"
        />
      </View>
      <View style={{paddingHorizontal: 16}}>
        <Image source={{uri: imageUrl}} style={styles.image} />
      </View>
      <View style={{paddingVertical: 16}}>
        <Animated.FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({index}) => (
            <View style={{width: SCREEN_WIDTH, paddingHorizontal: 16}}>
              <Animated.View
                style={[styles.card, {transform: [{translateY: offsetY}]}]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 4,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <CustomText
                      weight="ExtraBold"
                      style={{
                        fontSize: 20,
                        color: '#CE5419',
                      }}>
                      {`0${index + 1}`}
                    </CustomText>
                    <CustomText
                      weight="ExtraBold"
                      style={{
                        fontSize: 20,
                        color: '#222225',
                      }}>
                      {`${indexMap[index]} 순간`}
                    </CustomText>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 8,
                  }}>
                  <Image
                    source={{uri: data[index].image}}
                    style={styles.descriptionImage}
                  />
                </View>
                <View
                  style={{
                    marginTop: 16,
                  }}>
                  <CustomText
                    weight="ExtraBold"
                    style={{
                      fontSize: 15,
                      color: '#444447',
                    }}>
                    {data[index].date}
                  </CustomText>
                </View>

                <View
                  style={{
                    marginTop: 16,
                  }}>
                  <CustomText
                    weight="ExtraBold"
                    style={{
                      fontSize: 15,
                      color: '#444447',
                    }}>
                    추억 설명{'\n'}
                  </CustomText>
                  <View style={styles.descriptionCard}>
                    <CustomText
                      weight="ExtraBold"
                      style={{
                        fontSize: 16,
                        color: '#444447',
                      }}>
                      {data[index].description}
                    </CustomText>
                  </View>
                </View>
              </Animated.View>
            </View>
          )}
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
  card: {
    padding: 16,
    backgroundColor: '#f0f0f7',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 246,
    borderRadius: 16,
  },
  descriptionCard: {
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 24,
    height: 165,
  },
  descriptionImage: {
    width: 108,
    height: 108,
    borderRadius: 16,
  },
});

export default DiaryContentScreen;
