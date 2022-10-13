import { BiCategory } from 'react-icons/bi';
import { CgLogOut } from 'react-icons/cg';
import { FiHome, FiSettings, FiTrello, FiUsers } from 'react-icons/fi';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function CustonLink({ to, children, ...props }: any) {
  const resolvePath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvePath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>

        {children}
      </Link>
    </li>
  );
}

function NavBar() {
  return (
    <div className="container-dashboard-left">
      <div className='profile-info'>
        <div className='profile'>
          <p>JV</p>
        </div>
        <p className='name'>João Vitor</p>
        <p className='role'>Admin</p>
      </div>

      <ul className='menu'>
        <CustonLink to='/dashboard'>
          <FiHome size={20} color="#83879a" />
          <p>Dashboard</p>
        </CustonLink>
        <CustonLink to='/tabulacao'>
          <FiTrello size={20} color="#83879a" />
          <p>Tabulação</p>
        </CustonLink>
        <CustonLink to='/categories'>
          <BiCategory size={20} color="#83879a" />
          <p>Categorias</p>
        </CustonLink>
        <CustonLink to='/users'>
          <FiUsers size={20} color="#83879a" />
          <p>Usuários</p>
        </CustonLink>
        <CustonLink to='/settings'>
          <FiSettings size={20} color="#83879a" />
          <p>Configurações</p>
        </CustonLink>
      </ul>

      <div className='logout'>
        <Link to={'/'}>
          <CgLogOut size={20} color="#83879a" />
          <p>Sair</p>
        </Link>
      </div>

    </div>
  );
}

export { NavBar };

