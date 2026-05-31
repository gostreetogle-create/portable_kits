# COPY-GUIDE — ui-primeng-kit

Как перенести `ui-primeng-kit` (kp-компоненты) из этого repo в ваш Angular-проект.

---

## Содержание

1. [Общая процедура](#1-общая-процедура)
2. [Зависимости consumer-проекта](#2-зависимости-consumer-проекта)
3. [Пример 1. Простой компонент — KpButton](#3-пример-1-простой-компонент--kpbutton)
4. [Пример 2. Поле ввода — KpInput](#4-пример-2-поле-ввода--kpinput)
5. [Пример 3. Связка KpFormField + KpInput](#5-пример-3-связка-kpformfield--kpinput)
6. [Пример 4. Компоненты с провайдерами — KpToast / KpConfirmDialog](#6-пример-4-компоненты-с-провайдерами--kptoast--kpconfirmdialog)
7. [Пример 5. Компонент с Router — KpBreadcrumbs](#7-пример-5-компонент-с-router--kpbreadcrumbs)
8. [Пример 6. Диалог с моделью — KpDialog](#8-пример-6-диалог-с-моделью--kpdialog)
9. [Пример 7. Композитный компонент — KpTable](#9-пример-7-композитный-компонент--kptable)
10. [Настройка темы](#10-настройка-темы)
11. [Чеклист после копирования](#11-чеклист-после-копирования)
12. [Обновление kit в consumer](#12-обновление-kit-в-consumer)

---

## 1. Общая процедура

Из всего `ui-primeng-kit/` consumer-проект копирует **только `src/`**.

```text
portable-kits/
└── ui-primeng-kit/
    ├── src/                    ← ★ КОПИРУЕТЕ
    │   ├── core/               — типы конфига (UiPrimengKitConfig)
    │   ├── angular/            — все kp-компоненты, provide-ui-primeng-kit, стили
    │   │   ├── button/
    │   │   ├── input/
    │   │   ├── dialog/
    │   │   ├── select/
    │   │   ├── checkbox/
    │   │   ├── tag/
    │   │   ├── card/
    │   │   ├── search/
    │   │   ├── textarea/
    │   │   ├── multiselect/
    │   │   ├── input-number/
    │   │   ├── datepicker/
    │   │   ├── password/
    │   │   ├── breadcrumbs/
    │   │   ├── tab-group/
    │   │   ├── toast/
    │   │   ├── confirm-dialog/
    │   │   ├── form-field/
    │   │   ├── photo-uploader/
    │   │   ├── paginator/
    │   │   ├── table/
    │   │   ├── styles/        — SCSS-токены (_tokens.scss, _kp-button.scss, _kp-field.scss)
    │   │   └── index.ts       — barrel export
    │   └── index.ts
    ├── README.md               — опционально (справка)
    ├── demo/                   — НЕ копируете
    ├── tests/                  — НЕ копируете
    ├── variants/               — НЕ копируете (presets для dev)
    └── package.json            — НЕ копируете (у consumer свой)
```

### Шаг 1. Скопировать файлы

```bash
# Из клонированного portable-kits
cp -r portable-kits/ui-primeng-kit/src ./packages/ui-primeng-kit/src

# Или через git submodule
git submodule add <repo-url> packages/portable-kits
# затем скопировать packages/portable-kits/ui-primeng-kit/src → packages/ui-primeng-kit/src
```

### Шаг 2. Path aliases в tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@ui-primeng-kit/core": ["packages/ui-primeng-kit/src/core/index.ts"],
      "@ui-primeng-kit/angular": ["packages/ui-primeng-kit/src/angular/index.ts"]
    }
  }
}
```

Подставьте реальный путь под свою структуру папок.

### Шаг 3. Подключить config в app.config.ts

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideUiPrimengKit } from '@ui-primeng-kit/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    providePrimeNG({ theme: { preset: Aura } }),
    provideUiPrimengKit({ /* cssPrefix: 'my-' — опционально */ }),
    // ... остальные providers
  ],
};
```

> **Важно:** `provideAnimations()` и `providePrimeNG()` — обязательны. Без них PrimeNG-компоненты не работают.

---

## 2. Зависимости consumer-проекта

Убедитесь, что в `package.json` consumer-проекта установлены:

```json
{
  "dependencies": {
    "@angular/core": "^21.0.0",
    "@angular/common": "^21.0.0",
    "@angular/router": "^21.0.0",
    "@angular/forms": "^21.0.0",
    "@angular/animations": "^21.0.0",
    "primeng": "^18.0.0",
    "primeicons": "^7.0.0",
    "@primeuix/themes": "^1.0.0"
  }
}
```

```bash
npm install primeng primeicons @primeuix/themes
```

---

## 3. Пример 1. Простой компонент — KpButton

**Сценарий:** добавить на страницу кнопку с иконкой и лоадером.

### Импорт

```typescript
import { Component } from '@angular/core';
import { KpButtonComponent } from '@ui-primeng-kit/angular';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [KpButtonComponent],
  template: `...`,
})
export class MyPageComponent {}
```

### Использование

```html
<up-kp-button
  label="Сохранить"
  severity="primary"
  variant="premium"
  size="small"
  icon="pi pi-check"
  [loading]="saving"
  (onClick)="handleSave()"
/>
```

| Input | Тип | По умолчанию | Описание |
|-------|-----|-------------|----------|
| `label` | `string` | `''` | Текст кнопки |
| `severity` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Цветовая схема |
| `variant` | `'premium' \| 'flat'` | `'premium'` | Стиль: premium (тень, подъём) или flat (плоский) |
| `size` | `'small' \| 'medium' \| 'large'` | `'small'` | Размер |
| `type` | `'button' \| 'submit'` | `'button'` | HTML type |
| `icon` | `string` | `''` | Иконка PrimeIcon (например, `'pi pi-check'`) |
| `loading` | `boolean` | `false` | Показать спиннер |
| `disabled` | `boolean` | `false` | Отключить кнопку |
| `rounded` | `boolean` | `false` | Скруглённая кнопка |
| `block` | `boolean` | `false` | На всю ширину родителя |
| `outlined` | `boolean` | `false` | Обводка без заливки |
| `raised` | `boolean` | `false` | Тень |
| `text` | `boolean` | `false` | Только текст (без фона/рамки) |
| `autoFocus` | `boolean` | `false` | Автофокус |

### Output

| Событие | Тип | Описание |
|---------|-----|----------|
| `onClick` | `Event` | Клик по кнопке (не срабатывает при disabled/loading) |

### Пример с reactive-формой

```typescript
// В компоненте
saveDraft() {
  this.saving.set(true);
  this.myService.save().subscribe(() => this.saving.set(false));
}
```

```html
<up-kp-button
  label="Сохранить черновик"
  severity="primary"
  icon="pi pi-save"
  [loading]="saving()"
  (onClick)="saveDraft()"
/>
```

---

## 4. Пример 2. Поле ввода — KpInput

**Сценарий:** текстовое поле с плейсхолдером, связанное с сигналом.

### Использование

```html
<up-kp-input
  [(ngModel)]="searchQuery"
  placeholder="Поиск..."
  [required]="true"
  (onChange)="handleSearch($event)"
/>
```

### Пример с сигналом (Angular 17+)

```typescript
readonly searchQuery = signal('');

// В шаблоне:
// <up-kp-input [value]="searchQuery()" (valueChange)="searchQuery.set($event)" />
```

### Связывание через model() (двусторонний binding)

```typescript
readonly searchQuery = model('');

// <up-kp-input [(value)]="searchQuery" />
```

| Input | Тип | По умолчанию |
|-------|-----|-------------|
| `value` | `string` | `''` |
| `placeholder` | `string` | `'Введите значение'` |
| `label` | `string` | `''` |
| `required` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `readonly` | `boolean` | `false` |
| `autofocus` | `boolean` | `false` |
| `ariaLabel` | `string` | `''` |

### Output

| Событие | Тип |
|---------|-----|
| `valueChange` | `string` |
| `onChange` | `Event` |
| `onBlur` | `Event` |
| `onFocus` | `Event` |

---

## 5. Пример 3. Связка KpFormField + KpInput

**Сценарий:** поле формы с лейблом, валидацией и сообщением об ошибке.

```html
<up-kp-form-field label="Email" [required]="true" [errorMessage]="emailError()">
  <up-kp-input
    [(value)]="email"
    placeholder="user@example.com"
    type="email"
    [required]="true"
  />
</up-kp-form-field>
```

```typescript
readonly email = model('');
readonly emailError = computed(() => {
  const v = this.email();
  if (!v) return 'Email обязателен';
  if (!v.includes('@')) return 'Некорректный email';
  return '';
});
```

KpFormField поддерживает `errorMessage`, `hint`, `required` и любую проекцию содержимого (input, select, textarea и т.д.).

---

## 6. Пример 4. Компоненты с провайдерами — KpToast / KpConfirmDialog

### KpToast

**Сценарий:** показать уведомление после сохранения.

#### 1. Зарегистрировать компонент (в корне приложения)

```typescript
// app.component.ts — импортировать standalone
import { Component } from '@angular/core';
import { KpToastComponent } from '@ui-primeng-kit/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KpToastComponent],
  template: `<up-kp-toast /><router-outlet />`,
})
export class AppComponent {}
```

#### 2. Inject MessageService и показать toast

```typescript
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export class MyComponent {
  private readonly messageService = inject(MessageService);

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Сохранено',
      detail: 'Данные успешно сохранены',
    });
  }

  showError(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail,
      life: 5000,
    });
  }
}
```

#### 3. Provide MessageService

```typescript
// app.config.ts — MessageService добавляется автоматически через providePrimeNG()
// Если нет — укажите вручную:
providers: [MessageService]
```

### KpConfirmDialog

**Сценарий:** подтвердить удаление записи.

```html
<up-kp-confirm-dialog />
<up-kp-button label="Удалить" severity="danger" (onClick)="confirmDelete()" />
```

```typescript
import { inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

export class MyComponent {
  private readonly confirmationService = inject(ConfirmationService);

  confirmDelete() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Вы уверены, что хотите удалить эту запись?',
      header: 'Подтверждение удаления',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Да, удалить',
      rejectLabel: 'Отмена',
      accept: () => {
        // выполнить удаление
      },
    });
  }
}
```

> **Provider:** `ConfirmationService` также добавляется через `providePrimeNG()`.

---

## 7. Пример 5. Компонент с Router — KpBreadcrumbs

**Сценарий:** хлебные крошки для навигации по разделам.

KpBreadcrumbs может работать в двух режимах:
- **Автоматический** — синхронизируется с URL через Router
- **Ручной** — передаёте массив `KpBreadcrumbItem[]`

### Режим 1: автоматический

Компонент сам подписывается на `Router.events` и строит крошки из URL:

```html
<up-kp-breadcrumbs />
```

По URL `/products/electronics/phones` построит:
`Главная > Products > Electronics > Phones`

### Режим 2: ручной

```html
<up-kp-breadcrumbs [items]="myBreadcrumbs" />
```

```typescript
import type { KpBreadcrumbItem } from '@ui-primeng-kit/angular';

readonly myBreadcrumbs: KpBreadcrumbItem[] = [
  { label: 'Главная', routerLink: '/' },
  { label: 'Товары', routerLink: '/products' },
  { label: 'Телефоны' },  // последний элемент без routerLink — текущий
];
```

### Требования

В приложении должен быть подключён `provideRouter()` или `RouterModule.forRoot()`.  
Если компонент используется в изолированном тесте, добавьте `provideRouter([])`.

---

## 8. Пример 6. Диалог с моделью — KpDialog

**Сценарий:** модальное окно для редактирования записи.

```html
<up-kp-dialog [(visible)]="dialogVisible" header="Редактирование" width="520px">
  <up-kp-input [(value)]="editName" placeholder="Название" />
  <up-kp-button label="Сохранить" (onClick)="saveEdit()" />
</up-kp-dialog>
```

```typescript
readonly dialogVisible = model(false);
readonly editName = model('');

openEdit(item: { name: string }) {
  this.editName.set(item.name);
  this.dialogVisible.set(true);
}

saveEdit() {
  // сохранить this.editName()
  this.dialogVisible.set(false);
}
```

| Input | Тип | По умолчанию |
|-------|-----|-------------|
| `visible` | `boolean` (model) | — |
| `header` | `string` | `''` |
| `width` | `string` | `'480px'` |
| `ariaLabel` | `string` | `''` |

> Для работы с анимациями требуется `provideAnimations()`.  
> Если в тестах — используйте `NoopAnimationsModule`.

---

## 9. Пример 7. Композитный компонент — KpTable

**Сценарий:** таблица с данными, колонками, пагинацией, поиском и actions.

KpTable — самый сложный компонент. Он объединяет `KpPaginator`, `KpSearch` и PrimeNG `p-table`.

```typescript
import { Component, signal } from '@angular/core';
import { KpTableComponent, type KpColumn } from '@ui-primeng-kit/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [KpTableComponent, DatePipe],
  template: `
    <up-kp-table
      title="Пользователи"
      [columns]="columns"
      [data]="filteredUsers()"
      [total]="totalUsers()"
      [(page)]="page"
      [(limit)]="limit"
      [loading]="isLoading()"
      [showRowActions]="true"
      (edit)="onEdit($event)"
      (delete)="onDelete($event)"
      (pageChange)="loadPage()"
    >
      <!-- Кастомная колонка: дата -->
      <ng-template #rowTemplate let-row="row" let-col="col">
        <ng-container [ngSwitch]="col.field">
          <ng-container *ngSwitchCase="'createdAt'">
            {{ row.createdAt | date:'dd.MM.yyyy' }}
          </ng-container>
          <ng-container *ngSwitchDefault>
            {{ row[col.field] }}
          </ng-container>
        </ng-container>
      </ng-template>
    </up-kp-table>
  `,
})
export class UsersTableComponent {
  readonly columns: KpColumn[] = [
    { field: 'name', header: 'Имя', sortable: true, filterable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'role', header: 'Роль', filterable: true },
    { field: 'createdAt', header: 'Создан', sortable: true },
    { field: 'actions', header: 'Действия', sortable: false },
  ];

  readonly filteredUsers = signal<any[]>([]);
  readonly totalUsers = signal(0);
  readonly isLoading = signal(false);
  readonly page = signal(1);
  readonly limit = signal(15);

  loadPage() {
    this.isLoading.set(true);
    this.myService
      .getUsers({ page: this.page(), limit: this.limit() })
      .subscribe((res) => {
        this.filteredUsers.set(res.items);
        this.totalUsers.set(res.total);
        this.isLoading.set(false);
      });
  }

  onEdit(row: any) {
    // открыть форму редактирования
  }

  onDelete(row: any) {
    // подтвердить и удалить
  }
}
```

### KpTable Inputs

| Input | Тип | По умолчанию |
|-------|-----|-------------|
| `columns` | `KpColumn[]` (required) | — |
| `data` | `any[]` (required) | — |
| `total` | `number` | `0` |
| `loading` | `boolean` | `false` |
| `title` | `string` | `''` |
| `paginator` | `boolean` | `true` |
| `page` | `number` (model) | — |
| `limit` | `number` (model) | — |
| `showSearch` | `boolean` | `true` |
| `showRowActions` | `boolean` | `true` |
| `canUpdate` | `boolean` | `true` |
| `showActions` | `boolean` | `true` |
| `showToolbarTitle` | `boolean` | `true` |

### KpTable Outputs

| Событие | Тип | Описание |
|---------|-----|----------|
| `edit` | `any` | Клик по Edit |
| `delete` | `any` | Клик по Delete |
| `pageChange` | `KpPageEvent` | Смена страницы/лимита |
| `sort` | `KpSortEvent` | Сортировка по колонке |

---

## 10. Настройка темы

ui-primeng-kit использует CSS-переменные (design tokens).  
Скопируйте и подключите SCSS-токены:

### 1. Скопировать SCSS-файлы

```bash
cp packages/ui-primeng-kit/src/angular/styles/*.scss  src/styles/kp/
```

### 2. Подключить в `styles.scss`

```scss
// styles.scss (или angular.json styles)

// Токены ui-primeng-kit
@use 'kp/tokens' as kp;
@use 'kp/kp-button' as kp-button;
@use 'kp/kp-field' as kp-field;

// Токены на :root
@include kp.kp-light-tokens-on-root;

// Дополнительные стили
@include kp-button.kp-button-primary-premium();
```

### 3. Переопределить токены

```scss
:root {
  --kp-primary: #7c3aed;           // фиолетовый акцент
  --kp-primary-hover: #6d28d9;
  --kp-primary-active: #5b21b6;
  --kp-button-border-radius: 12px;  // скруглённые кнопки
  --kp-control-height: 40px;        // крупные поля
}
```

### 4. Варианты кнопок (presets)

Готовые пресеты можно найти в `ui-primeng-kit/variants/presets/`.  
Пример `primary-large-button.example.json`:

```json
{
  "component": "KpButton",
  "severity": "primary",
  "variant": "premium",
  "size": "large",
  "css": {
    "--kp-button-border-radius": "14px",
    "--kp-button-min-height-sm": "44px"
  }
}
```

Для применения импортируйте JSON и установите токены через `document.documentElement.style.setProperty()`.

---

## 11. Чеклист после копирования

### Обязательно

- [ ] Скопирован только `src/` (не demo, tests, node_modules)
- [ ] Path alias добавлен в `tsconfig.json` (`@ui-primeng-kit/core`, `@ui-primeng-kit/angular`)
- [ ] Установлены `primeng`, `primeicons`, `@primeuix/themes`
- [ ] `provideAnimations()` и `providePrimeNG({ theme: ... })` в `app.config.ts`
- [ ] `provideUiPrimengKit()` вызван (даже с пустым config)
- [ ] SCSS-токены подключены через `@use` и `@include`
- [ ] `ng build` проходит без ошибок

### Для конкретных компонентов

- [ ] **KpToast**: `<up-kp-toast />` в корневом шаблоне; `MessageService` доступен через DI
- [ ] **KpConfirmDialog**: `<up-kp-confirm-dialog />` в корневом шаблоне; `ConfirmationService` через DI
- [ ] **KpBreadcrumbs**: подключён `provideRouter()` / `RouterModule.forRoot()`
- [ ] **KpTable**: переданы `columns` и `data` (required inputs)
- [ ] **KpDialog**: `provideAnimations()` для анимаций (опционально — NoopAnimationsModule в тестах)
- [ ] **KpPhotoUploader**: DragEvent поддерживается (в jsdom-тестах нужен polyfill)

---

## 12. Обновление kit в consumer

Когда kit доработан в portable-kits:

```bash
# 1. Заменить src/
rm -rf packages/ui-primeng-kit/src
cp -r portable-kits/ui-primeng-kit/src packages/ui-primeng-kit/src

# 2. Проверить tsconfig (новые aliases не требуются — структура src/ та же)
# 3. Пересобрать
ng build

# 4. Проверить ключевые страницы с kp-компонентами
```

**Не перезаписывается:** ваши `app.config.ts`, SCSS-переопределения, `package.json`.  
Обновляется только библиотечный код `src/`.

---

## Приложение: полный список компонентов

| Компонент | Селектор | Зависимости PrimeNG | Особенности |
|-----------|----------|--------------------|-------------|
| KpButton | `up-kp-button` | `InputTextModule` | premium/flat variant |
| KpInput | `up-kp-input` | `InputTextModule` | label, required |
| KpDialog | `up-kp-dialog` | `DialogModule` | model binding `visible` |
| KpSelect | `up-kp-select` | `Select` | options + loading |
| KpCheckbox | `up-kp-checkbox` | `CheckboxModule` | label, binary |
| KpTag | `up-kp-tag` | `TagModule` | severity, rounded |
| KpCard | `up-kp-card` | — | header/footer ng-content |
| KpSearch | `up-kp-search` | `InputTextModule` | debounce 300ms |
| KpTextarea | `up-kp-textarea` | `TextareaModule` | autoResize |
| KpMultiselect | `up-kp-multiselect` | `MultiSelectModule` | maxSelectedLabels |
| KpInputNumber | `up-kp-input-number` | `InputNumberModule` | min/max/step |
| KpDatepicker | `up-kp-datepicker` | `DatePickerModule` | model binding |
| KpPassword | `up-kp-password` | `PasswordModule` | toggleMask |
| KpBreadcrumbs | `up-kp-breadcrumbs` | `BreadcrumbModule` | Router sync |
| KpTabGroup | `up-kp-tab-group` | — | input.required options, uses KpButton internally |
| KpToast | `up-kp-toast` | `ToastModule` | требует MessageService |
| KpConfirmDialog | `up-kp-confirm-dialog` | `ConfirmDialogModule` | требует ConfirmationService |
| KpFormField | `up-kp-form-field` | — | error/hint/projection |
| KpPhotoUploader | `up-kp-photo-uploader` | — | drag & drop, zoom, frame edit |
| KpPaginator | `up-kp-paginator` | `PaginatorModule` | input.required rows |
| KpTable | `up-kp-table` | `TableModule` | composit: search + paginator + actions |

---

## См. также

- [README.md](./README.md) — обзор и статус kit
- [QUICKSTART.md](./QUICKSTART.md) — быстрый старт в dev-режиме
- [INTEGRATION-KPPDF.md](./INTEGRATION-KPPDF.md) — интеграция в проект KPPDF
- [docs/HOW-TO-ADD-KIT.md](../docs/HOW-TO-ADD-KIT.md) — как добавить новый kit
