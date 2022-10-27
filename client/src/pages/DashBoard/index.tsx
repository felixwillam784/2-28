import { Outlet } from 'react-router-dom';
import VerticalTabs from '../../components/Tabs';

function DashBoard() {
  return (<VerticalTabs />);
}

export function DashBoardMain() {
  return (<Outlet />);
}
export default DashBoard;
