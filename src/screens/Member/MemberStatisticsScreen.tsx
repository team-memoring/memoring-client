import {StatusBar, StyleSheet, View} from 'react-native';
import {BackHeader, CustomText} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import CharacterStarCrop from '../../assets/icons/character_star_crop.svg';

const MemberStatisticsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const adviseText = `독서, 낱말 퍼즐 풀기, 새로운 언어 배우기 등은 기억력 유지에 효과적이에요! 가족 및 친구와의 소통 또한 도움이 되니 함께 시도해보세요~`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <BackHeader
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            paddingTop: 12,
            paddingBottom: 20,
          }}>
          <CustomText
            weight="ExtraBold"
            style={{
              fontSize: 24,
              color: '#222225',
              lineHeight: 32,
            }}>
            선옥 님의 퀴즈 결과를
          </CustomText>
          <CustomText
            weight="ExtraBold"
            style={{
              fontSize: 24,
              color: '#222225',
              lineHeight: 32,
            }}>
            확인해보세요.
          </CustomText>
        </View>
        <View style={styles.adviseContainer}>
          <View
            style={{
              flexDirection: 'column',
              gap: 4,
              marginBottom: 12,
            }}>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 20,
                color: '#CE5419',
                lineHeight: 32,
              }}>
              기억력 보존에 좋은 꿀팁!
            </CustomText>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {adviseText.split(' ').map((word, index) => (
                <CustomText
                  weight="ExtraBold"
                  style={{
                    fontSize: 17,
                    color: '#222225',
                    lineHeight: 26,
                  }}>
                  {word}{' '}
                </CustomText>
              ))}
            </View>
          </View>
          <CharacterStarCrop style={styles.adviseCharacter} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
  },
  adviseContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adviseCharacter: {},
});

export default MemberStatisticsScreen;
