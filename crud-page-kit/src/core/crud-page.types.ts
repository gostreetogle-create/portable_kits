export interface CrudPageColumn {
  field: string;
  header: string;
  width?: string;
}

export interface CrudAction<T> {
  id: string;
  label: string;
  handler: (row: T) => void;
  visible?: (row: T) => boolean;
}

export interface CrudPermissions {
  view: string;
  create?: string;
  edit?: string;
  delete?: string;
}

export interface CrudPageConfig {
  title: string;
  description?: string;
  idField?: string;
  createLabel?: string;
  emptyMessage?: string;
}

export interface CrudPageKitConfig {
  /** Optional default permissions checker wiring. */
  checkPermission?: (permission: string) => boolean;
}
