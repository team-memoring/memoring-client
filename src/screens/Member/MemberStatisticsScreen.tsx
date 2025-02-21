import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BackHeader, CustomText} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import CharacterStarCrop from '../../assets/icons/character_star_crop.svg';
import SegmentedControl from '../../components/shared/SegmentedControl';
import {useLayoutEffect, useState} from 'react';

import ArrowLeft from '../../assets/icons/arrow_left.svg';
import ArrowRight from '../../assets/icons/arrow_right.svg';
import MemberStatisticsGraph, {
  MAX_VIEW_COUNT,
} from '../../components/Member/Statistics/MemberStatisticsGraph';
import {
  formatGraphData,
  getInitialDateIndex,
  graphOptionType,
} from '../../utils/statistics';
import {getStatisticsStatistics} from '../../api/memoring/statistics';
import {useQuery} from '@tanstack/react-query';

type GraphOptionMap = {
  [key in graphOptionType]: string;
};

const graphOptionMap: GraphOptionMap = {
  week: '주간',
  month: '월간',
  year: '연간',
};

const MemberStatisticsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const adviseText = `독서, 낱말 퍼즐 풀기, 새로운 언어 배우기 등은 기억력 유지에 효과적이에요! 가족 및 친구와의 소통 또한 도움이 되니 함께 시도해보세요~`;

  // 그래프 옵션
  const [selectedGraphOption, setSelectedGraphOption] =
    useState<graphOptionType>('month');

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

  const yearQuery = useQuery({
    queryKey: ['getStatisticsStatisticsYear'],
    queryFn: async () =>
      getStatisticsStatistics({
        option: 'year',
        year: null,
        month: null,
      }),
  });

  const monthQuery = useQuery({
    queryKey: ['getStatisticsStatisticsMonth', currentYear],
    queryFn: async () =>
      getStatisticsStatistics({
        option: 'month',
        year: currentYear,
        month: null,
      }),
  });

  const weekQuery = useQuery({
    queryKey: ['getStatisticsStatisticsWeek', currentYear, currentMonth],
    queryFn: async () =>
      getStatisticsStatistics({
        option: 'week',
        year: currentYear,
        month: currentMonth,
      }),
  });

  const getGraphData = (option: graphOptionType) => {
    switch (option) {
      case 'week':
        return weekQuery.data?.data.data || [];
      case 'month':
        return monthQuery.data?.data.data || [];
      case 'year':
        return yearQuery.data?.data.data || [];
    }
  };

  const graphData = formatGraphData(
    getGraphData(selectedGraphOption),
    selectedGraphOption,
  );

  const [graphSelectedIndex, setGraphSelectedIndex] = useState(0);
  const [graphStartIndex, setGraphStartIndex] = useState(0);
  const [graphEndIndex, setGraphEndIndex] = useState(MAX_VIEW_COUNT - 1);

  useLayoutEffect(() => {
    const initailGraphIndex = getInitialDateIndex(
      getGraphData(selectedGraphOption),
      selectedGraphOption,
    );

    setGraphStartIndex(0);
    setGraphEndIndex(MAX_VIEW_COUNT - 1);

    setGraphSelectedIndex(initailGraphIndex);
  }, [selectedGraphOption]);

  // return ['주간', '월간', '연간']
  const getGraphOptionTexts = () => {
    return Object.values(graphOptionMap);
  };

  const getGraphTitle = () => {
    switch (selectedGraphOption) {
      case 'week':
        return `${currentYear}년도 ${currentMonth}월 ${
          graphSelectedIndex + 1
        }주`;
      case 'month':
        return `${currentYear}년도 ${graphSelectedIndex + 1}월`;
      case 'year':
        return '2025년도';
    }
  };

  const handleSelect = (option: string) => {
    switch (option) {
      case graphOptionMap['week']:
        setSelectedGraphOption('week');
        break;
      case graphOptionMap['month']:
        setSelectedGraphOption('month');
        break;
      case graphOptionMap['year']:
        setSelectedGraphOption('year');
        break;
    }
  };

  const isLeftDisabled = graphSelectedIndex === 0;
  const isRightDisabled = graphSelectedIndex === graphData.length - 1;

  const handleLeftPress = () => {
    if (isLeftDisabled) return;

    setGraphSelectedIndex(prev => prev - 1);

    if (graphSelectedIndex === graphStartIndex) {
      setGraphStartIndex(prev => prev - 1);
      setGraphEndIndex(prev => prev - 1);
    }
  };

  const handleRightPress = () => {
    if (isRightDisabled) return;

    setGraphSelectedIndex(prev => prev + 1);

    if (graphSelectedIndex === graphEndIndex) {
      setGraphStartIndex(prev => prev + 1);
      setGraphEndIndex(prev => prev + 1);
    }
  };

  if (weekQuery.isLoading || monthQuery.isLoading || yearQuery.isLoading)
    return null;

  // tap 변경 시 index overflow 예외처리
  if (graphData.length - 1 < graphSelectedIndex) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <BackHeader
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            paddingTop: 12,
            paddingBottom: 20,
          }}>
          <CustomText
            weight="ExtraBold"
            style={{
              fontSize: 24,
              color: '#222225',
              lineHeight: 32,
            }}>
            선옥 님의 퀴즈 결과를
          </CustomText>
          <CustomText
            weight="ExtraBold"
            style={{
              fontSize: 24,
              color: '#222225',
              lineHeight: 32,
            }}>
            확인해보세요.
          </CustomText>
        </View>
        <View style={styles.adviseContainer}>
          <View
            style={{
              flexDirection: 'column',
              gap: 4,
              marginBottom: 12,
            }}>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 20,
                color: '#CE5419',
                lineHeight: 32,
              }}>
              기억력 보존에 좋은 꿀팁!
            </CustomText>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {adviseText.split(' ').map((word, index) => (
                <CustomText
                  key={`${word}-${index}`}
                  weight="Bold"
                  style={{
                    fontSize: 17,
                    color: '#222225',
                    lineHeight: 26,
                  }}>
                  {word}{' '}
                </CustomText>
              ))}
            </View>
          </View>
          <CharacterStarCrop />
        </View>
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 20,
            color: '#222225',
            lineHeight: 32,
            marginTop: 24,
            marginBottom: 12,
          }}>
          기억력 추이
        </CustomText>
        <View style={styles.graphContainer}>
          <SegmentedControl
            options={getGraphOptionTexts()}
            selected={graphOptionMap[selectedGraphOption]}
            onSelect={handleSelect}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
              alignItems: 'flex-start',
              paddingVertical: 4,
            }}>
            <View>
              <CustomText
                weight="ExtraBold"
                style={{
                  fontSize: 20,
                  color: '#222225',
                  lineHeight: 25,
                }}>
                {getGraphTitle()}
              </CustomText>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <CustomText
                  weight="ExtraBold"
                  style={{
                    fontSize: 20,
                    color: '#222225',
                    lineHeight: 25,
                  }}>
                  평균 정답률
                </CustomText>
                <CustomText
                  weight="ExtraBold"
                  style={{
                    fontSize: 20,
                    color: '#CE5419',
                    lineHeight: 25,
                  }}>
                  {graphData[graphSelectedIndex].value}%
                </CustomText>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <TouchableOpacity
                disabled={isLeftDisabled}
                onPress={handleLeftPress}
                style={[
                  styles.arrowButton,
                  {opacity: isLeftDisabled ? 0.3 : 1},
                ]}>
                <ArrowLeft width={11} height={11} color={'#444447'} />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isRightDisabled}
                onPress={handleRightPress}
                style={[
                  styles.arrowButton,
                  {opacity: isRightDisabled ? 0.3 : 1},
                ]}>
                <ArrowRight width={11} height={11} color={'#444447'} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <MemberStatisticsGraph
              data={graphData}
              selected={graphSelectedIndex}
              startIndex={graphStartIndex}
              endIndex={graphEndIndex}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
  },
  adviseContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  graphContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
  },
  arrowButton: {
    padding: 10.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F3',
    borderRadius: 40,
    alignSelf: 'flex-start',
  },
});

export default MemberStatisticsScreen;
