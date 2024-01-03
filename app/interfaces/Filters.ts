export interface IFilter {
  id: string;
  name: string;
  type: string;
  values: IFilterValues[];
}

export interface IFilterValues {
  id: string;
  name: string;
  results: number;
}

export interface IFilters {
  filters: IFilter[];
}
