export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function success<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}

export function paginated<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export function error(message: string): ApiResponse<null> {
  return { success: false, error: message };
}

export interface CrudHooks {
  beforeCreate?: (body: Record<string, unknown>) => Promise<void>;
  beforeUpdate?: (body: Record<string, unknown>) => Promise<void>;
}

export type CrudRequestHandler = (
  req: unknown,
  res: unknown,
  next: () => void,
) => void;

export interface CrudAuthHandlers {
  authenticate?: CrudRequestHandler;
  requirePermission?: (action: 'view' | 'create' | 'edit' | 'delete') => CrudRequestHandler;
}

export interface CreateCrudRouterOptions extends CrudAuthHandlers {
  searchFields?: string[];
  hooks?: CrudHooks;
  permPrefix?: string;
}

/** Minimal model surface used by createCrudRouter (Mongoose-compatible). */
export interface CrudModel<T> {
  find(filter: Record<string, unknown>): {
    sort(sort: Record<string, 1 | -1>): {
      skip(n: number): { limit(n: number): Promise<T[]> };
    };
  };
  countDocuments(filter: Record<string, unknown>): Promise<number>;
  findById(id: string): Promise<T | null>;
  create(body: Record<string, unknown>): Promise<T>;
  findByIdAndUpdate(
    id: string,
    body: Record<string, unknown>,
    options: { new: boolean; runValidators: boolean },
  ): Promise<T | null>;
  findByIdAndDelete(id: string): Promise<T | null>;
}
