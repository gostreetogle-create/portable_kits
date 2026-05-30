/** Единственная точка переключения static ↔ http */
export const demoEnvironment = {
  provider: 'static' as 'static' | 'http',
  schemaApiUrl: 'http://localhost:3333/api/v1/schema',
};
