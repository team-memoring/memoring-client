import {graphOptionType} from '../../utils/statistics';

export interface GetStatisticsStatisticsResponse {
  data: number[];
}

export interface GetStatisticsStatisticsOptions {
  option: graphOptionType;
  year: number | null;
  month: number | null;
}
