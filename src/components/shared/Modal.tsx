import React, {ReactNode} from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  Pressable,
  View,
  ModalProps as RNModalProps,
  ViewStyle,
  StyleProp,
  DimensionValue,
} from 'react-native';
import {Portal} from '@gorhom/portal';

interface ModalProps
  extends Omit<RNModalProps, 'transparent' | 'statusBarTranslucent'> {
  children: ReactNode;
  position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  width?: DimensionValue;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  position,
  width,
  containerStyle,
  contentStyle,
  onClose,
  ...modalProps
}) => {
  // 스타일 객체를 미리 생성하여 타입 체크
  const baseContentStyle: ViewStyle = {
    position: 'absolute',
    width: width,
  };

  if (position) {
    Object.assign(baseContentStyle, position);
  }

  return (
    <Portal>
      <RNModal
        transparent
        statusBarTranslucent
        animationType="none"
        {...modalProps}
        onRequestClose={onClose}>
        <Pressable
          style={[styles.modalContainer, containerStyle]}
          onPress={event => {
            if (event.target === event.currentTarget) {
              onClose?.();
            }
          }}>
          <View style={[styles.modalContent, baseContentStyle, contentStyle]}>
            {children}
          </View>
        </Pressable>
      </RNModal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Modal;
