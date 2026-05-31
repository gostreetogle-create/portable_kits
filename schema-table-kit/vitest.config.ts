import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import path from 'node:path';

export default defineConfig({
  plugins: [
    angular({
      tsconfig: './tsconfig.json',
    }),
  ],
  resolve: {
    alias: {
      '@schema-table-kit/core': path.resolve(__dirname, 'src/core/index.ts'),
      '@schema-table-kit/angular': path.resolve(__dirname, 'src/angular/index.ts'),
      '@schema-table-kit/express': path.resolve(__dirname, 'src/express/index.ts'),
      '@sortable-kit/angular': path.resolve(__dirname, '../sortable-kit/src/angular/index.ts'),
      '@options-resolver-kit/core': path.resolve(__dirname, '../options-resolver-kit/src/core/index.ts'),
      '@options-resolver-kit/angular': path.resolve(__dirname, '../options-resolver-kit/src/angular/index.ts'),
      '@entity-picker-kit/core': path.resolve(__dirname, '../entity-picker-kit/src/core/index.ts'),
      '@entity-picker-kit/angular': path.resolve(__dirname, '../entity-picker-kit/src/angular/index.ts'),
      '@crud-factory-kit/core': path.resolve(__dirname, '../crud-factory-kit/src/core/index.ts'),
      '@crud-factory-kit/express': path.resolve(__dirname, '../crud-factory-kit/src/express/index.ts'),
      '@schema-data-table-kit/core': path.resolve(__dirname, '../schema-data-table-kit/src/core/index.ts'),
      '@schema-data-table-kit/angular': path.resolve(__dirname, '../schema-data-table-kit/src/angular/index.ts'),
      '@photo-uploader-kit/core': path.resolve(__dirname, '../photo-uploader-kit/src/core/index.ts'),
      '@photo-uploader-kit/angular': path.resolve(__dirname, '../photo-uploader-kit/src/angular/index.ts'),
      '@placeholder-kit/core': path.resolve(__dirname, '../placeholder-kit/src/core/index.ts'),
      '@placeholder-kit/angular': path.resolve(__dirname, '../placeholder-kit/src/angular/index.ts'),
      '@document-canvas-kit/core': path.resolve(__dirname, '../document-canvas-kit/src/core/index.ts'),
      '@document-canvas-kit/angular': path.resolve(__dirname, '../document-canvas-kit/src/angular/index.ts'),
      '@ui-primeng-kit/core': path.resolve(__dirname, '../ui-primeng-kit/src/core/index.ts'),
      '@ui-primeng-kit/angular': path.resolve(__dirname, '../ui-primeng-kit/src/angular/index.ts'),
      '@crud-page-kit/core': path.resolve(__dirname, '../crud-page-kit/src/core/index.ts'),
      '@crud-page-kit/angular': path.resolve(__dirname, '../crud-page-kit/src/angular/index.ts'),
      '@eav-kit/core': path.resolve(__dirname, '../eav-kit/src/core/index.ts'),
      '@eav-kit/angular': path.resolve(__dirname, '../eav-kit/src/angular/index.ts'),
      '@auth-rbac-kit/core': path.resolve(__dirname, '../auth-rbac-kit/src/core/index.ts'),
      '@auth-rbac-kit/angular': path.resolve(__dirname, '../auth-rbac-kit/src/angular/index.ts'),
      '@layout-shell-kit/core': path.resolve(__dirname, '../layout-shell-kit/src/core/index.ts'),
      '@layout-shell-kit/angular': path.resolve(__dirname, '../layout-shell-kit/src/angular/index.ts'),
      '@quotation-editor/core': path.resolve(__dirname, '../quotation-editor/src/core/index.ts'),
      '@quotation-editor/angular': path.resolve(__dirname, '../quotation-editor/src/angular/index.ts'),
    },
  },
  test: {
    include: ['tests/**/*.spec.ts', '../ui-primeng-kit/src/**/*.spec.ts'],
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
  },
});
