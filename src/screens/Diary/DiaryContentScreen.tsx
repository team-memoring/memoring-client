import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, View, Image, Animated, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {TitleHeader, CustomText} from '../../components/shared';
import {
  useNavigation,
  useRoute,
  RouteProp,
  ParamListBase,
} from '@react-navigation/native';
import {getEventsGeteventsbymemoryidMemoryid} from '../../api/memoring/events';

import {Event} from '../../lib/types/events';
import Config from 'react-native-config';

const indexMap: {[key: number]: string} = {
  0: '첫번째',
  1: '두번째',
  2: '세번째',
  3: '네번째',
  4: '다섯번째',
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type RootStackParamList = {
  EventParams: {memoryId: number; memoryTitle: string};
};

const DiaryContentScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<RootStackParamList, 'EventParams'>>();
  const {memoryId, memoryTitle} = route.params;
  const [events, setEvents] = useState<Event[]>([]);

  const offsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await getEventsGeteventsbymemoryidMemoryid(memoryId);
        setEvents(eventData.data);
        console.log('events', eventData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (events.length === 0) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingVertical: 2}}>
        <TitleHeader
          onBackPress={() => navigation.goBack()}
          title={memoryTitle}
          color="#222225"
        />
      </View>
      <View style={{paddingHorizontal: 16}}>
        <Image
          source={{uri: `${Config.API_BASE_URL}/${events[0].event_img}`}}
          style={styles.image}
        />
      </View>
      <View style={{paddingVertical: 16}}>
        <Animated.FlatList
          data={events}
          keyExtractor={item => item.event_id.toString()}
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
                    source={{
                      uri: `${Config.API_BASE_URL}/${events[index].event_img}`,
                    }}
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
                    {events[index].event_time}
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
                      {events[index].event_text}
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
