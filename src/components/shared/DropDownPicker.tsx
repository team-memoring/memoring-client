import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import ArrowDown from '../../assets/icons/arrow_down.svg';
import ArrowUp from '../../assets/icons/arrow_up.svg';
import CustomText from './CustomText';

interface DropDownPickerProps {
  items: {label: string; value: string}[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const DropDownPicker: React.FC<DropDownPickerProps> = ({
  items,
  selectedValue,
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectedItem}
        onPress={() => setIsOpen(!isOpen)}>
        <CustomText weight="ExtraBold" style={styles.itemText}>
          {items.find(item => item.value === selectedValue)?.label || '선택'}
        </CustomText>
        {isOpen ? (
          <ArrowUp
            width={12}
            height={7}
            style={{
              marginLeft: 4,
            }}
          />
        ) : (
          <ArrowDown
            width={12}
            height={7}
            style={{
              marginLeft: 4,
            }}
          />
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={items}
            keyExtractor={item => item.value}
            scrollIndicatorInsets={{top: 12, bottom: 12}}
            renderItem={({item, index}) => (
              <>
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    selectedValue === item.value && styles.selectedItemStyle,
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
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.divider} />
                  </View>
                )}
              </>
            )}
          />
        </View>
      )}
    </View>
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
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: -24,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 120,
    maxHeight: 211,
    marginTop: 28,
    overflow: 'hidden',
    zIndex: 1000,
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
