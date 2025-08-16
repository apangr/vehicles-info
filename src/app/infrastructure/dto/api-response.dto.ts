export interface ResultListDto<T> {
  Count: number;
  Message: string;
  Results: T[];
  SearchCriteria: string | null;
}
