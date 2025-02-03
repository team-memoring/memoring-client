import {Image, StyleSheet, View} from 'react-native';
import Logo from '../../assets/icons/logo.svg';

import {useEffect, useState} from 'react';
import {getUser} from '../../utils/storage';

const Header = () => {
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
      {profileImageUrl && (
        <Image source={{uri: profileImageUrl}} style={styles.image} />
      )}
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
  image: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    borderRadius: 32,
  },
});

export default Header;
