import apiClient from './apiClient';

export const getEvents = async () => {
  const response = await apiClient.get(`/api/v1/events`);
  return response;
};
