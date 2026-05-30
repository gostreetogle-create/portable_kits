# Чек-лист пожеланий для дальнейшего рассуждения

> **Назначение:** свод всех зафиксированных пожеланий по portable_kits / demo-hub / ui-primeng-kit из обсуждения.  
> **Не является планом работ** — для приоритизации, споров и решений «делать / не делать».  
> **Обновлено:** 2026-05-30

**Связанные документы:**

- [UI-KIT-VISUAL-CUSTOMIZATION-VISION.md](./UI-KIT-VISUAL-CUSTOMIZATION-VISION.md) — архитектурный аудит (персистенция, playground, anti-patterns)
- [ui-primeng-kit/STATUS.md](../ui-primeng-kit/STATUS.md) — статус kit и backlog kp-*
- [schema-table-kit/demo/modules.config.ts](../schema-table-kit/demo/modules.config.ts) — tier home (кирпичики → составные → приложения)

---

## 1. Философия проекта

| Приоритет | Пожелание |
|-----------|-----------|
| — | portable_kits — **отдельный проект**, независимый от KPPDF; KPPDF только как **источник для порта** кода |

- [x] **P0** — Репозиторий portable_kits автономен: kits не импортируют KPPDF в runtime *(модель copy-paste `src/`, см. HOW-TO-ADD-KIT)*
- [x] **P0** — Нет runtime-связки с KPPDF: consumer копирует `kit/src/` в свой проект, без общего npm/workspace с kppdf-3.0
- [ ] **P2** — Явно задокументировать в README/COPY-GUIDE границу «порт из KPPDF ≠ зависимость от KPPDF» для новых контрибьюторов

---

## 2. Demo hub — главная страница

- [x] **P1** — Три колонки на home: **кирпичики (слева)** → **составные (центр)** → **приложения (справа)**, по возрастанию сложности (`DEMO_MODULE_TIER_SECTIONS`, `home__tier-columns`)
- [ ] **P3** — Подписи/иконки tier-колонок уточнить по UX (если понадобится после наполнения каталога)

---

## 3. UI-кит — каталог и навигация (ui-primeng-kit)

- [x] **P1** — Отдельный hub/вкладка для мелких UI-кирпичей: **таблица типов** → клик по типу → **demo всех вариантов** (`/modules/ui-primeng-kit`, `/button|input|dialog`, planned → заглушка)
- [x] **P2** — Переименовать hub в пользовательском UI на **«UI-кит»** (каталог, breadcrumbs, карточка на home в `modules.config.ts`)
- [ ] **P2** — Единообразие «UI-кит» во всех demo-страницах и в корневом README kit (сейчас mix: `ui-primeng-kit` как folder name — ок)

---

## 4. UI-кит — визуальная кастомизация (playground)

Детальный roadmap: [UI-KIT-VISUAL-CUSTOMIZATION-VISION.md](./UI-KIT-VISUAL-CUSTOMIZATION-VISION.md) §5 (v0.2–v0.4).

- [ ] **P1** — Боковая панель на demo-странице **кнопки**: настройка через **CSS/SCSS** (токены `--kp-*`), панель слева или справа, live preview
- [ ] **P1** — Действие **«Сохранить»** → зафиксировать результат как **подтверждённый вариант ui-kit** (approved variant / preset в репозитории, не флаг в БД)
- [ ] **P2** — Export после Save: JSON tokens, SCSS snippet, TS preset → clipboard (разработчик коммитит в git)
- [ ] **P2** — `core/button-variants.types.ts` + `variants/button.presets.ts` с примерами approved-вариантов
- [ ] **P3** — Черновик настроек в sessionStorage/localStorage (только demo, не prod)
- [ ] **P3** — Dev-only persistence (gitignored drafts) — **только если** понадобится после export-flow

**Заметки:** panel — инструмент hub/demo, не обязательный путь для consumer; primary path — правка `_tokens.scss` / override CSS vars.

---

## 5. UI-кит — стили, «папка кирпичей», персистенция

- [x] **P1** — Решение по персистенции: **git + SCSS/design tokens**, не БД для portable_kits *(зафиксировано в vision doc §3.2)*
- [ ] **P1** — Конечное состояние: **одна папка стилей** для мелких кирпичей (`ui-primeng-kit/src/angular/styles/`), подключаемая при импорте составных модулей *(частично есть: `_tokens`, `_kp-button`, `_kp-field`; composite kits ещё не документированы на потребление)*
- [ ] **P2** — Consumer COPY-GUIDE: один раз `@include kp-light-tokens-on-root` + импорт kp-компонентов; без runtime HTTP/CSS-папки
- [ ] **P2** — Composite kits (crud-page, layout-shell, …) используют `<up-kp-*>` + documented token setup в demo и docs
- [ ] **P3** — `provideUiPrimengKit({ tokenOverrides })` — runtime CSS vars для white-label без rebuild (vision v1.0)

**Заметки:** «jQuery-папка» в обсуждении = папка SCSS/UI-kit стилей, не библиотека jQuery.

---

## 6. UI-кит — порт kp-* из KPPDF

- [x] **P1** — Исправление/стабилизация **KpButton** (premium/flat, severity, demo-матрица)
- [ ] **P1** — Полный порт **~22 kp-* компонентов** из KPPDF `shared/ui/*`; **следующий приоритет: select/dropdown** (KpSelect)
- [ ] **P1** — KpTable, KpPaginator — после select (см. STATUS.md Next)
- [ ] **P2** — KppdfPreset / theme override helper в `provideUiPrimengKit()`
- [ ] **P3** — Standalone demo app в `ui-primeng-kit/demo/` (сейчас demo только в schema-table-kit hub)

**Заметки:** селекторы `up-kp-*` vs KPPDF `app-kp-*`; 19+ компонентов в каталоге как planned.

---

## 7. Документация и аудит (уже сделано)

- [x] **P1** — Аудит vision: [UI-KIT-VISUAL-CUSTOMIZATION-VISION.md](./UI-KIT-VISUAL-CUSTOMIZATION-VISION.md) (as-is / to-be / phased roadmap)
- [x] **P1** — Каталог hub: таблица + per-type routes + тесты catalog
- [x] **P1** — Home three-tier columns
- [x] **P1** — KpButton fix + статичная витрина вариантов на `/modules/ui-primeng-kit/button`

---

## Сводка по приоритетам (для обсуждения)

| P | Открытые темы |
|---|----------------|
| **P1** | Style playground + Save/export; папка стилей + composite integration; KpSelect и остальной порт kp-* |
| **P2** | Export presets; COPY-GUIDE; единообразие UI-кит в docs |
| **P3** | localStorage drafts; standalone ui-primeng demo; dev-only draft API |

---

## Как пользоваться чек-листом

1. Обсуждение пункта → решение в vision doc или STATUS.md.
2. Реализация → перенос пункта в roadmap kit / Phase log в [KITS-READINESS-CHECKLIST.md](./KITS-READINESS-CHECKLIST.md).
3. Готовое → `[x]` здесь + запись в STATUS «Done».
