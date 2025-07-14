// components/ProtectedRoute.jsx

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user); 

  // fallback to localStorage if needed
  const isLoggedIn = user || localStorage.getItem('user');

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
