import type {
  BuildPlaceholderGroupsOptions,
  PlaceholderCategory,
  PlaceholderGroup,
  PlaceholderToken,
} from './types';

export const PLACEHOLDER_CATEGORIES: { key: PlaceholderCategory; label: string; icon: string }[] = [
  { key: 'org', label: 'Организация (исполнитель)', icon: '🏢' },
  { key: 'client', label: 'Клиент', icon: '👤' },
  { key: 'doc', label: 'Документ', icon: '📄' },
  { key: 'item', label: 'Позиция (строка таблицы)', icon: '📋' },
];

export const DEFAULT_PLACEHOLDER_REGISTRY: PlaceholderToken[] = [
  { token: 'org.name', label: 'Название организации', category: 'org', description: 'Полное наименование исполнителя' },
  { token: 'org.shortName', label: 'Краткое название', category: 'org', description: 'Краткое наименование' },
  { token: 'org.inn', label: 'ИНН организации', category: 'org', description: 'ИНН исполнителя' },
  { token: 'org.kpp', label: 'КПП организации', category: 'org', description: 'КПП исполнителя' },
  { token: 'org.legalAddress', label: 'Юридический адрес', category: 'org', description: 'Юридический адрес' },
  { token: 'org.phone', label: 'Телефон организации', category: 'org', description: 'Контактный телефон' },
  { token: 'org.email', label: 'Email организации', category: 'org', description: 'Контактный email' },
  { token: 'client.name', label: 'Название клиента', category: 'client', description: 'Полное наименование клиента' },
  { token: 'client.inn', label: 'ИНН клиента', category: 'client', description: 'ИНН клиента' },
  { token: 'client.phone', label: 'Телефон клиента', category: 'client', description: 'Телефон клиента' },
  { token: 'doc.number', label: 'Номер документа', category: 'doc', description: 'Номер КП / заказа' },
  { token: 'doc.date', label: 'Дата документа', category: 'doc', description: 'Дата создания' },
  { token: 'doc.total', label: 'Сумма документа', category: 'doc', description: 'Итоговая сумма' },
  { token: 'item.sku', label: 'Артикул позиции', category: 'item', description: 'SKU в строке' },
  { token: 'item.name', label: 'Наименование позиции', category: 'item', description: 'Наименование в строке' },
  { token: 'item.qty', label: 'Количество', category: 'item', description: 'Количество единиц' },
  { token: 'item.price', label: 'Цена за единицу', category: 'item', description: 'Цена за единицу' },
  { token: 'item.sum', label: 'Сумма строки', category: 'item', description: 'Итого по строке' },
];

export function groupPlaceholdersByCategory(
  registry: PlaceholderToken[],
): Record<PlaceholderCategory, PlaceholderToken[]> {
  return {
    org: registry.filter((t) => t.category === 'org'),
    client: registry.filter((t) => t.category === 'client'),
    doc: registry.filter((t) => t.category === 'doc'),
    item: registry.filter((t) => t.category === 'item'),
  };
}

export function buildPlaceholderGroups(options: BuildPlaceholderGroupsOptions = {}): PlaceholderGroup[] {
  const registry = options.registry ?? DEFAULT_PLACEHOLDER_REGISTRY;
  const byCategory = groupPlaceholdersByCategory(registry);
  const query = options.query?.trim().toLowerCase() ?? '';
  const allowed = options.allowedCategories ?? [];
  const limit = options.limitPerCategory;

  return PLACEHOLDER_CATEGORIES.filter((cat) => allowed.length === 0 || allowed.includes(cat.key)).map(
    (cat) => {
      let tokens = byCategory[cat.key] ?? [];

      if (query) {
        tokens = tokens.filter(
          (token) =>
            token.label.toLowerCase().includes(query) ||
            token.token.toLowerCase().includes(query) ||
            token.description.toLowerCase().includes(query),
        );
      }

      if (typeof limit === 'number') {
        tokens = tokens.slice(0, limit);
      }

      return {
        category: cat.key,
        label: cat.label,
        icon: cat.icon,
        tokens,
      };
    },
  );
}
