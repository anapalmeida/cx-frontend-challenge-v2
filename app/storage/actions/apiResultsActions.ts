import { IApiResponseClient } from '@/interfaces/Api';

export const setResults = (data: IApiResponseClient) => ({
  type: 'SET_RESULTS',
  payload: data,
});

export const clearResults = () => ({
  type: 'CLEAR_RESULTS',
});
