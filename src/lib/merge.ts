/** Pure matching rules behind the bulk-import demo. Certain matches merge, uncertain ones wait for a person. */

export type Row = { name: string; email?: string; company?: string };

export type MergeResult = {
  created: Row[];
  merged: { into: Row; from: Row }[];
  review: Row[];
};

export function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));
  return groups;
}

/**
 * An email match is certain, so the rows merge.
 * A name match without an email is only a hint, so the row goes to review rather than being guessed.
 */
export function mergeRows(existing: Row[], incoming: Row[]): MergeResult {
  const result: MergeResult = { created: [], merged: [], review: [] };
  const byEmail = new Map<string, Row>();
  const byName = new Map<string, Row>();

  const remember = (row: Row) => {
    if (row.email) byEmail.set(row.email.toLowerCase(), row);
    byName.set(normalise(row.name), row);
  };
  existing.forEach(remember);

  for (const row of incoming) {
    const emailMatch = row.email ? byEmail.get(row.email.toLowerCase()) : undefined;
    if (emailMatch) {
      result.merged.push({ into: emailMatch, from: row });
      continue;
    }
    if (!row.email && byName.has(normalise(row.name))) {
      result.review.push(row);
      continue;
    }
    result.created.push(row);
    remember(row);
  }
  return result;
}
