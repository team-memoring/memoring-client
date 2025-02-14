import {Animated, StyleSheet} from 'react-native';

import CharacterCloseEye from '../../assets/icons/character_close_eye.svg';
import CharacterHappy from '../../assets/icons/character_happy.svg';
import CharacterSad from '../../assets/icons/character_sad.svg';
import CharacterOpenEye from '../../assets/icons/character_open_eye.svg';
import CharacterOpenEyeRight from '../../assets/icons/character_open_eye_right.svg';

import CharacterHeart from '../../assets/icons/character_heart.svg';
import CharacterTear from '../../assets/icons/character_tear.svg';

export type CharacterType =
  | 'close'
  | 'open'
  | 'happy'
  | 'sad'
  | 'openRight'
  | 'openLeft';

export type CharacterDecorationType = null | 'heart' | 'tear';

interface CharacterProps {
  type?: CharacterType;
  decoration?: CharacterDecorationType;
  bottom?: number;
  animatedTransformValue?: Animated.Value;
}

const Character = ({
  type = 'close',
  bottom = -430,
  animatedTransformValue,
  decoration,
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
      case 'openRight':
        return <CharacterOpenEyeRight width={768} height={768} />;
      case 'openLeft':
        return <CharacterOpenEye width={768} height={768} />;
      default:
        return null;
    }
  };

  const renderDecoration = () => {
    switch (decoration) {
      case 'heart':
        return (
          <CharacterHeart
            style={{
              marginBottom: 12,
              marginRight: 45,
            }}
          />
        );
      case 'tear':
        return (
          <CharacterTear
            style={{
              marginRight: 100,
            }}
          />
        );
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
      {renderDecoration()}
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
