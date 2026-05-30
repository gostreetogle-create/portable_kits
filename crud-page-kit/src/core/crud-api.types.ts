export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CrudQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  filters?: Record<string, string>;
}

export interface CrudStoreApi<T> {
  list(basePath: string, query: CrudQuery): Promise<PaginatedResponse<T>>;
  create(basePath: string, body: Record<string, unknown>): Promise<T>;
  update(basePath: string, id: string, body: Record<string, unknown>): Promise<T>;
  delete(basePath: string, id: string): Promise<T | void>;
}

export interface CrudStoreOptions {
  basePath: string;
  defaultLimit?: number;
  defaultSortField?: string;
  defaultSortOrder?: -1 | 1;
  searchDebounceMs?: number;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
}
