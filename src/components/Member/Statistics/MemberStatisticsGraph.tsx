import {StyleSheet, View} from 'react-native';
import {CustomText} from '../../shared';

interface MemberStatisticsGraphProps {
  data: {
    label: string;
    value: number;
  }[];
  selected: number;
  startIndex: number;
  endIndex: number;
}

export const MAX_VIEW_COUNT = 9; // 최대 표시할 막대 개수
const MAX_DATA = 100;
const MAX_HEIGHT = 123;

const MemberStatisticsGraph = ({
  data,
  selected,
  startIndex,
  endIndex,
}: MemberStatisticsGraphProps) => {
  return (
    <View style={styles.graphContainer}>
      {data.length === 0 ? (
        <View
          style={{
            height: MAX_HEIGHT + 26,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText weight="Bold" style={{color: '#939396'}}>
            데이터가 없습니다.
          </CustomText>
        </View>
      ) : (
        data.map((item, index) => {
          if (index < startIndex || index > endIndex) return null;

          return (
            <View key={index} style={styles.barContainer}>
              <View
                style={{
                  height: MAX_HEIGHT,
                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    width: 30,
                    height:
                      item.value <= 10
                        ? (10 / MAX_DATA) * MAX_HEIGHT
                        : (item.value / MAX_DATA) * MAX_HEIGHT,
                    backgroundColor:
                      index === selected
                        ? '#CE5419'
                        : 'rgba(225, 90, 24, 0.16)',
                    borderRadius: 50,
                  }}
                />
              </View>
              <CustomText
                weight="Bold"
                style={{
                  height: 18,
                  color: index === selected ? '#CE5419' : '#939396',
                }}>
                {item.label}
              </CustomText>
            </View>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  graphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 7,
    marginTop: 16,
  },
  barContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
});

export default MemberStatisticsGraph;
