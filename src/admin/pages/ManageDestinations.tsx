import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/Store';
import {
  fetchDestinations, addDestination, updateDestination, deleteDestination,
  type Destination,
} from '../../store/slices/destinationsSlice';
import AdminLayout from '../components/AdminLayout';
import AdminTable from '../components/AdminTable';
import { Box } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

const ratingLabels: Record<number, string> = {
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
      <Box sx={{ fontSize: 13, color: 'text.secondary', minWidth: 70 }}>
        {ratingLabels[hover !== -1 ? hover : value]}
      </Box>
    </Box>
  );
};


const inputSx = {
  width: '100%', px: 2, py: 1.5, borderRadius: 2,
  border: '1px solid', borderColor: 'divider',
  bgcolor: 'background.default', color: 'text.primary',
  fontSize: 14, outline: 'none',
  '&:focus': { borderColor: '#6366f1' },
  transition: 'border-color 0.2s',
};

const ManageDestinations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: destinations, status } = useSelector((state: RootState) => state.destinations);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', location: '', price: '', rating: '4.5', image: '' });

  useEffect(() => {
    if (status === 'idle' && destinations.length === 0) dispatch(fetchDestinations());
  }, [dispatch, status, destinations.length]);

  const handleOpenAdd = () => {
    setIsEditMode(false); setEditingId(null);
    setFormData({ name: '', location: '', price: '', rating: '4.5', image: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (item: Destination) => {
    setIsEditMode(true); setEditingId(item.id);
    setFormData({ name: item.name, location: item.location, price: item.price.toString(), rating: item.rating.toString(), image: item.image });
    setShowModal(true);
  };

  const handleOpenDelete = (id: string) => { setItemToDelete(id); setDeleteConfirmOpen(true); };

  const handleDeleteConfirm = () => {
    if (itemToDelete) dispatch(deleteDestination(itemToDelete));
    setDeleteConfirmOpen(false); setItemToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && editingId) {
      dispatch(updateDestination({ ...formData, id: editingId, price: Number(formData.price), rating: Number(formData.rating) }));
    } else {
      dispatch(addDestination({ ...formData, id: `D${Date.now()}`, price: Number(formData.price), rating: Number(formData.rating) }));
    }
    setShowModal(false);
    setFormData({ name: '', location: '', price: '', rating: '4.5', image: '' });
  };

  const columns = [
    {
      header: 'Package', accessor: 'name',
      render: (item: Destination) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box component="img" src={item.image} alt={item.name} sx={{ width: 48, height: 48, borderRadius: 2, objectFit: 'cover', border: '1px solid', borderColor: 'divider' }} />
          <Box>
            <Box sx={{ fontWeight: 700, color: 'text.primary', fontSize: 14 }}>{item.name}</Box>
            <Box sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 500 }}>{item.location}</Box>
          </Box>
        </Box>
      ),
    },
    {
      header: 'Price', accessor: 'price',
      render: (item: Destination) => <Box sx={{ fontWeight: 700, color: 'text.primary' }}>${item.price.toLocaleString()}</Box>,
    },
    {
      header: 'Rating', accessor: 'rating',
      render: (item: Destination) => (
        <DestinationRating value={item.rating} onChange={(val) => dispatch(updateDestination({ ...item, rating: val }))} />
      ),
    },
    {
      header: 'Actions', accessor: 'id',
      render: (item: Destination) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            component="button"
            onClick={() => handleOpenEdit(item)}
            sx={{ width: 36, height: 36, borderRadius: 2, border: '1px solid rgba(99,102,241,0.3)', color: '#6366f1', bgcolor: 'rgba(99,102,241,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', '&:hover': { bgcolor: '#6366f1', color: '#fff' } }}
          >
            <EditIcon fontSize="small" />
          </Box>
          <Box
            component="button"
            onClick={() => handleOpenDelete(item.id)}
            sx={{ width: 36, height: 36, borderRadius: 2, border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', bgcolor: 'rgba(239,68,68,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', '&:hover': { bgcolor: '#ef4444', color: '#fff' } }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </Box>
        </Box>
      ),
    },
  ];

  const FormLabel = ({ children }: { children: React.ReactNode }) => (
    <Box sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'text.disabled', mb: 1 }}>
      {children}
    </Box>
  );

  return (
    <AdminLayout>
      <Box sx={{ mb: 5, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
        <Box>
          <Box sx={{ fontSize: 28, fontWeight: 900, color: 'text.primary', letterSpacing: '-0.5px' }}>Destinations</Box>
          <Box sx={{ color: 'text.secondary', mt: 0.5, fontSize: 15 }}>Manage your travel packages and destination catalog.</Box>
        </Box>
        <Box
          component="button"
          onClick={handleOpenAdd}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            bgcolor: '#6366f1', color: '#fff', px: 3, py: 1.5,
            borderRadius: 3, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(99,102,241,0.25)',
            transition: 'all 0.2s',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(99,102,241,0.35)' },
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} /> Add New Package
        </Box>
      </Box>

      {status === 'loading' && <Box sx={{ color: 'text.secondary', fontSize: 13 }}>Loading...</Box>}
      {status === 'error'   && <Box sx={{ color: 'error.main',    fontSize: 13 }}>Failed to load destinations.</Box>}

      <AdminTable title="Package Inventory" columns={columns} data={destinations} />

      
      <Dialog open={showModal} onClose={() => setShowModal(false)} PaperProps={{ sx: { borderRadius: 4, maxWidth: 500, width: '100%' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 3, pb: 1 }}>
          <Box sx={{ fontSize: 22, fontWeight: 900, color: 'text.primary' }}>
            {isEditMode ? 'Edit Package' : 'Add New Package'}
          </Box>
          <Box
            component="button"
            onClick={() => setShowModal(false)}
            sx={{ p: 1, bgcolor: 'action.hover', color: 'text.secondary', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', '&:hover': { color: 'text.primary' } }}
          >
            <CloseIcon fontSize="small" />
          </Box>
        </Box>
        <DialogContent sx={{ px: 3, py: 1 }}>
          <Box sx={{ color: 'text.secondary', mb: 3, fontSize: 14 }}>
            {isEditMode ? 'Update the details of the travel destination.' : 'Fill in the details to create a new travel destination.'}
          </Box>
          <Box component="form" id="destination-form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2.5 }}>
            <Box>
              <FormLabel>Package Name</FormLabel>
              <Box component="input" type="text" required placeholder="e.g. Tropical Maldives Getaway" value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })} sx={inputSx} />
            </Box>
            <Box>
              <FormLabel>Location</FormLabel>
              <Box component="input" type="text" required placeholder="e.g. Male, Maldives" value={formData.location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, location: e.target.value })} sx={inputSx} />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <FormLabel>Price ($)</FormLabel>
                <Box component="input" type="number" required placeholder="1200" value={formData.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, price: e.target.value })} sx={inputSx} />
              </Box>
              <Box>
                <FormLabel>Rating</FormLabel>
                <DestinationRating value={Number(formData.rating)} onChange={(val) => setFormData({ ...formData, rating: val.toString() })} />
              </Box>
            </Box>
            <Box>
              <FormLabel>Image URL</FormLabel>
              <Box component="input" type="text" value={formData.image} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, image: e.target.value })} placeholder="https://images.unsplash.com/..." sx={inputSx} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
          <Button onClick={() => setShowModal(false)} sx={{ color: 'text.secondary', fontWeight: 700 }}>Cancel</Button>
          <Button type="submit" form="destination-form" variant="contained" sx={{ bgcolor: '#6366f1', borderRadius: 2, textTransform: 'none', fontWeight: 700, px: 3, '&:hover': { bgcolor: '#4f46e5' } }}>
            {isEditMode ? 'Update Package' : 'Create Package'}
          </Button>
        </DialogActions>
      </Dialog>

     
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} PaperProps={{ sx: { borderRadius: 4, p: 1, maxWidth: 400 } }}>
        <DialogTitle sx={{ fontWeight: 900, color: 'text.primary' }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Box sx={{ color: 'text.secondary', fontSize: 14 }}>Are you sure you want to delete this destination? This action cannot be undone.</Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ color: 'text.secondary', fontWeight: 700 }}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, px: 3 }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageDestinations;
