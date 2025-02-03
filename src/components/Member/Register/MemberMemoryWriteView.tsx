import {Animated, Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {CustomText} from '../../shared';
import Caution from '../../../assets/icons/caution.svg';
import MemberMemoryBox from './MemberMemoryBox';
import {useFormContext} from 'react-hook-form';
import {IMemoryRegister} from '../../../lib/model/i-memory';
import {useEffect, useRef} from 'react';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
interface MemberMemoryWriteViewProps {
  onMemoryIndexChange: (memoryIndex: number) => void;
}

const MemberMemoryWriteView = ({
  onMemoryIndexChange,
}: MemberMemoryWriteViewProps) => {
  const {watch} = useFormContext<IMemoryRegister>();
  const watchEvents = watch('events');

  const flatListRef = useRef<FlatList>(null);

  const handleScrollToIndex = (index: number) => {
    if (index < 0 || index >= watchEvents.length) {
      return;
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index, animated: true});
    }
  };

  // box를 delete하거나 add 하면 해당 box로 이동
  useEffect(() => {
    handleScrollToIndex(watchEvents.length - 1);
  }, [watchEvents]);

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
      <Animated.FlatList
        ref={flatListRef}
        data={watchEvents}
        style={{marginTop: 20}}
        horizontal
        pagingEnabled
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // 버튼을 통해서만 스크롤 가능
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        renderItem={({index}) => (
          <View style={{width: SCREEN_WIDTH, paddingHorizontal: 16}}>
            <MemberMemoryBox
              memoryIndex={index}
              onMemoryIndexChange={newIndex => {
                onMemoryIndexChange(newIndex);
                handleScrollToIndex(newIndex);
              }}
            />
          </View>
        )}
      />
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
