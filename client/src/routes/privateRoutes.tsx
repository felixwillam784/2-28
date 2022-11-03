import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context';
import { LoginProtected, PrivateType, UserContextTypeWithDispatch } from '../interfaces';

function ProtectedRoute({ children, roles }:PrivateType) {
  const { pathname } = useLocation(); // to redirect location
  const { userInfo }:UserContextTypeWithDispatch = useContext(UserContext);

  if (userInfo?.role !== roles) {
    if (roles === 'admin') {
      return <Navigate to="/admin/login" replace state={{ currentLocation: pathname }} />;
    }
    return <Navigate to="/login" replace state={{ currentLocation: pathname }} />;
  }

  return children;
}
function LoginProtectedRoute({ children }:LoginProtected) {
  const { userInfo }: UserContextTypeWithDispatch = useContext(UserContext);
  if (userInfo) {
    if (userInfo?.role === 'user') {
      return <Navigate to="/" replace />;
    } if (userInfo?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
  }
  return children;
}
export { ProtectedRoute, LoginProtectedRoute };
