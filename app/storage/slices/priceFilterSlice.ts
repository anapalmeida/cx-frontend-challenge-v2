import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PriceFilterState {
  priceFilter: string;
}

const initialState: PriceFilterState = {
  priceFilter: '',
};

const priceFilterSlice = createSlice({
  name: 'priceFilter',
  initialState,
  reducers: {
    setPriceFilter: (state, action: PayloadAction<string>) => {
      state.priceFilter = action.payload;
    },
  },
});

export const { setPriceFilter } = priceFilterSlice.actions;
export default priceFilterSlice.reducer;
