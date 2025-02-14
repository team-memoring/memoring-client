import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {CustomText, Header} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {getUser} from '../../utils/storage';
import MemberAnalysisCard from '../../components/Member/Home/MemberAnalysisCard';
import MemberQuizProgressCard from '../../components/Member/Home/MemberQuizProgressCard';
import {memberHomeMemoryDummy} from '../../lib/dummy';
import MemberQuizCard from '../../components/Member/Home/MemberQuizCard';

export const MEMBER_HOME_DURATION = 2000;

// TODO: match with the actual backend response
export type tempTrend = 'up' | 'down' | 'stable';

const MemberHomeScreen = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const loadUsername = async () => {
      const user = await getUser();

      if (user) {
        setUsername(user.nickname);
        console.log('user:', user);
      }
    };

    loadUsername();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#f9ebe4"
        barStyle="dark-content"
      />
      <Header />
      <View
        style={[
          {
            marginTop: 12,
            marginBottom: 24,
            flexDirection: 'column',
            paddingHorizontal: 16,
          },
        ]}>
        <CustomText weight="ExtraBold" style={{fontSize: 24, color: '#222225'}}>
          {`안녕하세요 ${username}님,`}
        </CustomText>
        <CustomText
          weight="ExtraBold"
          style={{fontSize: 24, marginTop: 8, color: '#222225'}}>
          오늘의 소식을 알려드릴게요
        </CustomText>
      </View>
      <View style={[styles.itemContainer]}>
        <MemberQuizProgressCard percentage={60} />
      </View>
      <View style={styles.itemContainer}>
        <MemberAnalysisCard trend="up" month={2} rate={78} rateDiff={8} />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          {memberHomeMemoryDummy.map((memory, index) => (
            <MemberQuizCard
              key={index}
              title={memory.title}
              createdAt={memory.createdAt}
              totalQuizCount={memory.totalQuizCount}
              solvedQuizCount={memory.solvedQuizCount}
              creator={memory.creator}
              status={memory.status}
              onPress={() => true}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
  },
  itemContainer: {
    paddingHorizontal: 16,
    width: '100%',
    paddingBottom: 12,
  },
  cardContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 12,
  },
});

export default MemberHomeScreen;
