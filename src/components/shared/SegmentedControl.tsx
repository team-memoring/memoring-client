import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {CustomText} from '.';

interface SegmentedControlProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

const SegmentedControl = ({
  options,
  selected,
  onSelect,
}: SegmentedControlProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.segment}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selected === option && styles.selectedOption,
            ]}
            onPress={() => onSelect(option)}>
            <CustomText
              weight="ExtraBold"
              style={[styles.text, selected === option && styles.selectedText]}>
              {option}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F3',
    borderRadius: 25,
    padding: 4,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  selectedOption: {
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#C5C5C7',
  },
  selectedText: {
    color: '#444447',
  },
});

export default SegmentedControl;
