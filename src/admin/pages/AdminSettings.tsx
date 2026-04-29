import AdminLayout from '../components/AdminLayout';

const AdminSettings = () => {
    return (
        <AdminLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 m-0 tracking-tight">Settings</h1>
                <p className="text-slate-500 mt-2 text-base font-medium">Configure your dashboard preferences.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-lg rounded-[24px] p-8 border border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.05)]">
                <h3 className="text-lg font-extrabold text-slate-800 mb-6 uppercase tracking-wider text-[11px] text-slate-400">General Preferences</h3>
                <div className="grid gap-2">
                    <div className="flex justify-between items-center py-4 border-b border-slate-100 px-1">
                        <span className="font-semibold text-slate-700">Email Notifications</span>
                        <input type="checkbox" className="w-5 h-5 accent-indigo-600 rounded-lg" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-slate-100 px-1">
                        <span className="font-semibold text-slate-700">System Maintenance Mode </span>
                        <input type="checkbox" className="w-5 h-5 accent-indigo-600 rounded-lg" />
                    </div>
                    <div className="flex justify-between items-center py-4 px-1">
                        <span className="font-semibold text-slate-700">Dashboard Dark Theme </span>
                        <input type="checkbox" className="w-5 h-5 accent-indigo-600 rounded-lg" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
