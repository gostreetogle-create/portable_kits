export const DEFAULT_LABELS = {
  entityLabel: 'Таблица БД',
  entityPlaceholder: 'Выберите таблицу',
  fieldLabel: 'Поле',
  fieldPlaceholder: 'Выберите поле',
  headerLabel: 'Заголовок',
  typeLabel: 'Тип',
  widthLabel: 'Ширина',
  addColumn: 'Добавить колонку',
  clearColumns: 'Очистить',
  moveUp: 'Вверх',
  moveDown: 'Вниз',
  removeColumn: 'Удалить',
  emptySelectEntity: 'Выберите таблицу БД, чтобы добавить колонки',
  emptyNoColumns: 'Нет колонок',
  orphanBadge: 'Устарело',
  schemaDriftBanner: 'Схема обновилась — проверьте колонки',
  providerLoading: 'Загрузка схемы…',
  providerError: 'Не удалось загрузить схему',
  providerRetry: 'Повторить',
  columnsCount: (n: number) =>
    n === 1 ? '1 колонка' : n >= 2 && n <= 4 ? `${n} колонки` : `${n} колонок`,
};

export type SchemaBuilderLabels = typeof DEFAULT_LABELS;
