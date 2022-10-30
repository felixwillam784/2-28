import { useContext } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context';
import { UserContextTypeWithDispatch } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PrivateRouter({ role, children }:any) {
  const { userInfo }:UserContextTypeWithDispatch = useContext(UserContext);
  // const navigate = useNavigate();

  if (role !== userInfo?.role) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
export default PrivateRouter;
