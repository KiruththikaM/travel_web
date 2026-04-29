
import AdminLayout from '../components/AdminLayout';
import AdminTable from '../components/AdminTable';

const ManageUsers = () => {
    const mockUsers = [
        { id: 'U001', name: 'John Doe', email: 'john@example.com', role: 'Premium' },
        { id: 'U002', name: 'Jane Smith', email: 'jane@example.com', role: 'Basic' },
        { id: 'U003', name: 'Bob Johnson', email: 'bob@example.com', role: 'Premium' },
    ];

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
            <AdminTable title="System Users" columns={columns} data={mockUsers} />
        </AdminLayout>
    );
};

export default ManageUsers;
