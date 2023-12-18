import { IFilters } from './Filters';
import { IProduct } from './Products';
import ISort from './SortBy';

export interface IApiResponseClient {
  available_filters: IFilters[];
  available_sorts: ISort[];
  results: IProduct[];
}

export interface IApiParams {
  textToSearch: string;
  sortBy: string;
  priceFilter: string;
}
