export type UiPrimengComponentStatus = 'ready' | 'planned';

export interface UiPrimengComponentEntry {
  id: string;
  title: string;
  className: string;
  selector: string;
  status: UiPrimengComponentStatus;
  description: string;
}

/** Каталог kp-* компонентов ui-primeng-kit для demo-hub. */
export const UI_PRIMENG_COMPONENTS: UiPrimengComponentEntry[] = [
  {
    id: 'button',
    title: 'Кнопка',
    className: 'KpButtonComponent',
    selector: 'up-kp-button',
    status: 'ready',
    description: 'Основная/вторичная/опасная, плоская/premium, иконка, загрузка',
  },
  {
    id: 'input',
    title: 'Поле ввода',
    className: 'KpInputComponent',
    selector: 'up-kp-input',
    status: 'ready',
    description: 'Надпись, ошибка валидации, автофокус, отключение',
  },
  {
    id: 'dialog',
    title: 'Диалог',
    className: 'KpDialogComponent',
    selector: 'up-kp-dialog',
    status: 'ready',
    description: 'Модальное окно, слот подвала, автофокус на первом поле',
  },
  {
    id: 'select',
    title: 'Выпадающий список',
    className: 'KpSelectComponent',
    selector: 'up-kp-select',
    status: 'ready',
    description: 'Одиночный выбор, интеграция с options-resolver',
  },
  {
    id: 'table',
    title: 'Таблица',
    className: 'KpTableComponent',
    selector: 'up-kp-table',
    status: 'ready',
    description: 'Таблица с настройкой колонок, пагинацией, сортировкой, поиском',
  },
  {
    id: 'paginator',
    title: 'Пагинатор',
    className: 'KpPaginatorComponent',
    selector: 'up-kp-paginator',
    status: 'ready',
    description: 'Размер страницы, всего записей',
  },
  {
    id: 'checkbox',
    title: 'Чекбокс',
    className: 'KpCheckboxComponent',
    selector: 'up-kp-checkbox',
    status: 'ready',
    description: 'Булево поле с надписью',
  },
  {
    id: 'textarea',
    title: 'Многострочное поле',
    className: 'KpTextareaComponent',
    selector: 'up-kp-textarea',
    status: 'ready',
    description: 'Автоматический размер, валидация',
  },
  {
    id: 'datepicker',
    title: 'Выбор даты',
    className: 'KpDatepickerComponent',
    selector: 'up-kp-datepicker',
    status: 'ready',
    description: 'Выбор даты, календарь, минимальная/максимальная дата',
  },
  {
    id: 'autocomplete',
    title: 'Автодополнение',
    className: 'KpAutocompleteComponent',
    selector: 'up-kp-autocomplete',
    status: 'planned',
    description: 'Поиск с асинхронными опциями',
  },
  {
    id: 'multiselect',
    title: 'Мультиселект',
    className: 'KpMultiselectComponent',
    selector: 'up-kp-multiselect',
    status: 'ready',
    description: 'Выпадающий список с множественным выбором',
  },
  {
    id: 'toggle',
    title: 'Переключатель',
    className: 'KpToggleComponent',
    selector: 'up-kp-toggle',
    status: 'planned',
    description: 'Булев переключатель',
  },
  {
    id: 'chip',
    title: 'Чип',
    className: 'KpChipComponent',
    selector: 'up-kp-chip',
    status: 'planned',
    description: 'Удаляемый чип-тег',
  },
  {
    id: 'tag',
    title: 'Тег',
    className: 'KpTagComponent',
    selector: 'up-kp-tag',
    status: 'ready',
    description: 'Тег статуса с уровнем важности',
  },
  {
    id: 'card',
    title: 'Карточка',
    className: 'KpCardComponent',
    selector: 'up-kp-card',
    status: 'ready',
    description: 'Структурная карточка с header/body/footer',
  },
  {
    id: 'search',
    title: 'Поиск',
    className: 'KpSearchComponent',
    selector: 'up-kp-search',
    status: 'ready',
    description: 'Поле поиска с иконкой и debounce',
  },
  {
    id: 'input-number',
    title: 'Числовое поле',
    className: 'KpInputNumberComponent',
    selector: 'up-kp-input-number',
    status: 'ready',
    description: 'Числовой ввод с шагом и диапазоном',
  },
  {
    id: 'badge',
    title: 'Бейдж',
    className: 'KpBadgeComponent',
    selector: 'up-kp-badge',
    status: 'planned',
    description: 'Счётчик прямо на месте',
  },
  {
    id: 'tabs',
    title: 'Группа вкладок',
    className: 'KpTabGroupComponent',
    selector: 'up-kp-tab-group',
    status: 'ready',
    description: 'Группа вкладок на основе kp-button',
  },
  {
    id: 'menu',
    title: 'Меню',
    className: 'KpMenuComponent',
    selector: 'up-kp-menu',
    status: 'planned',
    description: 'Контекстное и выпадающее меню',
  },
  {
    id: 'breadcrumbs',
    title: 'Хлебные крошки',
    className: 'KpBreadcrumbsComponent',
    selector: 'up-kp-breadcrumbs',
    status: 'ready',
    description: 'Хлебные крошки, авто-построение из URL, кастомные метки',
  },
  {
    id: 'toast',
    title: 'Toast',
    className: 'KpToastComponent',
    selector: 'up-kp-toast',
    status: 'ready',
    description: 'Всплывающие уведомления, настраиваемая позиция',
  },
  {
    id: 'confirm',
    title: 'Подтверждение',
    className: 'KpConfirmDialogComponent',
    selector: 'up-kp-confirm-dialog',
    status: 'ready',
    description: 'Диалог подтверждения/отмены с иконкой предупреждения',
  },
  {
    id: 'file-upload',
    title: 'Загрузка файла',
    className: 'KpFileUploadComponent',
    selector: 'up-kp-file-upload',
    status: 'planned',
    description: 'Загрузка файла перетаскиванием',
  },
  {
    id: 'image',
    title: 'Изображение',
    className: 'KpImageComponent',
    selector: 'up-kp-image',
    status: 'planned',
    description: 'Предпросмотр с масштабированием',
  },
  {
    id: 'password',
    title: 'Пароль',
    className: 'KpPasswordComponent',
    selector: 'up-kp-password',
    status: 'ready',
    description: 'Поле пароля с переключением видимости, индикатор сложности',
  },
  {
    id: 'form-field',
    title: 'Обёртка поля',
    className: 'KpFormFieldComponent',
    selector: 'up-kp-form-field',
    status: 'ready',
    description: 'Label + ng-content + error/hint для кастомных полей',
  },
  {
    id: 'photo-uploader',
    title: 'Загрузчик фото',
    className: 'KpPhotoUploaderComponent',
    selector: 'up-kp-photo-uploader',
    status: 'ready',
    description: 'Drag&drop, галерея, редактор рамки, zoom, URL-добавление',
  },
];

export function getUiPrimengComponentById(id: string): UiPrimengComponentEntry | undefined {
  return UI_PRIMENG_COMPONENTS.find((c) => c.id === id);
}

export function uiPrimengComponentDemoRoute(id: string): string {
  return `/modules/ui-primeng-kit/${id}`;
}
