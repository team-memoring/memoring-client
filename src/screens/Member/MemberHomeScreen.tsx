import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomText, Header} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {getUser} from '../../utils/storage';
import MemberAnalysisCard from '../../components/Member/Home/MemberAnalysisCard';
import MemberQuizProgressCard from '../../components/Member/Home/MemberQuizProgressCard';
import MemberQuizCard from '../../components/Member/Home/MemberQuizCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getMemoriesMembers} from '../../api/memoring/memories';

export const MEMBER_HOME_DURATION = 2000;

export type rateTrend = 'up' | 'down' | 'stable';

const MemberHomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const loadUsername = async () => {
      const user = await getUser();

      if (user) {
        setUsername(user.nickname);
      }
    };

    loadUsername();
  }, []);

  const {data: memoriesData, isLoading} = useQuery({
    queryKey: ['getMemoriesMembers'],
    queryFn: async () => getMemoriesMembers(),
  });

  const handleQuizPress = async (memoryId: number) => {
    navigation.navigate('MemberQuizDetail', {
      memoryId,
    });
  };

  if (isLoading) return null;

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
        <MemberQuizProgressCard />
      </View>
      <View style={styles.itemContainer}>
        <MemberAnalysisCard />
      </View>
      {memoriesData?.data.length !== 0 ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            {memoriesData?.data.map((memory, index) => (
              <MemberQuizCard
                key={index}
                id={memory.memoryId}
                title={memory.memoryTitle}
                createdAt={memory.memoryUploadTime}
                totalQuizCount={memory.totalQuizzes}
                solvedQuizCount={memory.completedQuizzes}
                // creator={memory.creator}
                onPress={handleQuizPress}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            paddingHorizontal: 16,
          }}>
          <View style={styles.emptyCard}>
            <CustomText
              weight="ExtraBold"
              style={{fontSize: 18, marginBottom: 16, color: '#77777A'}}>
              아직 등록된 추억이 없습니다.
            </CustomText>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('MemberRegister')}>
              <CustomText
                weight="ExtraBold"
                style={{fontSize: 14, color: '#555558'}}>
                추억 등록하기
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  emptyCard: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 48,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#F0F0F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 60,
  },
});

export default MemberHomeScreen;
