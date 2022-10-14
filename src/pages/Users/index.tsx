import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { TableApp } from '../../components/TableApp/TableApp';
import './styles.css';

function Users() {
  return (
    <div className="container-users">
      <div className="breadcrumb">
        <Link to={'/home/dashboard'}>Dashboard</Link>
        <IoIosArrowForward size={16} color='#7f808b' />
        <Link to={'/home/users'}>Usuários</Link>
      </div>
      <h1>Usuários</h1>
      <TableApp />
    </div>
  );
}

export { Users };

