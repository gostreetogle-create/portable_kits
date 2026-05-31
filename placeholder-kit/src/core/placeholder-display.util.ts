const PLACEHOLDER_RE = /\{\{([a-zA-Z_.]+)\}\}/g;

export function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function wrapPlaceholderDisplay(
  template: string,
  resolveToken: (token: string) => string,
): string {
  if (!template) return '';

  let result = '';
  let lastIndex = 0;
  const re = new RegExp(PLACEHOLDER_RE.source, 'g');
  let m: RegExpExecArray | null;

  while ((m = re.exec(template)) !== null) {
    result += escapeHtml(template.slice(lastIndex, m.index));
    const token = m[1];
    const matchFull = m[0];
    const resolved = resolveToken(token);

    if (resolved === matchFull || resolved === `{{${token}}}`) {
      result += `<span class="ph-unresolved">${escapeHtml(matchFull)}</span>`;
    } else {
      result += `<span class="ph-resolved">${escapeHtml(resolved)}</span>`;
    }
    lastIndex = re.lastIndex;
  }

  result += escapeHtml(template.slice(lastIndex));
  return result;
}

/**
 * Format an ISO date string to a locale-independent short date (YYYY-MM-DD).
 * Consumer can override by providing a custom formatter in PlaceholderKitConfig.
 */
export function formatDate(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toISOString().split('T')[0];
}
