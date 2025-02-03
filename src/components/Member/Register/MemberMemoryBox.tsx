import {StyleSheet, View} from 'react-native';

import MemoryImageUpload from './MemoryImageUpload';
import {IMemoryRegister} from '../../../lib/model/i-memory';
import {useFormContext} from 'react-hook-form';
import {CustomText} from '../../shared';

import MemberMemoryWriteArrow from './MemberMemoryWriteArrow';

const indexMap: {[key: number]: string} = {
  0: '첫번째',
  1: '두번째',
  2: '세번째',
  3: '네번째',
  4: '다섯번째',
};

interface MemberMemoryBoxProps {
  memoryIndex: number;
  onMemoryIndexChange: (memoryIndex: number) => void;
}

const MemberMemoryBox = ({
  memoryIndex,
  onMemoryIndexChange,
}: MemberMemoryBoxProps) => {
  const {control, getValues} = useFormContext<IMemoryRegister>();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 4,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <CustomText
            weight="ExtraBold"
            style={{
              fontSize: 20,
              color: '#CE5419',
            }}>
            {`0${memoryIndex + 1}`}
          </CustomText>
          <CustomText
            weight="ExtraBold"
            style={{
              fontSize: 20,
              color: '#222225',
            }}>
            {`${indexMap[memoryIndex]} 순간`}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
          }}>
          <MemberMemoryWriteArrow
            isLeft={true}
            onPress={() => onMemoryIndexChange(memoryIndex - 1)}
            disabled={memoryIndex === 0}
          />
          <MemberMemoryWriteArrow
            isLeft={false}
            onPress={() => onMemoryIndexChange(memoryIndex + 1)}
            disabled={memoryIndex === getValues('events').length - 1}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 12,
        }}>
        <MemoryImageUpload control={control} eventIndex={0} />
      </View>
      <View
        style={{
          marginTop: 16,
        }}>
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 15,
            color: '#444447',
          }}>
          추억의 날짜
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});

export default MemberMemoryBox;
