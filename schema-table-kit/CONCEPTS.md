# Schema Table Kit Concept

## Core Idea

**One component — all tables in the project.** For each new DB entity, you don't need to copy an Angular component or create a separate form.

| What | How many per project |
|------|---------------------|
| `<st-schema-column-builder>` | **1** |
| `schema-tables.config.ts` | **1** (unified entity registry) |
| `EntitySchema` entry in config | **+1 data block** per DB collection |
| Saved table definition | **as many as needed** (created by user/admin) |

Builder reads entity list from config → user selects "Products" / "Orders" in dropdown → fields load automatically.

---

## Three Data Levels

```
schema-tables.config.ts          ← developer, once per project
        │
        ▼
EntitySchema[]                   ← "what exists in DB" (fields, labels)
        │
        ▼  user in UI
ColumnBuilderValue               ← "which columns to show" (entityKey + columns)
        │
        ▼  save
TableDefinition                  ← "named table" (key, label + builder)
```

### 1. `EntitySchema` — DB entity registry

Describes the **collection/table** and its **fields**. Lives in `schema-tables.config.ts` (or comes from backend via `createSchemaRouter`).

```typescript
export const ORDERS_ENTITY: EntitySchema = {
  key: 'orders',              // dropdown key
  label: 'Orders',            // UI label
  apiPath: '/orders',         // data API (v2)
  collection: 'orders',       // Mongo collection (documentation)
  schemaVersion: '1.0.0',     // manual schema version
  fields: [
    { field: 'number', label: 'Number', type: 'text', group: 'Main' },
    { field: 'status', label: 'Status', type: 'select', group: 'Main' },
    { field: '_id', label: 'ID', type: 'text', selectable: false },
  ],
};
```

### 2. `ColumnBuilderValue` — builder zone (CVA)

Only **entity + columns**. Fields `key` and `label` (table name) are **outside** the component, in the consumer/demo form wrapper.

```typescript
interface ColumnBuilderValue {
  entityKey: string;           // 'products' | 'orders' | …
  columns: SchemaColumn[];     // selected fields, order, headers
  savedSchemaVersion?: string; // fixed on save
}
```

### 3. `TableDefinition` — saved configuration

What the admin creates in "Create Table" and what is later used in documents / CRUD / widgets.

```typescript
interface TableDefinitionDraft {
  key: string;                 // 'product-list-basic'
  label: string;               // 'Product table (basic)'
  builder: ColumnBuilderValue;
}
```

**One entity** (`products`) can have **many definitions** with different column sets:

- `product-list-basic` — sku, name, listPrice, unit
- `product-list-warehouse` — sku, name, stockQty, status

The builder component remains **one**.

---

## Who Does What

### Developer

1. Adds `EntitySchema` to `schema-tables.config.ts`.
2. Wires kit once: `provideSchemaTableKit(config)`.
3. Inserts `<st-schema-column-builder>` in consumer form (table types, admin).
4. (Optional) Mounts `createSchemaRouter(config)` on backend.

**Does not:** create a separate component per MongoDB collection.

### Admin / User

1. Opens "Create Table".
2. Fills key, label.
3. In builder: selects entity → adds columns from dropdown → ↑↓ reorder.
4. Saves → JSON/Mongo, not code.

---

## How to Add a New Entity

Example: project gets new `orders` collection.

### Step 1 — config

```typescript
// schema-tables.config.ts
export const SCHEMA_TABLES_CONFIG: SchemaTableKitConfig = {
  provider: 'static',
  entities: [
    PRODUCTS_ENTITY,
    ORDERS_ENTITY,   // ← added
  ],
};
```

### Step 2 — backend (optional)

Same config in Express — dropdown and HTTP-mode FE get the same data:

```typescript
app.use('/api/v1/schema', createSchemaRouter(SCHEMA_TABLES_CONFIG));
```

### Step 3 — done

Restart app → "Orders" appears in builder dropdown.  
**Component, form, `provideSchemaTableKit()` — unchanged.**

### `EntityFieldMeta` field checklist

| Field | Purpose |
|-------|---------|
| `field` | DB key, dot-path OK: `address.city` |
| `label` | UI label: "City (address.city)" |
| `type` | text, select, currency, date, … |
| `width` | Column width hint |
| `selectable: false` | Internal fields (_id, createdAt) — hidden from dropdown |
| `group` | UI grouping (backlog v1.5) |
| `schemaVersion` | At entity level — for drift-warning |

---

## FAQ

### Do I need to copy the component for each table?

**No.** Only the **entity description** in config is copied. Builder is universal.

### Do I need a separate "Create Products Table" / "Create Orders Table" form?

**No.** One form: key + label + `<st-schema-column-builder>`. Entity is selected in the builder dropdown.

### What's the difference between config and saved table?

| | Config (`EntitySchema`) | Saved table (`TableDefinition`) |
|--|-------------------------|---------------------------------|
| Who edits | Developer | Admin |
| What it describes | All DB fields | Which fields to show and in what order |
| Where stored | Code / schema API | Mongo / localStorage |
| Example | "Products have sku, name, price" | "Product showcase: sku + name + price" |

### What if a field is removed from config?

Column is marked **orphan** (badge "Outdated"), save is not blocked. User rebuilds columns.

### What if `schemaVersion` changes?

Banner "Schema updated — check columns", save is not blocked.

---

## Where This Fits (roadmap)

| Stage | What happens |
|-------|-------------|
| **v1 (current)** | Builder + demo, save to localStorage |
| **integration** | KPPDF "Document table types" → MongoDB |
| **v2** | `<st-schema-data-table tableKey="product-list-basic">` — one widget, different `tableKey` |
| **v2.5** | Auto CRUD section from config |

In v2, the widget component is also **one**: only `tableKey` changes, data comes from the entity's `apiPath`.

---

## Flow Diagram

```
┌─────────────────────┐
│ schema-tables.config │  ← developer adds EntitySchema
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ st-schema-column-   │  ← one component per project
│ builder             │
└──────────┬──────────┘
           │ save
           ▼
┌─────────────────────┐
│ TableDefinition     │  ← key, label, columns (Mongo / localStorage)
└──────────┬──────────┘
           │ embed (v2)
           ▼
┌─────────────────────┐
│ st-schema-data-table│  ← tableKey="..."
└─────────────────────┘
```

---

## See Also

- [COPY-GUIDE.md](./COPY-GUIDE.md) — what to copy to consumer project
- [../README.md](../README.md) — portable-kits catalog
- [../docs/HOW-TO-ADD-KIT.md](../docs/HOW-TO-ADD-KIT.md) — add a new kit
- [INTEGRATION-KPPDF.md](./INTEGRATION-KPPDF.md) — KPPDF integration plan
- `demo/mock-data/schema-tables.config.ts` — example `PRODUCTS_ENTITY`
- `demo/mock-data/saved-tables.mock.ts` — saved table examples
