# layout-shell-kit

> **Статус:** 📋 scaffold — в разработке  
> **Паттерн упаковки:** **B**  
> **Приоритет:** P3 · **Универсальность:** high

## Назначение

Переносимый модуль оболочки приложения: боковое меню, layout, хлебные крошки и метки маршрутов.

| | |
|--|--|
| **Источник (план извлечения)** | `layout/*, menu, kp-breadcrumbs ROUTE_LABELS` |
| **Public API** | `<ls-app-shell ... />`, menu, breadcrumbs (TBD) |
| **Зависимости** | auth-rbac-kit (TBD) |
| **Префикс** | `ls-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`layout-shell-kit/src/`** → `packages/layout-shell-kit/src/`

Path alias (после реализации):

```json
"@layout-shell-kit/angular": ["packages/layout-shell-kit/src/angular/index.ts"]
```

Подробно: COPY-GUIDE.md (после реализации)

## Разработка

```bash
cd layout-shell-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
