import { useEffect, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { CgLogOut } from 'react-icons/cg';
import { FiHome, FiList, FiPlusCircle, FiSettings, FiTrello, FiUsers } from 'react-icons/fi';
import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { api } from './services/api';

interface IToken {
  email: string;
  exp: number;
  sub: string;
}

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
        <CustonLink to='/tabulacao'>
          <FiPlusCircle size={20} color={isActive ? '#fff' : '646667'} />
          <p>Criar</p>
        </CustonLink>
        <CustonLink to='/list'>
          <FiList size={20} color="#646667" />
          <p>Listar</p>
        </CustonLink>
      </ul>
    </li>
  );
}

function NavBar() {
  const [id, setId] = useState('');
  const [initials, setInitials] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const acessToken = localStorage.getItem('accessToken');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
    }
  };

  const token = localStorage.getItem('id');

  function initialsName(name: string) {
    const arrayName = name.split(' ');
    const first = arrayName[0][0];
    const second = arrayName[1][0];
    const result = `${first}${second}`;

    setInitials(result);
  }

  useEffect(() => {
    setId(token!);

    api.get(`/users/find-one/${id}`, authorization)
      .then(response => {
        setEmail(response.data.email);
        setName(response.data.name);
        initialsName(response.data.name);
      });
  },);

  async function logout() {
    try {
      localStorage.clear();
      navigate('/');
    } catch (erro) {
      alert('Error');
    }
  }

  return (
    <div className="container-dashboard-left">
      <div className='profile-info'>
        <div className='profile'>
          <p>{initials}</p>
        </div>
        <p className='name'>{name}</p>
        <p className='role'>{email}</p>
      </div>


      <ul className="sidebar">
        <CustonLink to='/dashboard'>
          <FiHome size={20} color="#646667" />
          <p>Dashboard</p>
        </CustonLink>
        <SubCustonLink to='/tabulacao'>
          <FiTrello size={20} color="#646667" />
          <p>Tabulação</p>
        </SubCustonLink>
        <CustonLink to='/categories'>
          <BiCategory size={20} color="#646667" />
          <p>Categorias</p>
        </CustonLink>
        <CustonLink to='/users'>
          <FiUsers size={20} color="#646667" />
          <p>usuários</p>
        </CustonLink>
        <CustonLink to='/settings'>
          <FiSettings size={20} color="#646667" />
          <p>Configuração</p>
        </CustonLink>
      </ul>


      <div className='logout'>
        <Link onClick={() => logout()} to={'/'}>
          <CgLogOut size={20} color="#646667" />
          <p>Sair</p>
        </Link>
      </div>

    </div >
  );
}

export { NavBar };

function jwt_decode(token: string): IToken {
  throw new Error('Function not implemented.');
}

