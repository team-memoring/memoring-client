import React, {useState, useEffect} from 'react';
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

import {getMemories} from '../../api/memoring/memories';
import {Memory} from '../../lib/types/memories';
import Config from 'react-native-config';

const MainheroView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memoriesData = await getMemories();
        console.log('memoriesData:', memoriesData);
        setMemories(memoriesData.data);
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <FlatList
      data={memories}
      keyExtractor={item => item.memory_id.toString()}
      ListFooterComponent={<View style={{height: 200}} />}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Image
            source={{uri: `${Config.API_BASE_URL}/${item.memory_img}`}}
            style={styles.image}
          />
          <CustomText weight="ExtraBold" style={{fontSize: 24, marginTop: 20}}>
            {item.memory_title}
          </CustomText>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Quiz', {
                memoryId: item.memory_id,
                title: item.memory_title,
              })
            }
            style={item.is_used === 0 ? styles.button4New : styles.button4Sec}>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 22,
                color: item.is_used === 0 ? '#CE5419' : '#555558',
              }}>
              {item.is_used > 0 ? '다시 풀기' : '시작하기'}
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
    height: 396,
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
