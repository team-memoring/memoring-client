import {StatusBar, StyleSheet} from 'react-native';
import {BackHeader} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';

const MemberQuizGenScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#f9ebe4"
        barStyle="dark-content"
      />
      <BackHeader onBackPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
  },
});

export default MemberQuizGenScreen;
