import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DesktopNav from './menu/DesktopNav';
import MobileMenu from './menu/MobileMenu';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [open, setOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
    setOpen(false);
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-xl font-bold text-green-600">
          Trueque
        </Link>

        {/* Desktop */}
        <div className="hidden md:block">
          <DesktopNav token={token} onLogout={handleLogout} />
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <MobileMenu
            open={open}
            setOpen={setOpen}
            token={token}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}