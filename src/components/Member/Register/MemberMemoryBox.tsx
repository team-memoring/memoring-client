import {
  Animated,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
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

import Plus from '../../../assets/icons/plus.svg';

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
  const {control, setValue, watch} = useFormContext<IMemoryRegister>();

  const watchEvents = watch('events');

  const offsetY = useRef(new Animated.Value(0)).current;

  const handleDeleteEvent = () => {
    if (memoryIndex < 3) return;

    setValue(
      'events',
      watchEvents.filter((_, index) => index !== memoryIndex),
    );
  };

  const handleAddEvent = () => {
    setValue('events', [
      ...watchEvents,
      {
        date: new Date(),
        description: '',
        images: [],
      },
    ]);
  };

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
              disabled={memoryIndex === watchEvents.length - 1}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
          }}>
          <MemoryImageUpload control={control} eventIndex={memoryIndex} />
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

        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            marginTop: 16,
          }}>
          <TouchableOpacity
            disabled={memoryIndex < 3}
            style={[
              styles.trashContainer,
              {opacity: memoryIndex < 3 ? 0.3 : 1},
            ]}
            onPress={handleDeleteEvent}>
            <Image
              source={require('../../../assets/icons/trash.png')}
              style={{
                width: 30,
                height: 28,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={watchEvents.length === 5}
            style={[
              styles.plusButton,
              {opacity: watchEvents.length === 5 ? 0.3 : 1},
            ]}
            onPress={handleAddEvent}>
            <Plus width={12} height={12} color="#222225" />
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 14,
                color: '#222225',
              }}>
              이벤트 추가
            </CustomText>
          </TouchableOpacity>
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
  trashContainer: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#D9D9DC',
    alignSelf: 'flex-start',
    borderRadius: 50,
  },
  plusButton: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    padding: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D9D9DC',
  },
});

export default MemberMemoryBox;
