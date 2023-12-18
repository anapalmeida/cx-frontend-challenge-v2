import apiResultsReducer from '@/storage/slices/apiResultsSlice';
import { configureStore } from '@reduxjs/toolkit';
import priceFilterReducer from '@/storage/slices/priceFilterSlice';
import sortByReducer from '@/storage/slices/sortBySlice';

const store = configureStore({
  reducer: {
    apiResults: apiResultsReducer,
    priceFilter: priceFilterReducer,
    sortBy: sortByReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
