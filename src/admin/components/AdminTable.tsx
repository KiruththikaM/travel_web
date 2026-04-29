import React from 'react';

interface Column {
  header: string;
  accessor: string;
  render?: (item: any) => React.ReactNode;
}

interface AdminTableProps {
  title: string;
  columns: Column[];
  data: any[];
}

const AdminTable: React.FC<AdminTableProps> = ({ title, columns, data }) => {
  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-[24px] p-8 shadow-[0_8px_32px_rgba(31,38,135,0.05)] border border-white/40 overflow-x-auto">
      <h2 className="text-xl font-extrabold text-slate-800 mb-6">{title}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b border-slate-100">
            {columns.map((col, idx) => (
              <th key={idx} className="p-4 px-2.5 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIdx) => (
            <tr key={rowIdx} className="border-b border-slate-50/50 hover:bg-slate-50/30 transition-colors">
              {columns.map((col, colIdx) => (
                <TableCell key={colIdx} item={item} column={col} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableCell = ({ item, column }: { item: any; column: Column }) => {
  return (
    <td className="p-5 px-2.5 text-sm text-slate-700">
      {column.render ? column.render(item) : item[column.accessor]}
    </td>
  );
};

export default AdminTable;
