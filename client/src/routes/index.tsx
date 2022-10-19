import { createBrowserRouter } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';
import Profile from '../pages/Profile';
import Cars from '../pages/Cars';
import Car from '../pages/Car';
import Landing from '../pages/Landing';
import DashBoard from '../pages/DashBoard';
import RecentRequests from '../pages/DashBoard/RecentRequests';
import ToCheckRequests from '../pages/DashBoard/ToCheckRequests';
import NotFound from '../pages/Errors/notFound';
import Error from '../pages/Errors/Error';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/profile',
        element: <Profile />,
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
        element: <DashBoard />,
        children: [
          { index: true, element: <RecentRequests /> },
          {
            path: '/admin/login',
            element: <AdminLogin />,
          },
          {
            path: '/admin/to-check',
            element: <ToCheckRequests />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
