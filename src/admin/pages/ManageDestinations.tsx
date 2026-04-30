import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import AdminTable from '../components/AdminTable';
import { mockDestinations } from '../../data/mockData';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Rating, Box } from '@mui/material';

const ratingLabels: { [index: string]: string } = {
  0.5: 'Useless', 1: 'Useless+', 1.5: 'Poor', 2: 'Poor+',
  2.5: 'Ok', 3: 'Ok+', 3.5: 'Good', 4: 'Good+', 4.5: 'Excellent', 5: 'Excellent+',
};

const DestinationRating = ({ value, onChange }: { value: number; onChange?: (val: number) => void }) => {
  const [hover, setHover] = useState(-1);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Rating
        value={value}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        onChange={onChange ? (_e, v) => onChange(v ?? 0) : undefined}
        readOnly={!onChange}
        onChangeActive={(_e, newHover) => setHover(newHover)}
      />
      <Box sx={{ fontSize: 13, color: '#64748b', minWidth: 70 }}>
        {ratingLabels[hover !== -1 ? hover : value]}
      </Box>
    </Box>
  );
};

const ManageDestinations = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [destinations, setDestinations] = useState(mockDestinations);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    rating: '4.5',
    image: ''
  });

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      name: '',
      location: '',
      price: '',
      rating: '4.5',
      image: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item: any) => {
    setIsEditMode(true);
    setEditingId(item.id);
    setFormData({
      name: item.name,
      location: item.location,
      price: item.price.toString(),
      rating: item.rating.toString(),
      image: item.image
    });
    setShowModal(true);
  };

  const handleOpenDelete = (id: string) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      setDestinations(destinations.filter((d: any) => d.id !== itemToDelete));
    }
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

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
        <DestinationRating
          value={item.rating}
          onChange={(val) =>
            setDestinations(prev => prev.map(d => d.id === item.id ? { ...d, rating: val } : d))
          }
        />
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (item: any) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleOpenEdit(item)}
            className="flex items-center justify-center w-9 h-9 border border-indigo-500/20 text-indigo-600 bg-indigo-50/50 rounded-xl transition-all hover:bg-indigo-600 hover:text-white"
          >
            <EditIcon fontSize="small" />
          </button> 
          <button 
            onClick={() => handleOpenDelete(item.id)}
            className="flex items-center justify-center w-9 h-9 border border-rose-500/10 text-rose-500 bg-rose-50/50 rounded-xl transition-all hover:bg-rose-500 hover:text-white"
          >
            <DeleteOutlineIcon fontSize="small" />
          </button>
        </div>
      )
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && editingId) {
      const updatedDestinations = destinations.map((d: any) => {
        if (d.id === editingId) {
          return {
            ...d,
            ...formData,
            price: Number(formData.price),
            rating: Number(formData.rating)
          };
        }
        return d;
      });
      setDestinations(updatedDestinations);
    } else {
      const newPackage = {
        ...formData,
        id: `D00${destinations.length + 1}`,
        price: Number(formData.price),
        rating: Number(formData.rating)
      };
      setDestinations([newPackage, ...destinations]);
    }
    
    setShowModal(false);
    setFormData({
      name: '',
      location: '',
      price: '',
      rating: '4.5',
      image: ''
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
          onClick={handleOpenAdd}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-[0_10px_20px_rgba(79,70,229,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_25px_rgba(79,70,229,0.3)]"
        >
          <AddIcon />
          Add New Package
        </button>
      </div>

      <AdminTable title="Package Inventory" columns={columns} data={destinations} />

      <Dialog 
        open={showModal} 
        onClose={() => setShowModal(false)}
        PaperProps={{
          sx: { borderRadius: "24px", maxWidth: '500px', width: '100%' }
        }}
      >
        <div className="flex justify-between items-center px-6 pt-6 pb-2">
          <h2 className="text-2xl font-black text-slate-900 m-0">
            {isEditMode ? 'Edit Package' : 'Add New Package'}
          </h2>
          <button 
            onClick={() => setShowModal(false)}
            className="p-2 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
        <DialogContent className="px-6 py-2">
          <p className="text-slate-500 mb-6 text-sm font-medium">
            {isEditMode ? 'Update the details of the travel destination.' : 'Fill in the details to create a new travel destination.'}
          </p>
          <form id="destination-form" onSubmit={handleSubmit} className="grid gap-5">
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
                <DestinationRating
                  value={Number(formData.rating)}
                  onChange={(val) => setFormData({ ...formData, rating: val.toString() })}
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
                placeholder="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions className="px-6 pb-6 pt-2">
          <Button onClick={() => setShowModal(false)} sx={{ color: '#64748b', fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="destination-form"
            variant="contained" 
            sx={{ 
              bgcolor: '#4f46e5', 
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3,
              boxShadow: '0 10px 20px rgba(79,70,229,0.3)',
              '&:hover': { bgcolor: '#4338ca' }
            }}
          >
            {isEditMode ? 'Update Package' : 'Create Package'}
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          sx: { borderRadius: "24px", p: 1, maxWidth: 400 }
        }}
      >
        <DialogTitle className="text-xl font-black text-slate-900 pb-1">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <p className="text-slate-500 font-medium text-sm mt-2">
            Are you sure you want to delete this destination? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions className="px-6 pb-4">
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ color: '#64748b', fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            variant="contained" 
            color="error" 
            sx={{ 
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3,
              boxShadow: '0 10px 20px rgba(225,29,72,0.2)',
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageDestinations;
