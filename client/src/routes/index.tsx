import { createBrowserRouter } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';
import Profile from '../pages/Profile';
import Car from '../pages/Car';
import Landing from '../pages/Landing';
import DashBoard from '../pages/DashBoard';
import NotFound from '../pages/Errors/notFound';
import Error from '../pages/Errors/Error';
import App from '../App';
import Cars from '../pages/Cars';
import ProtectedRoute from './privateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: '/login',
        element:
  <Login />
        ,
      },
      {
        path: '/signup',
        element:
  <SignUp />
        ,
      },
      {
        path: '/profile',
        element: <ProtectedRoute roles="user"><Profile /></ProtectedRoute>,
      },
      {
        path: '/cars',
        element: <Cars />,
      },
      {
        path: '/car/:id',
        element: <Car />,
      },
      {
        path: '/admin',
        element: <ProtectedRoute roles="admin"><DashBoard /></ProtectedRoute>,
      },
      {

        path: '/admin/login',
        element:
  <AdminLogin />
        ,
      },

    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
