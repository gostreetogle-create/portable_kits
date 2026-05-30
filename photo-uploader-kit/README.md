# photo-uploader-kit

> **Статус:** ✅ v0.1 — ported from KPPDF  
> **Паттерн упаковки:** **B**  
> **Приоритет:** P1 · **Универсальность:** high

## Назначение

Загрузка и управление фотографиями (plain HTML v0.1, без PrimeNG).

| | |
|--|--|
| **Источник KPPDF** | `shared/ui/kp-photo-uploader.component.ts` |
| **Public API** | `<pu-photo-uploader [(photos)]="photos" />` |
| **Зависимости** | `@angular/core`, `@angular/forms` |
| **Префикс** | `pu-` |

## Упаковка (consumer)

Copy **`photo-uploader-kit/src/`** → `packages/photo-uploader-kit/src/`

Path alias:

```json
"@photo-uploader-kit/core": ["packages/photo-uploader-kit/src/core/index.ts"],
"@photo-uploader-kit/angular": ["packages/photo-uploader-kit/src/angular/index.ts"]
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
