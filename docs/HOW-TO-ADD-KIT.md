# Как добавить новый kit в portable-kits

## 1. Создайте подпапку

```
portable-kits/
└── my-new-kit/
    ├── src/              ← библиотека (копируется в consumer)
    ├── demo/             ← опционально: standalone demo
    ├── tests/
    ├── package.json
    ├── README.md
    └── COPY-GUIDE.md     ← что переносить в consumer
```

Образец структуры: [schema-table-kit](../schema-table-kit/).

## 2. Правила kit

| Правило | Зачем |
|---------|-------|
| **`src/` автономен** | Consumer копирует только его |
| **Свой `npm start`** | Разработка без KPPDF |
| **Без import из consumer** | Kit не знает про KPPDF |
| **COPY-GUIDE.md внутри kit** | Инструкция переноса |
| **Native / minimal deps** | Легко copy anywhere |

## 3. Обновите корневой README.md

Добавьте строку в таблицу «Каталог kits»:

```markdown
| [my-new-kit](./my-new-kit/) | Описание | `my-new-kit/src/` | QUICKSTART link |
```

## 4. Именование

- Папка: `kebab-case` (`schema-table-kit`, `form-builder-kit`)
- Префикс компонентов: уникальный (`st-`, `fb-`, …)
- Path alias в consumer: `@my-new-kit/angular`

## 5. Consumer-подключение (шаблон)

1. Copy `my-new-kit/src/` → `packages/my-new-kit/src/`
2. Path alias в `tsconfig.json`
3. `provideMyNewKit(config)` в `app.config.ts`
4. Компонент в форме consumer

## 6. Не кладите в корень repo

- ❌ Общий `src/` на все kits
- ❌ Общий `package.json` для всех kits (пока kits ≤ 5)
- ❌ Demo consumer-проектов (KPPDF) в этот repo
