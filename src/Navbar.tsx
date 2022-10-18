import { BiCategory } from 'react-icons/bi';
import { CgLogOut } from 'react-icons/cg';
import { FiHome, FiList, FiPlusCircle, FiSettings, FiTrello, FiUsers } from 'react-icons/fi';
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
function SubCustonLink({ to, children, ...props }: any) {
  const resolvePath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvePath.pathname, end: true });

  return (
    <li>
      <Link to={to} {...props} className={isActive ? 'active' : ''}>
        {children}
      </Link>
      <ul>
        <CustonLink to='/home/tabulacao'>
          <FiPlusCircle size={20} color={isActive ? '#fff' : '646667'} />
          <p>Criar</p>
        </CustonLink>
        <CustonLink to='/home/list'>
          <FiList size={20} color="#646667" />
          <p>Listar</p>
        </CustonLink>
      </ul>
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


      <ul className="sidebar">
        <CustonLink to='/home/dashboard'>
          <FiHome size={20} color="#646667" />
          <p>Dashboard</p>
        </CustonLink>
        <SubCustonLink to='/home/tabulacao'>
          <FiTrello size={20} color="#646667" />
          <p>Tabulação</p>
        </SubCustonLink>
        <CustonLink to='/home/categories'>
          <BiCategory size={20} color="#646667" />
          <p>Categorias</p>
        </CustonLink>
        <CustonLink to='/home/users'>
          <FiUsers size={20} color="#646667" />
          <p>usuários</p>
        </CustonLink>
        <CustonLink to='/home/settings'>
          <FiSettings size={20} color="#646667" />
          <p>Configuração</p>
        </CustonLink>
      </ul>


      <div className='logout'>
        <Link to={'/'}>
          <CgLogOut size={20} color="#646667" />
          <p>Sair</p>
        </Link>
      </div>

    </div >
  );
}

export { NavBar };

