import moment from "moment";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ReactLoading from "react-loading";

import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { NavBar } from "../../Navbar";
import { api } from "../../services/api";

import './styles.css';

interface IUser {
  name: string;
  email: string;
}

interface Iclient {
  id: string;
  name: string;
  phone: string;
  category: ICategory;
  user: IUser;
  created_at: string;
}

interface ICategory {
  name: string;
  cor: String;
}

interface IUser {
  name: string;
}

function ListTabulacao() {
  const [user, setUser] = useState<IUser>();
  const [clients, setClients] = useState<Iclient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initials, setInitials] = useState('');

  const role = localStorage.getItem('role');
  const acessToken = localStorage.getItem('accessToken');
  const token = localStorage.getItem('id');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
    }
  };

  useEffect(() => {
    setLoading(true);
    loadClients(currentPage);
  }, [currentPage]);

  useEffect(() => {
    loadUser(token!);
  }, [token]);


  function initialsName(name: string) {
    const arrayName = name.split(' ');
    const first = arrayName[0][0];
    const second = arrayName[1][0];
    const result = `${first}${second}`;

    setInitials(result);
  }


  async function loadUser(id: string) {
    await api.get(`/users/find-one/${id}`, authorization)
      .then(response => {
        console.log(response.data);
        initialsName(response.data.name);
        setUser(response.data);
      });
  }

  async function loadClients(goPage: number) {

    await api.get(`client/${role === 'ADMIN' ? 'find-all' : 'me'}?page=${goPage}`, authorization).then(response => {
      setClients(response.data.data);
      setCurrentPage(response.data.meta.currentPage);
      setLastPage(response.data.meta.lastPage);
      setLoading(false);
    });
  }
  function phoneFormat(v: string) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
  }

  return (
    <div className='container'>
      <NavBar />

      <div className="container-list">
        <div className="breadcrumb">
          <div className="breadcrumb-link">
            <Link to={'/home/dashboard'}>Dashboard</Link>
            <IoIosArrowForward size={16} color='#7f808b' />
            <Link to={'/home/categories'}>Categorias</Link>
          </div>

          <div className='profile-info'>
            <div className='profile-text'>
              <p className='name'>{user?.name}</p>
              <p className='email'>{user?.email}</p>
            </div>
            <div className='profile'>
              <p>{initials}</p>
            </div>
          </div>
        </div>
        <div className="header-page">
          <h1>Clientes</h1>
        </div>
        <div className="table">
          <div className="row-clients first-row">
            <div className="column"><p>Nome</p></div>
            <div className="column"><p>Categoria</p></div>
            <div className="column"><p>Telefone</p></div>
            <div className="column"><p>Criado por</p></div>
            <div className="column"><p>Criado em</p></div>
          </div>

          {
            loading === true
              ? <div className="loading">
                <ReactLoading type={'spin'} color='#3c37fd' height={44} width={44} />
              </div>
              : clients.map((client, index) => (
                <div key={index} className="row-clients">
                  <div className="column">
                    <div className="border-name">
                      <div className="cicle" style={{ background: `${client.category.cor}` }}></div>
                      <p>{client.name}</p>
                    </div>
                  </div>
                  <div className="column">
                    <p>{client.category.name}</p>
                  </div>
                  <div className="column">
                    <p>{phoneFormat(client.phone)}</p>
                  </div>
                  <div className="column">
                    <p>{client.user !== null ? client.user.name : 'Usuário não identificado'}</p>
                  </div>
                  <div className="column">
                    <p>{moment(client.created_at).format('DD/MM/YYYY')}</p>
                  </div>
                </div>
              ))
          }
        </div>
        <div className="footer-pagination">
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            maxLength={7}
            setCurrentPage={setCurrentPage}
          />
        </div>

      </div>

    </div>
  );
}

export { ListTabulacao };

