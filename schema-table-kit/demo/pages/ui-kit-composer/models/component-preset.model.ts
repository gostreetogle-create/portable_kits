export type ComposerComponentType = 'up-kp-button' | 'up-kp-input' | 'up-kp-select' | 'up-kp-checkbox' | 'up-kp-tag' | 'up-kp-search' | 'up-kp-textarea' | 'up-kp-multiselect' | 'up-kp-input-number' | 'up-kp-datepicker' | 'up-kp-password';


export interface ComponentPreset {
  id: string;
  name: string;
  description?: string;
  componentType: ComposerComponentType;
  props: Record<string, unknown>;
  tokenOverrides?: Record<string, string>;
  createdAt: string;
}

export interface ButtonPresetProps {
  label: string;
  severity: 'primary' | 'secondary' | 'danger';
  variant: 'premium' | 'flat';
  size: 'small' | 'large';
  disabled: boolean;
  icon: string;
  outlined: boolean;
  text: boolean;
}

export interface InputPresetProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  error: string;
  size: 'small' | 'large';
}

export interface SelectPresetProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  loading: boolean;
  error: string;
}

export interface CheckboxPresetProps {
  label: string;
  disabled: boolean;
}

export interface TagPresetProps {
  value: string;
  severity: 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast';
  rounded: boolean;
}

export interface CardPresetProps {
  header: string;
  body: string;
}

export interface SearchPresetProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  size: 'small' | 'large';
}

export interface TextareaPresetProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  error: string;
  rows: number;
  size: 'small' | 'large';
}

export interface MultiselectPresetProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  error: string;
}

export interface DatepickerPresetProps {
  label: string;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  error: string;
}

export interface PasswordPresetProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  toggleMask: boolean;
  feedback: boolean;
  error: string;
}

export interface InputNumberPresetProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  error: string;
  min: number;
  max: number;
  step: number;
}

export const COMPOSER_DRAFT_STORAGE_KEY = 'kit-composer-draft-v1';

export const DEFAULT_BUTTON_PROPS: ButtonPresetProps = {
  label: 'Click me',
  severity: 'primary',
  variant: 'premium',
  size: 'small',
  disabled: false,
  icon: '',
  outlined: false,
  text: false,
};

export const DEFAULT_BUTTON_TOKENS: Record<string, string> = {
  '--kp-button-border-radius': '8px',
  '--kp-button-padding-x-sm': '0.875rem',
  '--kp-primary': '#2563eb',
};

export const DEFAULT_INPUT_PROPS: InputPresetProps = {
  label: 'Название',
  placeholder: 'Введите текст',
  disabled: false,
  required: false,
  error: '',
  size: 'small',
};

export const DEFAULT_SELECT_PROPS: SelectPresetProps = {
  label: 'Выберите значение',
  placeholder: 'Выберите...',
  disabled: false,
  required: false,
  loading: false,
  error: '',
};

export const DEFAULT_CHECKBOX_PROPS: CheckboxPresetProps = {
  label: 'Отметить',
  disabled: false,
};

export const DEFAULT_TAG_PROPS: TagPresetProps = {
  value: 'Статус',
  severity: 'info',
  rounded: true,
};

export const DEFAULT_CARD_PROPS: CardPresetProps = {
  header: 'Заголовок',
  body: 'Содержимое карточки',
};

export const DEFAULT_SEARCH_PROPS: SearchPresetProps = {
  label: '',
  placeholder: 'Поиск...',
  disabled: false,
  size: 'small',
};

export const DEFAULT_TEXTAREA_PROPS: TextareaPresetProps = {
  label: 'Описание',
  placeholder: 'Введите текст...',
  disabled: false,
  required: false,
  error: '',
  rows: 3,
  size: 'small',
};

export const DEFAULT_MULTISELECT_PROPS: MultiselectPresetProps = {
  label: 'Выберите варианты',
  placeholder: 'Выберите...',
  disabled: false,
  required: false,
  error: '',
};

export const DEFAULT_DATEPICKER_PROPS: DatepickerPresetProps = {
  label: 'Дата',
  disabled: false,
  required: false,
  readonly: false,
  error: '',
};

