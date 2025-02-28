import {Pressable, StyleSheet, View} from 'react-native';
import PaginationIndicator, {
  PaginationIndicatorProps,
} from './PaginationIndicator';

import BackArrow from '../../assets/icons/back_arrow.svg';
import {CustomText} from '.';

interface PaginationHeaderProps extends PaginationIndicatorProps {
  onBackPress: () => void;
  onJumpPress?: () => void;
}

const PaginationHeader = ({
  currentIndex,
  totalSteps,
  onBackPress,
  onJumpPress,
}: PaginationHeaderProps) => {
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={onBackPress}>
        <BackArrow color="#CE5419" />
      </Pressable>
      <PaginationIndicator
        currentIndex={currentIndex}
        totalSteps={totalSteps}
      />
      {onJumpPress && (
        <Pressable style={styles.jumpButtonContainer} onPress={onJumpPress}>
          <CustomText weight="ExtraBold" style={styles.jumpButton}>
            건너뛰기
          </CustomText>
        </Pressable>
      )}
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
    backgroundColor: '#F4D9CC',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  jumpButtonContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    height: 40,
    transform: [{translateY: -20}],
    justifyContent: 'center',
  },
  jumpButton: {
    fontSize: 16,
    color: '#77777A',
  },
});

export default PaginationHeader;
