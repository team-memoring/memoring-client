import {Pressable, StyleSheet, View} from 'react-native';
import PaginationIndicator, {
  PaginationIndicatorProps,
} from './PaginationIndicator';

import BackArrow from '../../assets/icons/back_arrow.svg';

interface PaginationHeaderProps extends PaginationIndicatorProps {
  onBackPress: () => void;
}

const PaginationHeader = ({
  currentIndex,
  totalSteps,
  onBackPress,
}: PaginationHeaderProps) => {
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={onBackPress}>
        <BackArrow />
      </Pressable>
      <PaginationIndicator
        currentIndex={currentIndex}
        totalSteps={totalSteps}
      />
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
});

export default PaginationHeader;
