import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import UserInfoProvider from './context';

function App() {
  return (
    <div>
      <UserInfoProvider>
        <NavBar />
        <Outlet />
      </UserInfoProvider>
    </div>
  );
}

export default App;
