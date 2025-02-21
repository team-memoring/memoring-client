import {AxiosResponse} from 'axios';
import apiClient from './apiClient';
import {
  GetStatisticsResponse,
  GetStatisticsStatisticsOptions,
  GetStatisticsStatisticsResponse,
} from '../../lib/types/statistics';

export const getStatisticsStatistics = async (
  options: GetStatisticsStatisticsOptions,
): Promise<AxiosResponse<GetStatisticsStatisticsResponse>> => {
  return await apiClient.get(`/api/v1/statistics/statistics`, {
    params: {
      option: options.option,
      ...(options.year !== null && {year: options.year}),
      ...(options.month !== null && {month: options.month}),
    },
  });
};

export const getStatistics = async (): Promise<
  AxiosResponse<GetStatisticsResponse>
> => {
  return apiClient.get(`/api/v1/statistics`);
};
