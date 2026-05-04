import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store/Store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
