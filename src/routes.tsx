import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Categories } from './pages/Categories';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { NoMatch } from './pages/NoMatch';
import { Tabulacao } from './pages/Tabulacao';
import { Users } from './pages/Users';

function PrivateRoutes() {
  const acessToken = localStorage.getItem('accessToken');
  let auth = { 'accessToken': acessToken };

  return (
    auth.accessToken ? <Outlet /> : <Navigate to='/' />
  );
}

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />} >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tabulacao" element={<Tabulacao />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/users" element={<Users />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export { RoutesApp };

