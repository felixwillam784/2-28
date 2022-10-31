import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context';
import { PrivateType, UserContextTypeWithDispatch } from '../interfaces';

function ProtectedRoute({ children, role }:PrivateType) {
  const { userInfo }:UserContextTypeWithDispatch = useContext(UserContext);

  if (userInfo?.role !== role) {
    if (role === 'admin') {
      return <Navigate to="/admin/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
