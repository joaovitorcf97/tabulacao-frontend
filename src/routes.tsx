import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Categories } from './pages/Categories';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NoMatch } from './pages/NoMatch';
import { Tabulacao } from './pages/Tabulacao';
import { Users } from './pages/Users';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} >
          <Route index element={<Dashboard />} />
          <Route path="/home/dashboard" element={<Dashboard />} />
          <Route path="/home/tabulacao" element={<Tabulacao />} />
          <Route path="/home/categories" element={<Categories />} />
          <Route path="/home/users" element={<Users />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export { RoutesApp };

