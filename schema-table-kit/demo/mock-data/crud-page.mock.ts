import type { CrudStoreApi, PaginatedResponse, CrudQuery } from '@crud-page-kit/core';

export interface DemoCrudRow {
  _id: string;
  name: string;
  category: string;
  status: string;
}

let DEMO_ROWS: DemoCrudRow[] = [
  { _id: '1', name: 'Болт М8', category: 'Метизы', status: 'active' },
  { _id: '2', name: 'Гайка М8', category: 'Метизы', status: 'active' },
  { _id: '3', name: 'Пластина 100', category: 'Заготовки', status: 'draft' },
];

function filterRows(query: CrudQuery): DemoCrudRow[] {
  let rows = [...DEMO_ROWS];
  const search = query.search?.toLowerCase();
  if (search) {
    rows = rows.filter(
      (r) => r.name.toLowerCase().includes(search) || r.category.toLowerCase().includes(search),
    );
  }
  return rows;
}

export const DEMO_CRUD_API: CrudStoreApi<DemoCrudRow> = {
  async list(_basePath, query) {
    const all = filterRows(query);
    const page = query.page ?? 1;
    const limit = query.limit ?? 15;
    const start = (page - 1) * limit;
    const data = all.slice(start, start + limit);
    const res: PaginatedResponse<DemoCrudRow> = {
      data,
      total: all.length,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(all.length / limit)),
    };
    return res;
  },
  async create(_basePath, body) {
    const row: DemoCrudRow = {
      _id: String(Date.now()),
      name: String(body['name'] ?? 'Новая запись'),
      category: String(body['category'] ?? '—'),
      status: String(body['status'] ?? 'draft'),
    };
    DEMO_ROWS = [row, ...DEMO_ROWS];
    return row;
  },
  async update(_basePath, id, body) {
    const idx = DEMO_ROWS.findIndex((r) => r._id === id);
    if (idx < 0) throw new Error('Not found');
    DEMO_ROWS[idx] = { ...DEMO_ROWS[idx], ...body } as DemoCrudRow;
    return DEMO_ROWS[idx];
  },
  async delete(_basePath, id) {
    DEMO_ROWS = DEMO_ROWS.filter((r) => r._id !== id);
  },
};
