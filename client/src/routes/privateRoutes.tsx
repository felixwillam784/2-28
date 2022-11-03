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
    let path = '/';
    if (userInfo?.role === 'user') {
      path = '/';
      return <Navigate to={path} replace />;
    } if (userInfo?.role === 'admin') {
      path = '/admin';
      return <Navigate to={path} replace />;
    }
  }
  return children;
}
export { ProtectedRoute, LoginProtectedRoute };
