/** Чтение вложенного поля по dot-path: 'address.city' */
export function getFieldValue(
  obj: Record<string, unknown> | null | undefined,
  field: string,
): unknown {
  if (!obj || !field) return undefined;
  const parts = field.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export const FIELD_PATH_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_.]*$/;

export function isValidFieldPath(field: string): boolean {
  return FIELD_PATH_PATTERN.test(field);
}
