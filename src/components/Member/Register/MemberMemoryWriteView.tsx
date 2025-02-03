import {StyleSheet, View} from 'react-native';
import {CustomText} from '../../shared';
import Caution from '../../../assets/icons/caution.svg';
import MemberMemoryBox from './MemberMemoryBox';

interface MemberMemoryWriteViewProps {
  memoryIndex: number;
  onMemoryIndexChange: (memoryIndex: number) => void;
}

const MemberMemoryWriteView = ({
  memoryIndex,
  onMemoryIndexChange,
}: MemberMemoryWriteViewProps) => {
  return (
    <View>
      <View style={styles.title}>
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 28,
            color: '#222225',
          }}>
          추억의 순간을 알려주세요
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginTop: 8,
          }}>
          <Caution width={16} height={16} />
          <CustomText
            weight="Bold"
            style={{
              fontSize: 16,
              color: '#939396',
            }}>
            최소 3개 - 최대 5개를 등록해주세요
          </CustomText>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 16,
          marginTop: 20,
        }}>
        <MemberMemoryBox
          memoryIndex={memoryIndex}
          onMemoryIndexChange={onMemoryIndexChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
});

export default MemberMemoryWriteView;
