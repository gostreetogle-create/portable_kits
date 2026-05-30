import type {
  PlaceholderContext,
  PlaceholderKitConfig,
  PlaceholderResolvableBlock,
} from './types';

const TOKEN_RE = /\{\{([a-zA-Z_.]+)\}\}/g;

const DEFAULT_ALIASES: Record<string, string> = {
  address: 'legalAddress',
};

function getByPath(obj: unknown, path: string): unknown {
  if (obj === undefined || obj === null) return undefined;
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    if (typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function lookupToken(
  token: string,
  ctx: PlaceholderContext,
  aliases: Record<string, string>,
): unknown {
  const parts = token.split('.');
  if (parts.length < 2) return undefined;

  const category = parts[0];
  let field = parts.slice(1).join('.');
  const firstSegment = field.split('.')[0];
  if (firstSegment && field === firstSegment && aliases[firstSegment]) {
    field = aliases[firstSegment];
  }

  switch (category) {
    case 'org':
      return getByPath(ctx.org, field);
    case 'client':
      return getByPath(ctx.client, field);
    case 'doc':
      return getByPath(ctx.doc, field);
    case 'item':
      return getByPath(ctx.item, field);
    default:
      return undefined;
  }
}

function resolveSingleToken(
  token: string,
  ctx: PlaceholderContext,
  aliases: Record<string, string>,
): string {
  const value = lookupToken(token, ctx, aliases);
  if (value === undefined || value === null) {
    return `{{${token}}}`;
  }
  return String(value);
}

/** Replace all `{{category.field}}` tokens in a template string. */
export function resolvePlaceholders(
  template: string,
  context: PlaceholderContext,
  config: Pick<PlaceholderKitConfig, 'fieldAliases'> = {},
): string {
  if (!template) return '';
  const aliases = { ...DEFAULT_ALIASES, ...config.fieldAliases };
  return template.replace(TOKEN_RE, (_match, token: string) =>
    resolveSingleToken(token, context, aliases),
  );
}

/** Extract unique token keys from a template (without braces). */
export function extractPlaceholderTokens(template: string): string[] {
  if (!template) return [];
  const tokens = new Set<string>();
  const re = new RegExp(TOKEN_RE.source, 'g');
  let match: RegExpExecArray | null;
  while ((match = re.exec(template)) !== null) {
    tokens.add(match[1]);
  }
  return Array.from(tokens).sort();
}

/** Resolve one token key to a display value (or `{{token}}` if unknown). */
export function resolvePlaceholderToken(
  token: string,
  context: PlaceholderContext,
  config: Pick<PlaceholderKitConfig, 'fieldAliases'> = {},
): string {
  const aliases = { ...DEFAULT_ALIASES, ...config.fieldAliases };
  return resolveSingleToken(token, context, aliases);
}

/** Resolve tokens in a document block (content + cells). Returns a shallow copy. */
export function resolvePlaceholderBlock<T extends PlaceholderResolvableBlock>(
  block: T,
  context: PlaceholderContext,
  config: Pick<PlaceholderKitConfig, 'fieldAliases'> = {},
): T {
  const resolved = {
    ...block,
    content: resolvePlaceholders(block.content, context, config),
  } as T;

  if (block.cells?.length) {
    (resolved as PlaceholderResolvableBlock).cells = block.cells.map((cell) => ({
      ...cell,
      content: resolvePlaceholders(cell.content, context, config),
    }));
  }

  return resolved;
}

/** Extract tokens from block content and cells. */
export function extractBlockPlaceholderTokens(
  block: PlaceholderResolvableBlock,
): string[] {
  const all = new Set<string>();
  for (const t of extractPlaceholderTokens(block.content)) {
    all.add(t);
  }
  if (block.cells) {
    for (const cell of block.cells) {
      for (const t of extractPlaceholderTokens(cell.content)) {
        all.add(t);
      }
    }
  }
  return Array.from(all).sort();
}

/** Factory for template resolution with kit config baked in. */
export function createPlaceholderResolver(config: PlaceholderKitConfig = {}) {
  const fieldAliases = config.fieldAliases;
  return {
    resolve(template: string, context: PlaceholderContext): string {
      return resolvePlaceholders(template, context, { fieldAliases });
    },
  };
}
