import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './Navbar';
import { Categories } from './pages/Categories';
import { Dashboard } from './pages/Dashboard';

import { Login } from './pages/Login';
import { Users } from './pages/Users';

function RoutesApp() {
  return (
    <BrowserRouter>
      <div className='container'>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export { RoutesApp };

