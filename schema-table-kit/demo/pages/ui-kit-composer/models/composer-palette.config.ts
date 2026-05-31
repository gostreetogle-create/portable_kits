import type { ComposerComponentType } from './component-preset.model';
import { UI_PRIMENG_COMPONENTS } from '../../ui-primeng-kit/ui-primeng-components.config';

export interface ComposerPaletteEntry {
  id: string;
  title: string;
  componentType: ComposerComponentType;
  selector: string;
}

const COMPOSER_ALLOWED_IDS = new Set(['button', 'input', 'select', 'checkbox', 'tag', 'search', 'textarea', 'multiselect', 'input-number', 'datepicker', 'password', 'table', 'paginator']);

/** Palette entries for composer v0.1 — ready single bricks only. */
export const COMPOSER_PALETTE: ComposerPaletteEntry[] = UI_PRIMENG_COMPONENTS.filter(
  (c) => c.status === 'ready' && COMPOSER_ALLOWED_IDS.has(c.id),
).map((c) => ({
  id: c.id,
  title: c.title,
  componentType: c.selector as ComposerComponentType,
  selector: c.selector,
}));
