import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import DestinationsPage from './pages/DestinationsPage'
import DestinationDetail from './pages/DestinationDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Book from './pages/Book'
import Profile from './pages/Profile'
import DashboardOverview from './admin/pages/DashboardOverview'
import ManageDestinations from './admin/pages/ManageDestinations'
import ManageBookings from './admin/pages/ManageBookings'
import ManageUsers from './admin/pages/ManageUsers'
import AdminSettings from './admin/pages/AdminSettings'
import AdminCalendar from './admin/pages/AdminCalendar'
import AdminMessages from './admin/pages/AdminMessages'
import ProtectedRoute from './components/ProtectedRoute'
import Blog from './pages/Blog'

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <main>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
         

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Blog/>} />
        
          
          <Route path="/admin" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />
          <Route path="/admin/destinations" element={<ProtectedRoute><ManageDestinations /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><ManageBookings /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/calendar" element={<ProtectedRoute><AdminCalendar /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        </Routes>
      
        
      </LayoutWrapper>
    </BrowserRouter>
  )
}

export default App

