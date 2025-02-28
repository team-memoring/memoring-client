export type graphOptionType = 'week' | 'month' | 'year';

export const formatGraphData = (data: number[], type: graphOptionType) => {
  return data.map((value, index) => {
    if (type === 'week') return {label: `${index + 1}주`, value};
    if (type === 'month') return {label: `${index + 1}월`, value};
    if (type === 'year') {
      const currentYear = new Date().getFullYear();
      const minYear = currentYear - data.length + 1;
      return {label: `'${String(minYear + index).slice(2)}`, value};
    }
    return {label: '', value};
  });
};

const getWeekOfMonth = (date = new Date()) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0(일) ~ 6(토)

  const todayDate = date.getDate(); // 오늘의 날짜 (1~31)

  // 이번 달의 첫째 주에서 시작한 요일을 반영하여 주차 계산
  return Math.ceil((todayDate + firstDayWeekday) / 7);
};

export const getInitialDateIndex = (
  data: number[],
  option: graphOptionType,
) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentWeek = getWeekOfMonth(currentDate);

  if (option === 'week') {
    return currentWeek - 1;
  }
  if (option === 'month') {
    return currentMonth;
  }
  if (option === 'year') {
    return data.length - 1;
  }
  return 0;
};
