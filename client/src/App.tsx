import { Outlet } from 'react-router-dom';
import UserInfoProvider from './context';

function App() {
  return (
    <div>
      <UserInfoProvider>
        <Outlet />
      </UserInfoProvider>
    </div>
  );
}

export default App;
