import {
  Animated,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import MemoryImageUpload from './MemoryImageUpload';
import {IMemoryRegister} from '../../../lib/model/i-memory';
import {useFormContext} from 'react-hook-form';
import {CustomText} from '../../shared';

import MemberMemoryWriteArrow from './MemberMemoryWriteArrow';

import MemoryDatePicker from './MemoryDatePicker';
import MemberMemoryTextarea from './MemberMemoryTextarea';
import {useEffect, useRef} from 'react';

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

  const offsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        Animated.timing(offsetY, {
          toValue: -150, // 조절이 필요한 offset 값
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(offsetY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        style={[styles.container, {transform: [{translateY: offsetY}]}]}>
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
          <MemoryDatePicker />
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
            추억 설명
          </CustomText>
          <MemberMemoryTextarea currentMemoryIndex={memoryIndex} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
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
