import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export function Layout() {
  return (
    <div className="auto-app-layout">
      <Navbar />
      <Outlet />
    </div>
  );
}
