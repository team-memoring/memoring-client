import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BackArrow from '../../assets/icons/back_arrow.svg';
import {CustomText} from '../../components/shared';

const MemberQuizListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleRegenaratePress = () => {
    navigation.navigate('MemberQuizGen');
  };

  const handleImgChangePress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable
          onPress={handleRegenaratePress}
          style={styles.backButtonContainer}>
          <BackArrow color="#77777A" />
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 16, color: '#77777A'}}>
            재생성
          </CustomText>
        </Pressable>
        <TouchableOpacity onPress={handleImgChangePress}>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 16, color: '#77777A'}}>
            이미지 변경
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 13,
    backgroundColor: '#F0F0F3',
    borderRadius: 50,
  },
});

export default MemberQuizListScreen;
