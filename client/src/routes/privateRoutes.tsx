import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context';
import { PrivateType, UserContextTypeWithDispatch } from '../interfaces';

function ProtectedRoute({ children, roles }:PrivateType) {
  const { pathname } = useLocation(); // to redirect location
  const { userInfo }:UserContextTypeWithDispatch = useContext(UserContext);

  console.log({ userInfo, roles });

  if (userInfo?.role !== roles) {
    if (roles === 'admin') {
      return <Navigate to="/admin/login" replace state={{ currentLocation: pathname }} />;
    }
    return <Navigate to="/login" replace state={{ currentLocation: pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
