export interface IFilter {
  id: string;
  name: string;
  type: string;
  values: [
    {
      id: string;
      name: string;
      results: number;
    }
  ];
}

export interface IFilters {
  filters: IFilter[];
}
