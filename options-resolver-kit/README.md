# options-resolver-kit

> **Статус:** ✅ v0.1 — ported from KPPDF  
> **Паттерн упаковки:** **D**  
> **Приоритет:** P1 · **Универсальность:** high

## Назначение

Кэш и загрузка опций для select/autocomplete.

| | |
|--|--|
| **Источник KPPDF** | `shared/services/*-options.service.ts` |
| **Public API** | `provideOptionsResolver(config)`, `OptionsResolver.getOptions(entityKey)` |
| **Зависимости** | `@angular/core`, HttpClient optional |
| **Префикс** | `or-` |

## Упаковка (consumer)

Copy **`options-resolver-kit/src/`** → `packages/options-resolver-kit/src/`

Path alias:

```json
"@options-resolver-kit/core": ["packages/options-resolver-kit/src/core/index.ts"],
"@options-resolver-kit/angular": ["packages/options-resolver-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

Demo и тесты через hub `schema-table-kit`:

```bash
cd schema-table-kit
npm test
ng serve demo --port 4201
```

См. [STATUS.md](./STATUS.md)
