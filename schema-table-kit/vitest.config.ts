import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@schema-table-kit/core': path.resolve(__dirname, 'src/core/index.ts'),
      '@schema-table-kit/angular': path.resolve(__dirname, 'src/angular/index.ts'),
      '@sortable-kit/angular': path.resolve(__dirname, '../sortable-kit/src/angular/index.ts'),
      '@options-resolver-kit/core': path.resolve(__dirname, '../options-resolver-kit/src/core/index.ts'),
      '@options-resolver-kit/angular': path.resolve(__dirname, '../options-resolver-kit/src/angular/index.ts'),
      '@entity-picker-kit/core': path.resolve(__dirname, '../entity-picker-kit/src/core/index.ts'),
      '@crud-factory-kit/core': path.resolve(__dirname, '../crud-factory-kit/src/core/index.ts'),
      '@crud-factory-kit/express': path.resolve(__dirname, '../crud-factory-kit/src/express/index.ts'),
      '@schema-data-table-kit/core': path.resolve(__dirname, '../schema-data-table-kit/src/core/index.ts'),
    },
  },
  test: {
    include: ['tests/**/*.spec.ts'],
  },
});
