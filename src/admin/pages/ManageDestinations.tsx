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
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Rating, MenuItem, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

  useEffect(() => {
    if (status === 'idle' && destinations.length === 0) dispatch(fetchDestinations());
  }, [dispatch, status, destinations.length]);

  const urlSchema = Yup.string()
    .url('Must be a valid URL (e.g. https://...)')
    .nullable();

  const packageSchema = Yup.object({
    name: Yup.string().trim()
      .matches(/^[a-zA-Z0-9\s,.\-']+$/, 'Name must not contain special characters.')
      .test('not-special-only', 'Name must contain at least one letter or number.', val => !!val && /[a-zA-Z0-9]/.test(val))
      .min(2, 'Name must be at least 2 characters.').max(100, 'Name too long.').required('Package name is required.'),
    location: Yup.string().trim()
      .matches(/^[a-zA-Z0-9\s,.\-']+$/, 'Location must not contain special characters.')
      .test('not-special-only', 'Location must contain at least one letter or number.', val => !!val && /[a-zA-Z0-9]/.test(val))
      .min(2, 'Location must be at least 2 characters.').max(100, 'Location too long.').required('Location is required.'),
    tagline: Yup.string().trim()
      .matches(/^[a-zA-Z0-9\s,.\-'!]+$/, 'Tagline must not contain special characters.')
      .test('not-special-only', 'Tagline must contain at least one letter or number.', val => !!val && /[a-zA-Z0-9]/.test(val))
      .min(3, 'Tagline must be at least 3 characters.').max(120, 'Tagline too long.').required('Tagline is required.'),
    description: Yup.string().trim()
      .test('not-special-only', 'Description must contain meaningful text.', val => !!val && /[a-zA-Z0-9]/.test(val))
      .min(10, 'Description must be at least 10 characters.').max(1000, 'Description too long.').required('Description is required.'),
    category: Yup.string().required('Category is required.'),
    price: Yup.number().typeError('Price must be a number.').min(1, 'Price must be at least $1.').required('Price is required.'),
    rating: Yup.number().min(0.5).max(5).required(),
    image: Yup.string().url('Must be a valid URL (e.g. https://...)').required('Main image URL is required.'),
    gallery0: urlSchema, gallery1: urlSchema, gallery2: urlSchema, gallery3: urlSchema, gallery4: urlSchema,
  });

  const emptyValues = {
    name: '', location: '', tagline: '', description: '', category: 'Heritage',
    price: '' as unknown as number, rating: 4.5, image: '',
    gallery0: '', gallery1: '', gallery2: '', gallery3: '', gallery4: '',
  };

  const formik = useFormik({
    initialValues: emptyValues,
    validationSchema: packageSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      const gallery = [values.gallery0, values.gallery1, values.gallery2, values.gallery3, values.gallery4].filter(Boolean) as string[];
      const base = {
        name: values.name, location: values.location, tagline: values.tagline,
        description: values.description, category: values.category,
        price: Number(values.price), rating: values.rating,
        image: values.image, gallery,
      };
      if (isEditMode && editingId) {
        dispatch(updateDestination({ ...base, id: editingId }));
      } else {
        dispatch(addDestination({ ...base, id: `D${Date.now()}` }));
      }
      setShowModal(false);
      resetForm();
    },
  });

  const handleOpenAdd = () => {
    setIsEditMode(false); setEditingId(null);
    formik.resetForm({ values: emptyValues });
    setShowModal(true);
  };

  const handleOpenEdit = (item: Destination) => {
    setIsEditMode(true); setEditingId(item.id);
    formik.resetForm({
      values: {
        name: item.name, location: item.location, tagline: item.tagline,
        description: item.description, category: item.category,
        price: item.price, rating: item.rating, image: item.image,
        gallery0: item.gallery[0] ?? '', gallery1: item.gallery[1] ?? '',
        gallery2: item.gallery[2] ?? '', gallery3: item.gallery[3] ?? '',
        gallery4: item.gallery[4] ?? '',
      },
    });
    setShowModal(true);
  };

  const handleOpenDelete = (id: string) => { setItemToDelete(id); setDeleteConfirmOpen(true); };

  const handleDeleteConfirm = () => {
    if (itemToDelete) dispatch(deleteDestination(itemToDelete));
    setDeleteConfirmOpen(false); setItemToDelete(null);
  };

 
  const fe = (field: keyof typeof formik.values) =>
    formik.touched[field] && formik.errors[field] ? String(formik.errors[field]) : '';

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
      header: 'Category', accessor: 'category',
      render: (item: Destination) => (
        <Box sx={{ px: 1.5, py: 0.5, borderRadius: 2, bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1', fontSize: 12, fontWeight: 700, display: 'inline-block' }}>
          {item.category}
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

      
      <Dialog open={showModal} onClose={() => setShowModal(false)} PaperProps={{ sx: { borderRadius: 4, maxWidth: 600, width: '100%', maxHeight: '90vh' } }}>
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
          <Box component="form" id="destination-form" onSubmit={formik.handleSubmit} sx={{ display: 'grid', gap: 2.5 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <FormLabel>Package Name</FormLabel>
                <Box component="input" type="text" placeholder="e.g. Tropical Maldives Getaway"
                  name="name" value={formik.values.name}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  sx={{ ...inputSx, borderColor: fe('name') ? '#ef4444' : 'divider' }} />
                {fe('name') && <Box sx={{ color: '#ef4444', fontSize: 11, mt: 0.5 }}>{fe('name')}</Box>}
              </Box>
              <Box>
                <FormLabel>Location</FormLabel>
                <Box component="input" type="text" placeholder="e.g. Male, Maldives"
                  name="location" value={formik.values.location}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  sx={{ ...inputSx, borderColor: fe('location') ? '#ef4444' : 'divider' }} />
                {fe('location') && <Box sx={{ color: '#ef4444', fontSize: 11, mt: 0.5 }}>{fe('location')}</Box>}
              </Box>
            </Box>
            <Box>
              <FormLabel>Tagline</FormLabel>
              <Box component="input" type="text" placeholder="e.g. Paradise on Earth"
                name="tagline" value={formik.values.tagline}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                sx={{ ...inputSx, borderColor: fe('tagline') ? '#ef4444' : 'divider' }} />
              {fe('tagline') && <Box sx={{ color: '#ef4444', fontSize: 11, mt: 0.5 }}>{fe('tagline')}</Box>}
            </Box>
            <Box>
              <FormLabel>Description</FormLabel>
              <Box component="textarea" rows={3} placeholder="Describe the destination experience..."
                name="description" value={formik.values.description}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                sx={{ ...inputSx, resize: 'vertical', fontFamily: 'inherit', borderColor: fe('description') ? '#ef4444' : 'divider' }} />
              {fe('description') && <Box sx={{ color: '#ef4444', fontSize: 11, mt: 0.5 }}>{fe('description')}</Box>}
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
              <Box>
                <FormLabel>Category</FormLabel>
                <Select size="small" fullWidth
                  name="category" value={formik.values.category}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  sx={{ borderRadius: 2, fontSize: 14 }}
                >
                  {['Heritage', 'Nature', 'Beach', 'Culture', 'Wildlife'].map(c => (
                    <MenuItem key={c} value={c} sx={{ fontSize: 13 }}>{c}</MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel>Price ($)</FormLabel>
                <Box component="input" type="number" placeholder="1200"
                  name="price" value={formik.values.price}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  sx={{ ...inputSx, borderColor: fe('price') ? '#ef4444' : 'divider' }} />
                {fe('price') && <Box sx={{ color: '#ef4444', fontSize: 11, mt: 0.5 }}>{fe('price')}</Box>}
              </Box>
              <Box>
                <FormLabel>Rating</FormLabel>
                <DestinationRating value={formik.values.rating} onChange={(val) => formik.setFieldValue('rating', val)} />
              </Box>
            </Box>
            <Box>
              <FormLabel>Main Image URL</FormLabel>
              <Box component="input" type="text" placeholder="https://images.unsplash.com/..."
                name="image" value={formik.values.image}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                sx={{ ...inputSx, borderColor: fe('image') ? '#ef4444' : 'divider' }} />
              {fe('image') && <Box sx={{ color: '#ef4444', fontSize: 11, mt: 0.5 }}>{fe('image')}</Box>}
            </Box>
            <Box>
              <FormLabel>Gallery Images (up to 5 URLs)</FormLabel>
              <Box sx={{ display: 'grid', gap: 1.5 }}>
                {([0, 1, 2, 3, 4] as const).map((i) => {
                  const key = `gallery${i}` as keyof typeof formik.values;
                  return (
                    <Box key={i}>
                      <Box component="input" type="text" placeholder={`Gallery image ${i + 1} URL`}
                        name={key} value={formik.values[key]}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                        sx={{ ...inputSx, borderColor: fe(key) ? '#ef4444' : 'divider' }} />
                      {fe(key) && <Box sx={{ color: '#ef4444', fontSize: 11, mt: 0.5 }}>{fe(key)}</Box>}
                    </Box>
                  );
                })}
              </Box>
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
