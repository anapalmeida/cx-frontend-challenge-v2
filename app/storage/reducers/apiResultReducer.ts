import { IApiResponseClient } from '@/interfaces/Api';
import { IFilters } from '@/interfaces/Filters';
import { IProduct } from '@/interfaces/Products';
import ISort from '@/interfaces/SortBy';

interface SetResultsAction {
  type: 'SET_RESULTS';
  payload: IApiResponseClient;
}

interface ClearResultsAction {
  type: 'CLEAR_RESULTS';
}

const initialState = {
  available_filters: [] as IFilters[],
  available_sorts: [] as ISort[],
  results: [] as IProduct[],
} as IApiResponseClient;

const apiResultsReducer = (
  state = initialState,
  action: SetResultsAction | ClearResultsAction
) => {
  switch (action.type) {
    case 'SET_RESULTS':
      return {
        ...state,
        available_filters: action.payload.available_filters,
        available_sorts: action.payload.available_sorts,
        results: action.payload.results,
      };
    case 'CLEAR_RESULTS':
      return initialState;
    default:
      return state;
  }
};

export default apiResultsReducer;
