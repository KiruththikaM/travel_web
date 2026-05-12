import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/Store';
import { fetchUsers } from '../../store/slices/usersSlice';
import AdminLayout from '../components/AdminLayout';
import AdminTable from '../components/AdminTable';
import { Box } from '@mui/material';

const ManageUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: users, status } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (status === 'idle' && users.length === 0) dispatch(fetchUsers());
  }, [dispatch, status, users.length]);

  const columns = [
    { header: 'ID',    accessor: 'id'    },
    { header: 'Name',  accessor: 'name'  },
    { header: 'Email', accessor: 'email' },
    { header: 'Role',  accessor: 'role'  },
  ];

  return (
    <AdminLayout>
      <Box sx={{ mb: 5 }}>
        <Box sx={{ fontSize: 28, fontWeight: 900, color: 'text.primary', letterSpacing: '-0.5px' }}>Manage Users</Box>
        <Box sx={{ color: 'text.secondary', mt: 0.5, fontSize: 15 }}>Control user access and profiles.</Box>
      </Box>
      {status === 'loading' && <Box sx={{ color: 'text.secondary', fontSize: 13 }}>Loading...</Box>}
      {status === 'error'   && <Box sx={{ color: 'error.main',    fontSize: 13 }}>Failed to load users.</Box>}
      <AdminTable title="System Users" columns={columns} data={users} />
    </AdminLayout>
  );
};

export default ManageUsers;
