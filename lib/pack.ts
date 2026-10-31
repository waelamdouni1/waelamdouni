/**
 * Packs works into a grid of a given size, keeping their order where it can. Fixed blocks
 * (the anchor, the promo card) go in first; the rest fill the first free cell in reading order,
 * backtracking when an arrangement would strand a work. Returns null when they don't fit.
 */
export type Span = { c: number; r: number };
export type Placed = { col: number; row: number; c: number; r: number };
export type Fixed = Placed & { key: string };
export type Item = { key: string; span: Span };

export function packInto(cols: number, rows: number, items: Item[], fixed: Fixed[]): Map<string, Placed> | null {
  const grid: (string | null)[] = Array(cols * rows).fill(null);
  const out = new Map<string, Placed>();
  const fill = (p: Placed, key: string | null) => {
    for (let y = p.row; y < p.row + p.r; y++) for (let x = p.col; x < p.col + p.c; x++) grid[(y - 1) * cols + (x - 1)] = key;
  };
  const fits = (col: number, row: number, s: Span) => {
    if (col + s.c - 1 > cols || row + s.r - 1 > rows) return false;
    for (let y = row; y < row + s.r; y++) for (let x = col; x < col + s.c; x++) if (grid[(y - 1) * cols + (x - 1)] !== null) return false;
    return true;
  };

  for (const f of fixed) {
    if (!fits(f.col, f.row, f)) return null;
    fill(f, f.key);
    out.set(f.key, f);
  }

  const area = items.reduce((n, i) => n + i.span.c * i.span.r, 0);
  let holes = grid.filter((g) => g === null).length - area;
  if (holes < 0) return null;
  const used = new Array(items.length).fill(false);
  let steps = 0;

  const solve = (placed: number): boolean => {
    if (++steps > 50000) return false;
    if (placed === items.length) return true;
    const at = grid.indexOf(null);
    if (at === -1) return false;
    const col = (at % cols) + 1;
    const row = Math.floor(at / cols) + 1;
    // The earliest unused work that fits here keeps the wall close to project order.
    for (let i = 0; i < items.length; i++) {
      if (used[i] || !fits(col, row, items[i].span)) continue;
      const p = { col, row, ...items[i].span };
      used[i] = true;
      fill(p, items[i].key);
      out.set(items[i].key, p);
      if (solve(placed + 1)) return true;
      used[i] = false;
      fill(p, null);
      out.delete(items[i].key);
    }
    // Otherwise leave this cell empty, if the wall has a spare cell.
    if (holes > 0) {
      holes--;
      grid[at] = "";
      if (solve(placed)) return true;
      grid[at] = null;
      holes++;
    }
    return false;
  };

  return solve(0) ? out : null;
}
