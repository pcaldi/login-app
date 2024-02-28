export type PaginationDTO = {
  page: string;
  lastPage: string | number;
  next_page_url: string;
  prev_page_url: boolean;
  total?: string;
}
