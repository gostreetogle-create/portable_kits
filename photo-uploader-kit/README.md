# photo-uploader-kit

> **Статус:** 📋 scaffold — реализация не начата  
> **Паттерн упаковки:** **B**  
> **Приоритет:** P2 · **Универсальность:** high

## Назначение

Portable kit из KPPDF 3.0.

| | |
|--|--|
| **Источник KPPDF** | `shared/ui/kp-photo-uploader.component.ts` |
| **Public API** | <pu-photo-uploader [(photos)]="photos" /> |
| **Зависимости** | @angular/core, @angular/forms only |
| **Префикс** | `pu-` (компоненты / CSS vars) |

## Упаковка (consumer)

Copy **`photo-uploader-kit/src/`** → `packages/photo-uploader-kit/src/`

Path alias:

```json
"@photo-uploader-kit/core": ["packages/photo-uploader-kit/src/core/index.ts"],
"@photo-uploader-kit/angular": ["packages/photo-uploader-kit/src/angular/index.ts"]
```

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

```bash
cd photo-uploader-kit
# после реализации demo:
npm install && npm start
```

Сейчас — только scaffold. См. [STATUS.md](./STATUS.md)
