import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '../../components/shared/Header';

import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomText} from '../../components/shared';
import {getUser} from '../../utils/storage';

import MainheroView from '../../components/Mainhero/MainheroView';

const categories = ['가족 여행', '취미 활동', '직장 생활', '어린 시절'];

const MainheroSelectScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [username, setUsername] = React.useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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
            style={{fontSize: 25, color: '#222225'}}>
            어떤 추억을 떠올려볼까요?
          </CustomText>
        </View>
        <View
          style={{
            paddingVertical: 20,
          }}>
          <FlatList
            data={categories}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              const isSelected = selectedCategory === item;

              const isFirstItem = index === 0;
              const isLastItem = index === categories.length - 1;

              return (
                <TouchableOpacity
                  style={[
                    styles.categoryItem,
                    isSelected && styles.selectedCategory,
                    {marginRight: !isLastItem ? 8 : 16},
                    {marginLeft: isFirstItem ? 16 : 0},
                  ]}
                  onPress={() => setSelectedCategory(item)}>
                  <CustomText
                    weight={isSelected ? 'ExtraBold' : 'Bold'}
                    style={[
                      {fontSize: 16, color: '#CE541A'},
                      isSelected && {fontSize: 16, color: '#FFFFFF'},
                    ]}>
                    {item}
                  </CustomText>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <MainheroView selectedCategory={selectedCategory} />
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
  categoryItem: {
    backgroundColor: '#F5D9CC',
    borderRadius: 48.5,

    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  selectedCategory: {
    backgroundColor: '#CE541A',
  },
});

export default MainheroSelectScreen;
