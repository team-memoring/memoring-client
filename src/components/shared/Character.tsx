import {Animated, StyleSheet, View} from 'react-native';

import CharacterCloseEye from '../../assets/icons/character_close_eye.svg';
import CharacterHappy from '../../assets/icons/character_happy.svg';
import CharacterSad from '../../assets/icons/character_sad.svg';
import CharacterOpenEye from '../../assets/icons/character_open_eye.svg';

export type CharacterType = 'close' | 'open' | 'happy' | 'sad';

interface CharacterProps {
  type?: CharacterType;
  bottom?: number;
  animatedTransformValue?: Animated.Value;
}

const Character = ({
  type = 'close',
  bottom = -430,
  animatedTransformValue,
}: CharacterProps) => {
  const renderCharacter = () => {
    switch (type) {
      case 'close':
        return <CharacterCloseEye width={768} height={768} />;
      case 'open':
        return <CharacterOpenEye width={768} height={768} />;
      case 'happy':
        return <CharacterHappy width={768} height={768} />;
      case 'sad':
        return <CharacterSad width={768} height={768} />;
      default:
        return null;
    }
  };

  return (
    <Animated.View
      style={[
        styles.characterContainer,
        {bottom},
        animatedTransformValue && {
          transform: [{translateY: animatedTransformValue}],
        },
      ]}>
      {renderCharacter()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  characterContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default Character;
