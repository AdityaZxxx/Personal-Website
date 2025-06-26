// components/TableComponent.tsx

interface TableValue {
  rows: {
    _key: string;
    cells: string[];
  }[];
}

export function TableComponent({ value }: { value: TableValue }) {
  const { rows } = value;
  if (!rows || rows.length === 0) {
    return null;
  }

  // Ambil baris pertama sebagai header
  const headerRow = rows[0];
  // Ambil sisa baris sebagai body
  const bodyRows = rows.slice(1);

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-800 shadow-md">
      <table className="min-w-full divide-y divide-slate-700 text-sm">
        <thead className="bg-slate-900/50">
          <tr>
            {headerRow.cells.map((cell, index) => (
              <th
                key={index}
                scope="col"
                className="px-4 py-3 text-left font-semibold text-slate-200"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900">
          {bodyRows.map((row) => (
            <tr
              key={row._key}
              className="hover:bg-slate-800/50 transition-colors"
            >
              {row.cells.map((cell, index) => (
                <td key={index} className="px-4 py-3 text-slate-300">
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
