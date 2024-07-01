export type FilterOptions = {
  page: number;
  pageSize: number;
} & Partial<{
  gender: number;
  orderBy: number;
  searchTermKey: string;
  searchTermValue: string;
}>;
export type PageOptions = {
  totalCount: number;
  hasPrev: boolean;
  hasNext: boolean;
};