export const DEFAULT_PASSWORD_PROPS: PasswordPresetProps = {
  label: 'Пароль',
  placeholder: 'Введите пароль',
  disabled: false,
  required: false,
  toggleMask: true,
  feedback: false,
  error: '',
};

export const DEFAULT_INPUT_NUMBER_PROPS: InputNumberPresetProps = {
  label: 'Количество',
  placeholder: '',
  disabled: false,
  required: false,
  error: '',
  min: 0,
  max: 999,
  step: 1,
};

export const DEFAULT_INPUT_TOKENS: Record<string, string> = {
  '--kp-radius-md': '8px',
  '--kp-control-height': '32px',
  '--kp-border': '#e2e8f0',
};

export const DEFAULT_PRESETS: Record<ComposerComponentType, ComponentPreset> = {
  'up-kp-button': {
    id: 'button-default',
    name: 'Primary Button',
    description: 'Default primary button preset',
    componentType: 'up-kp-button',
    props: { ...DEFAULT_BUTTON_PROPS },
    tokenOverrides: { ...DEFAULT_BUTTON_TOKENS },
    createdAt: '',
  },
  'up-kp-input': {
    id: 'input-default',
    name: 'Text Input',
    description: 'Default text input preset',
    componentType: 'up-kp-input',
    props: { ...DEFAULT_INPUT_PROPS },
    tokenOverrides: { ...DEFAULT_INPUT_TOKENS },
    createdAt: '',
  },
  'up-kp-select': {
    id: 'select-default',
    name: 'Select',
    description: 'Default select preset',
    componentType: 'up-kp-select',
    props: { ...DEFAULT_SELECT_PROPS },
    createdAt: '',
  },
  'up-kp-checkbox': {
    id: 'checkbox-default',
    name: 'Checkbox',
    description: 'Default checkbox preset',
    componentType: 'up-kp-checkbox',
    props: { ...DEFAULT_CHECKBOX_PROPS },
    createdAt: '',
  },
  'up-kp-tag': {
    id: 'tag-default',
    name: 'Tag',
    description: 'Default tag preset',
    componentType: 'up-kp-tag',
    props: { ...DEFAULT_TAG_PROPS },
    createdAt: '',
  },
  'up-kp-search': {
    id: 'search-default',
    name: 'Search',
    description: 'Default search preset',
    componentType: 'up-kp-search',
    props: { ...DEFAULT_SEARCH_PROPS },
    createdAt: '',
  },
  'up-kp-textarea': {
    id: 'textarea-default',
    name: 'Textarea',
    description: 'Default textarea preset',
    componentType: 'up-kp-textarea',
    props: { ...DEFAULT_TEXTAREA_PROPS },
    createdAt: '',
  },
  'up-kp-multiselect': {
    id: 'multiselect-default',
    name: 'Multiselect',
    description: 'Default multiselect preset',
    componentType: 'up-kp-multiselect',
    props: { ...DEFAULT_MULTISELECT_PROPS },
    createdAt: '',
  },
  'up-kp-input-number': {
    id: 'input-number-default',
    name: 'Input Number',
    description: 'Default input number preset',
    componentType: 'up-kp-input-number',
    props: { ...DEFAULT_INPUT_NUMBER_PROPS },
    createdAt: '',
  },
  'up-kp-datepicker': {
    id: 'datepicker-default',
    name: 'Datepicker',
    description: 'Default datepicker preset',
    componentType: 'up-kp-datepicker',
    props: { ...DEFAULT_DATEPICKER_PROPS },
    createdAt: '',
  },
  'up-kp-password': {
    id: 'password-default',
    name: 'Password',
    description: 'Default password preset',
    componentType: 'up-kp-password',
    props: { ...DEFAULT_PASSWORD_PROPS },
    createdAt: '',
  },
};

export function slugifyPresetName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04ff]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'preset';
}

export function tokenOverridesToStyle(
  overrides: Record<string, string> | undefined,
): Record<string, string> {
  if (!overrides) return {};
  return { ...overrides };
}
