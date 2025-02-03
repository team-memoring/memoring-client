import {StyleSheet, View} from 'react-native';

interface MemberMemoryBoxProps {
  onMemoryIndexChange: (memoryIndex: number) => void;
}

const MemberMemoryBox = ({onMemoryIndexChange}: MemberMemoryBoxProps) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});

export default MemberMemoryBox;
