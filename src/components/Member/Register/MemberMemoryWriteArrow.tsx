import {Pressable} from 'react-native';

import ArrowLeft from '../../../assets/icons/arrow_left.svg';
import ArrowRight from '../../../assets/icons/arrow_right.svg';

interface MemberMemoryWriteArrowProps {
  isLeft: boolean;
  onPress: () => void;
  disabled?: boolean;
}

const MemberMemoryWriteArrow = ({
  isLeft,
  onPress,
  disabled = false,
}: MemberMemoryWriteArrowProps) => {
  return (
    <Pressable
      disabled={disabled}
      style={{
        padding: 10.4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F3',
        opacity: disabled ? 0.3 : 1,
        borderRadius: 40,
        alignSelf: 'flex-start',
      }}
      onPress={onPress}>
      {isLeft ? (
        <ArrowLeft width={11} height={11} color={'#444447'} onPress={onPress} />
      ) : (
        <ArrowRight
          width={11}
          height={11}
          color={'#444447'}
          onPress={onPress}
        />
      )}
    </Pressable>
  );
};

export default MemberMemoryWriteArrow;
