import { createBrowserRouter } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';
import Profile from '../pages/Profile';
import Car from '../pages/Car';
import Landing from '../pages/Landing';
import DashBoard, { DashBoardMain } from '../pages/DashBoard';
import NotFound from '../pages/Errors/notFound';
import Error from '../pages/Errors/Error';
import App from '../App';
import Cars from '../pages/Cars';
import CheckCar from '../pages/CheckCar';
import { ProtectedRoute, LoginProtectedRoute } from './privateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: '/login',
        element: <LoginProtectedRoute><Login /></LoginProtectedRoute>
        ,
      },
      {
        path: '/signup',
        element: <LoginProtectedRoute><SignUp /></LoginProtectedRoute>
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
        path: 'admin',
        element: <ProtectedRoute roles="admin"><DashBoardMain /></ProtectedRoute>,
        children: [
          { index: true, element: <DashBoard /> },
          {
            path: 'check/:id',
            element: <CheckCar />,
          },
        ],
      },
      {
        path: 'admin/login',
        element: <LoginProtectedRoute><AdminLogin /></LoginProtectedRoute>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
