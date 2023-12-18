import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SortByState {
  sortBy: string;
}

const initialState: SortByState = {
  sortBy: 'relevance',
};

const sortBySlice = createSlice({
  name: 'sortBy',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortBySlice.actions;
export default sortBySlice.reducer;
