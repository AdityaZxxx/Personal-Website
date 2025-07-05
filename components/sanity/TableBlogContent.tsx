interface TableValue {
  rows: {
    _key: string;
    cells: string[];
  }[];
}

export function TableBlogContent({ value }: { value: TableValue }) {
  const { rows } = value;
  if (!rows || rows.length === 0) {
    return null;
  }

  const headerRow = rows[0];
  const bodyRows = rows.slice(1);

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-card shadow-md">
      <table className="min-w-full divide-y divide-primary text-sm">
        <thead className="bg-foreground/10">
          <tr>
            {headerRow.cells.map((cell, index) => (
              <th
                key={index}
                scope="col"
                className="px-4 py-3 text-left font-semibold text-primary"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-foreground/40 bg-background">
          {bodyRows.map((row) => (
            <tr
              key={row._key}
              className="hover:bg-foreground/5 transition-colors"
            >
              {row.cells.map((cell, index) => (
                <td key={index} className="px-4 py-3 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
