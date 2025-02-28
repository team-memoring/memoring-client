import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  findNodeHandle,
  UIManager,
  Pressable,
} from 'react-native';

import {Portal} from '@gorhom/portal';
import {CustomText} from '.';

import ArrowDown from '../../assets/icons/arrow_down.svg';
import ArrowUp from '../../assets/icons/arrow_up.svg';

interface DropDownPickerProps {
  items: Array<{label: string; value: string}>;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const DropDownPicker: React.FC<DropDownPickerProps> = ({
  items,
  selectedValue,
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const triggerRef = useRef<View>(null);

  const measureTrigger = () => {
    const handle = triggerRef.current && findNodeHandle(triggerRef.current);
    if (handle) {
      UIManager.measure(handle, (x0, y0, width, height, x, y) => {
        setDropdownLayout({x, y, width, height});
      });
    }
  };

  const handleOpen = () => {
    measureTrigger();
    setIsOpen(true);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          ref={triggerRef}
          style={styles.selectedItem}
          onPress={handleOpen}>
          <CustomText weight="ExtraBold" style={styles.itemText}>
            {items.find(item => item.value === selectedValue)?.label || '선택'}
          </CustomText>
          {isOpen ? (
            <ArrowUp width={12} height={7} style={{marginLeft: 4}} />
          ) : (
            <ArrowDown width={12} height={7} style={{marginLeft: 4}} />
          )}
        </TouchableOpacity>
      </View>

      <Portal>
        <Modal
          visible={isOpen}
          transparent
          animationType="none"
          statusBarTranslucent
          onRequestClose={() => setIsOpen(false)}>
          <Pressable
            style={styles.modalContainer}
            onPress={event => {
              // 드롭다운 영역 외부 클릭 시에만 닫기
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}>
            <View
              style={[
                styles.dropdown,
                {
                  position: 'absolute',
                  top: dropdownLayout.y + dropdownLayout.height + 28,
                  left: dropdownLayout.x - 24,
                  width: 120,
                },
              ]}>
              <ScrollView
                nestedScrollEnabled={true}
                style={{maxHeight: 200}}
                scrollIndicatorInsets={{top: 12, bottom: 12}}
                showsVerticalScrollIndicator={true}>
                {items.map((item, index) => (
                  <View key={item.value}>
                    <TouchableOpacity
                      style={[
                        styles.dropdownItem,
                        selectedValue === item.value &&
                          styles.selectedItemStyle,
                      ]}
                      onPress={() => {
                        onValueChange(item.value);
                        setIsOpen(false);
                      }}>
                      <CustomText weight="ExtraBold" style={styles.itemText}>
                        {item.label}
                      </CustomText>
                    </TouchableOpacity>

                    {index < items.length - 1 && (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={styles.divider} />
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
            </View>
          </Pressable>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 20,
    maxHeight: 211,
    overflow: 'hidden',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  divider: {
    width: '85%',
    height: 1,
    backgroundColor: '#E9E9EC',
  },
  selectedItemStyle: {
    // backgroundColor: '#f2f2f2',
  },
  itemText: {
    fontSize: 18,
    color: '#CE5419',
  },
});

export default DropDownPicker;
