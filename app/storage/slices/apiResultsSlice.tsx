import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IFilters } from '@/interfaces/Filters';
import { IProduct } from '@/interfaces/Products';
import ISort from '@/interfaces/SortBy';

interface ApiResultsState {
  available_filters: IFilters[];
  available_sorts: ISort[];
  results: IProduct[];
}

const initialState: ApiResultsState = {
  available_filters: [],
  available_sorts: [],
  results: [],
};

const apiResultsSlice = createSlice({
  name: 'apiResults',
  initialState,
  reducers: {
    setResults: (_, action: PayloadAction<ApiResultsState>) => {
      return action.payload;
    },
    clearResults: () => {
      return initialState;
    },
  },
});

export const { setResults, clearResults } = apiResultsSlice.actions;
export default apiResultsSlice.reducer;
