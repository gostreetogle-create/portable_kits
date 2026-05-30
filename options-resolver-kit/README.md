# options-resolver-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **D**  
> **Приоритет:** P3 · **Универсальность:** high

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `shared/services/*-options.service.ts` |
| **Public API** | provideOptionsResolver(config), OptionsResolver.getOptions(entityKey) |
| **Зависимости** | @angular/core, HttpClient optional |
| **Префикс** | `or-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`options-resolver-kit/src/`** → `packages/options-resolver-kit/src/`

Path alias:

```json
"@options-resolver-kit/core": ["packages/options-resolver-kit/src/core/index.ts"],
"@options-resolver-kit/angular": ["packages/options-resolver-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd options-resolver-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
