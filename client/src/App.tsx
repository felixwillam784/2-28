import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { UserInfoProvider, SnackBarProvider } from './contexts';

function App() {
  return (
    <div>
      <SnackBarProvider>
        <UserInfoProvider>
          <NavBar />
          <Outlet />
        </UserInfoProvider>
      </SnackBarProvider>
    </div>
  );
}

export default App;
