import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import BackArrow from '../../assets/icons/back_arrow.svg';
import {CustomText} from '../../components/shared';

interface TitleHeaderProps {
  title: string;
  color?: string;
  onBackPress: () => void;
}

const TitleHeader = ({
  title,
  color = '#CE5419',
  onBackPress,
}: TitleHeaderProps) => {
  return (
    <View style={styles.header}>
      <Pressable
        style={[
          styles.backButton,
          {backgroundColor: color === '#CE5419' ? '#F4D9CC' : '#F0F0F3'},
        ]}
        onPress={onBackPress}>
        <BackArrow color={color} />
      </Pressable>
      <CustomText weight="ExtraBold" style={[styles.title, {color}]}>
        {title}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{translateY: -20}],
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
  },
});

export default TitleHeader;
