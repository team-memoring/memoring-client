import {useEffect, useRef, useState} from 'react';
import {Character} from '../../shared';
import {CharacterType} from '../../shared/Character';
import {Animated, Easing, StyleSheet, View} from 'react-native';

import Thinking from '../../../assets/icons/thinking.svg';

interface MemberLoadingCharacterProps {
  isLoading: boolean;
}

const MemberLoadingCharacter = ({isLoading}: MemberLoadingCharacterProps) => {
  const [charType, setCharType] = useState<CharacterType>('happy');

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      setCharType('close');

      // 회전 애니메이션 실행
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000, // 1초에 한 바퀴
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      setCharType('happy');
      rotateAnim.setValue(0); // 애니메이션 초기화
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <View style={styles.bubbleContainer}>
          <View
            style={{
              paddingHorizontal: 15,
              paddingTop: 15,
              paddingBottom: 6,
            }}>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              }}>
              <Thinking />
            </Animated.View>
          </View>
          <View
            style={{
              width: '100%',
              marginLeft: 8,
            }}>
            <View style={styles.lgCircle} />
          </View>
          <View
            style={{
              width: '100%',
              marginLeft: 37,
            }}>
            <View style={styles.smCircle} />
          </View>
        </View>
      )}
      <Character type={charType} />
    </>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    position: 'absolute',
    left: '46%',
    transform: [{translateX: -52}],
    width: 104,
    bottom: 369,
  },
  smCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#fff',
  },
  lgCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#fff',
  },
});

export default MemberLoadingCharacter;
