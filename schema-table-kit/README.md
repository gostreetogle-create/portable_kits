# Schema Table Kit

Reusable module: unified DB table schema config + column builder for Angular (+ optional Express schema API).

Part of **[portable-kits](../README.md)** — a portable modules warehouse. KPPDF and other apps are consumers.

> **Dev vs consumer:** this folder is the demo + tests shell for the kit.  
> Consumer copies **only `src/`** + their own `schema-tables.config.ts`.  
> Details: **[COPY-GUIDE.md](./COPY-GUIDE.md)**.

## Concept (brief)

**One `<st-schema-column-builder>` per project** — for each new DB entity, the component is **not copied**.

| Role | Action |
|------|--------|
| **Developer** | Adds `EntitySchema` in `schema-tables.config.ts` (fields, labels, `schemaVersion`) |
| **Admin** | In UI creates **table definition**: key, label, column selection from dropdown → save |

- **Config** — "what exists in DB" (all fields for `products`, `orders`, …)
- **TableDefinition** — "which columns to show" (multiple tables per entity possible)

Details: **[CONCEPTS.md](./CONCEPTS.md)** — data levels, FAQ, adding entities, roadmap v2.

## Quick Start

```bash
git clone <your-repo> portable-kits
cd portable-kits/schema-table-kit
npm install
npm start
```

Open http://localhost:4200

### HTTP mode (smoke test)

```bash
# terminal 1
npm run demo:server

# demo/environment.ts → provider: 'http'
npm start
```

Detailed checklist: [QUICKSTART.md](./QUICKSTART.md)

## Structure

```
src/core/          — types, validation, presets (zero Angular)
src/angular/       — st-schema-column-builder + provideSchemaTableKit()
src/express/       — createSchemaRouter()
demo/              — demo app "Create table"
demo-server/       — mock API :3333
tests/             — vitest (core, express, angular)
```

## COPY-GUIDE — port to your project

**Short version:** copy **`src/`**, not the whole kit folder.

| Copy | Do not copy |
|------|-------------|
| `src/core`, `src/angular`, `src/express` | `demo/`, `demo-server/`, `tests/`, `node_modules/` |

Full instructions: **[COPY-GUIDE.md](./COPY-GUIDE.md)** — alias, config, app.config, Express, checklist.

### In a nutshell

1. `src/` → `packages/schema-table-kit/src/` (or submodule)
2. Path alias in `tsconfig.json`
3. Your own `schema-tables.config.ts` in consumer (demo/mock is sample only)
4. `provideSchemaTableKit(config)` + `<st-schema-column-builder>`
5. (optional) `createSchemaRouter(config)` on backend

## schemaVersion

- Set **manually** per entity: `EntitySchema.schemaVersion` (e.g., `'1.0.0'`).
- On save, consumer writes `savedSchemaVersion` from current entity.
- If versions mismatch — banner "Schema updated", **save is not blocked**.

## Orphan fields

Field removed from config but still in saved columns → badge "Outdated", warning `orphan_field`.

## HttpSchemaProvider

```typescript
provideSchemaTableKit({
  provider: 'http',
  schemaApiUrl: 'http://localhost:3333/api/v1/schema',
})
```

Component emits `providerStatusChange`: `'idle' | 'loading' | 'ready' | 'error'`. On error — "Retry" button.

## Public API

| Export | Description |
|--------|-------------|
| `provideSchemaTableKit(config)` | DI providers |
| `SchemaColumnBuilderComponent` | `<st-schema-column-builder>` (CVA) |
| `src/core` | types, `validateColumns`, `getFieldValue`, `applyPreset` |
| `createSchemaRouter(config)` | Express GET `/entities`, `/entities/:key` |

## Mock data

Demo uses **"Products"** fields from KPPDF (`IProduct` / products-page) — copied to `demo/mock-data/`, no import from KPPDF.

## Documentation

| File | Contents |
|------|----------|
| [COPY-GUIDE.md](./COPY-GUIDE.md) | **What to copy to consumer and how to wire** |
| [CONCEPTS.md](./CONCEPTS.md) | Concept, roles, FAQ, adding entities |
| [QUICKSTART.md](./QUICKSTART.md) | Clone → demo in 2 min |
| [INTEGRATION-KPPDF.md](./INTEGRATION-KPPDF.md) | KPPDF integration (backlog) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Demo :4200 |
| `npm run demo:server` | Mock schema API :3333 |
| `npm test` | Vitest |
| `npm run build` | Production bundle |
