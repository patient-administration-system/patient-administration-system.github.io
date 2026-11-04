// Reads the generated measures table out of spec/14-implementation-status.md in the main repository.
export function parseStatus(markdown) {
  const block = markdown.match(/<!-- status:begin -->([\s\S]*?)<!-- status:end -->/);
  if (!block) throw new Error("no status block found");
  const measures = {};
  for (const line of block[1].split("\n")) {
    const row = line.match(/^\|\s*(.+?)\s*\|\s*(\d+)\s*\|$/);
    if (row) measures[row[1].replaceAll("`", "")] = Number(row[2]);
  }
  if (Object.keys(measures).length === 0) throw new Error("status block has no rows");
  return measures;
}
