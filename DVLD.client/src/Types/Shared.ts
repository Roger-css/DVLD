export type FilterOptions = {
  page: number;
  pageSize: number;
} & Partial<{
  gender: number;
  orderBy: number | "asc" | "desc";
  searchTermKey: string;
  searchTermValue: string;
}>;
export enum OrderBy {
  asc = "asc",
  desc = "desc",
}
export type PageOptions = {
  totalCount: number;
  hasPrev: boolean;
  hasNext: boolean;
};
