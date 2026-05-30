# ui-primeng-kit

> **Статус:** ✅ v0.1 — KpButton, KpInput, KpDialog  
> **Паттерн упаковки:** **B**  
> **Приоритет:** P2 · **Универсальность:** high

## Назначение

Обёртки PrimeNG в стиле KPPDF (premium buttons, поля, диалоги).

| | |
|--|--|
| **Источник KPPDF** | `shared/ui/kp-button`, `kp-input`, `kp-dialog` |
| **Public API** | `<up-kp-button>`, `<up-kp-input>`, `<up-kp-dialog>`, `provideUiPrimengKit()` |
| **Зависимости** | primeng, primeicons, `@primeuix/themes`, `provideAnimations()` |
| **Префикс** | `up-kp-` |

## Упаковка (consumer)

Copy **`ui-primeng-kit/src/`** → `packages/ui-primeng-kit/src/`

Path alias:

```json
"@ui-primeng-kit/core": ["packages/ui-primeng-kit/src/core/index.ts"],
"@ui-primeng-kit/angular": ["packages/ui-primeng-kit/src/angular/index.ts"]
```

Consumer также подключает `providePrimeNG()` и CSS tokens из kit (`styles/_tokens.scss`).

Подробно: [COPY-GUIDE.md](./COPY-GUIDE.md)

## Разработка

Demo и тесты через hub `schema-table-kit`:

```bash
cd schema-table-kit
npm test
ng serve demo --port 4201
```

См. [STATUS.md](./STATUS.md)
