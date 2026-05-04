import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/Store';
import { fetchUsers } from '../../store/slices/usersSlice';
import AdminLayout from '../components/AdminLayout';
import AdminTable from '../components/AdminTable';

const ManageUsers = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: users, status } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (status === 'idle' && users.length === 0) {
            dispatch(fetchUsers());
        }
    }, [dispatch, status, users.length]);

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role' },
    ];

    return (
        <AdminLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 m-0 tracking-tight">Manage Users</h1>
                <p className="text-slate-500 mt-2 text-base font-medium">Control user access and profiles.</p>
            </div>
            {status === 'loading' && <p className="text-slate-400 text-sm">Loading...</p>}
            {status === 'error' && <p className="text-rose-500 text-sm">Failed to load users.</p>}
            <AdminTable title="System Users" columns={columns} data={users} />
        </AdminLayout>
    );
};

export default ManageUsers;
