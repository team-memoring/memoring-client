import {Pressable, StatusBar, StyleSheet, View} from 'react-native';

import BackArrow from '../../assets/icons/back_arrow.svg';

interface BackHeaderProps {
  onBackPress: () => void;
  isWhite?: boolean;
}

const BackHeader = ({onBackPress, isWhite = false}: BackHeaderProps) => {
  return (
    <View style={styles.header}>
      <Pressable
        style={[
          styles.backButton,
          {backgroundColor: isWhite ? '#F0F0F3' : '#F4D9CC'},
        ]}
        onPress={onBackPress}>
        <BackArrow color={isWhite ? '#222225' : '#CE5419'} />
      </Pressable>
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
});

export default BackHeader;
