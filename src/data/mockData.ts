export interface Booking {
  id: string;
  user: string;
  destination: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  price: number;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  rating: number;
}

export const mockBookings: Booking[] = [
  { id: 'BK001', user: 'Anitha Kumar', destination: 'Bali, Indonesia', date: '2024-05-15', status: 'Confirmed', price: 1200 },
  { id: 'BK002', user: 'Rajesh Khanna', destination: 'Paris, France', date: '2024-06-02', status: 'Pending', price: 2500 },
  { id: 'BK003', user: 'Sneha Rao', destination: 'Tokyo, Japan', date: '2024-04-28', status: 'Confirmed', price: 1800 },
  { id: 'BK004', user: 'Vijay Sethu', destination: 'London, UK', date: '2024-07-20', status: 'Cancelled', price: 3000 },
  { id: 'BK005', user: 'Meera Jasmine', destination: 'New York, USA', date: '2024-08-10', status: 'Confirmed', price: 2200 },
];

export const mockDestinations: Destination[] = [
  { id: 'D001', name: 'Paradise Beach', location: 'Puducherry, India', price: 500, rating: 4.5, image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b' },
  { id: 'D002', name: 'Eiffel Tower', location: 'Paris, France', price: 1500, rating: 4.8, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f' },
  { id: 'D003', name: 'Swiss Alps', location: 'Zermatt, Switzerland', price: 2000, rating: 4.9, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4' },
];

export const adminStats = {
  totalRevenue: 54000,
  activeUsers: 1250,
  pendingBookings: 12,
  totalTrips: 45
};
