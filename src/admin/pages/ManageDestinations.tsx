import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import AdminTable from '../components/AdminTable';
import { mockDestinations } from '../../data/mockData';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

const ManageDestinations = () => {
  const [showModal, setShowModal] = useState(false);
  const [destinations, setDestinations] = useState(mockDestinations);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
  });

  const columns = [
    { 
      header: 'Package', 
      accessor: 'name',
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover shadow-sm border border-slate-100" />
          <div>
            <div className="font-bold text-slate-900">{item.name}</div>
            <div className="text-[11px] text-slate-500 font-medium">{item.location}</div>
          </div>
        </div>
      )
    },
    { 
      header: 'Price', 
      accessor: 'price',
      render: (item: any) => (
        <span className="font-bold text-slate-900">
          ${item.price.toLocaleString()}
        </span>
      )
    },
    { 
      header: 'Rating', 
      accessor: 'rating',
      render: (item: any) => (
        <div className="flex items-center gap-1 text-amber-500 font-bold">
          ⭐ {item.rating}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: () => (
        <div className="flex gap-2">
          <button className="flex items-center justify-center w-9 h-9 border border-indigo-500/20 text-indigo-600 bg-indigo-50/50 rounded-xl transition-all hover:bg-indigo-600 hover:text-white">
            <EditIcon fontSize="small" />
          </button> 
          <button className="flex items-center justify-center w-9 h-9 border border-rose-500/10 text-rose-500 bg-rose-50/50 rounded-xl transition-all hover:bg-rose-500 hover:text-white">
            <DeleteOutlineIcon fontSize="small" />
          </button>
        </div>
      )
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPackage = {
      ...formData,
      id: `D00${destinations.length + 1}`,
      price: Number(formData.price),
      rating: Number(formData.rating)
    };
    setDestinations([newPackage, ...destinations]);
    setShowModal(false);
    setFormData({
      name: '',
      location: '',
      price: '',
      rating: '4.5',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    });
  };

  return (
    <AdminLayout>
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 m-0 tracking-tight">
            Destinations
          </h1>
          <p className="text-slate-500 mt-2 text-base font-medium">
            Manage your travel packages and destination catalog.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-[0_10px_20px_rgba(79,70,229,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_25px_rgba(79,70,229,0.3)]"
        >
          <AddIcon />
          Add New Package
        </button>
      </div>

      <AdminTable title="Package Inventory" columns={columns} data={destinations} />

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
            >
              <CloseIcon fontSize="small" />
            </button>

            <h2 className="text-2xl font-black text-slate-900 mb-2">Add New Package</h2>
            <p className="text-slate-500 mb-8 text-sm font-medium">Fill in the details to create a new travel destination.</p>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Package Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Tropical Maldives Getaway"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Location</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Male, Maldives"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="1200"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Rating</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Image URL</label>
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                />
              </div>
              
              <button 
                type="submit" 
                className="mt-4 bg-indigo-600 text-white py-4 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-700 active:scale-95"
              >
                Create Package
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageDestinations;
