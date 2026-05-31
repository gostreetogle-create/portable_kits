# COPY-GUIDE — layout-shell-kit

## Copy to consumer

1. `layout-shell-kit/src/` → `packages/layout-shell-kit/src/`
2. Path alias in tsconfig consumer
3. Configure (see README)
4. Wire public API: <ls-layout-shell [navItems]="..." [appTitle]="..." />, provideLayoutShellKit({ appTitle, navItems })

## Do not copy

- `demo/`, `tests/`, `node_modules/`, scaffold-only files

## Pattern **B**

| Copy | Folders |
|------|---------|
| Consumer | `src/` |

See [docs/KPPDF-MODULES-CHECKLIST.md](../docs/KPPDF-MODULES-CHECKLIST.md)
