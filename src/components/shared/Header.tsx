import {Image, StyleSheet, View, Pressable} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Logo from '../../assets/icons/logo.svg';
import DiaryLogo from '../../assets/icons/diary.svg';

import {useEffect, useState} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {getUser} from '../../utils/storage';

interface HeaderProps {
  showDiaryLogo?: boolean;
}

const Header = ({showDiaryLogo = true}: HeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [profileImageUrl, setProfileImageUrl] = useState<null | string>(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      if (user) {
        setProfileImageUrl(user.profileImageUrl);
      }
    };

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Logo width={120} height={24} />
      <View style={styles.rightContainer}>
        {showDiaryLogo && (
          <Pressable onPress={() => navigation.navigate('Diary')}>
            <DiaryLogo width={24} height={24} />
          </Pressable>
        )}
        {profileImageUrl && (
          <Image source={{uri: profileImageUrl}} style={styles.image} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    borderRadius: 32,
  },
});

export default Header;
