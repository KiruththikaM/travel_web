import React from 'react';
import { Box } from '@mui/material';

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
    <Box sx={{
      bgcolor: 'background.paper',
      borderRadius: 4,
      border: '1px solid', borderColor: 'divider',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    }}>
      <Box sx={{ px: 4, py: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary' }}>{title}</Box>
      </Box>
      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <Box
                  component="th"
                  key={idx}
                  sx={{
                    px: 2.5, py: 1.5,
                    textAlign: 'left',
                    fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: 1.5,
                    color: 'text.disabled',
                    borderBottom: '1px solid', borderColor: 'divider',
                    bgcolor: 'action.hover',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col.header}
                </Box>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIdx) => (
              <Box
                component="tr"
                key={rowIdx}
                sx={{
                  borderBottom: '1px solid', borderColor: 'divider',
                  transition: 'background 0.15s',
                  '&:last-child': { borderBottom: 'none' },
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                {columns.map((col, colIdx) => (
                  <Box
                    component="td"
                    key={colIdx}
                    sx={{ px: 2.5, py: 2, fontSize: 14, color: 'text.primary' }}
                  >
                    {col.render ? col.render(item) : item[col.accessor]}
                  </Box>
                ))}
              </Box>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default AdminTable;
