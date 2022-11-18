import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { NavBar } from "../../Navbar";
import { api } from "../../services/api";

import './styles.css';


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
  const [clients, setClients] = useState<Iclient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const role = localStorage.getItem('role');
  const acessToken = localStorage.getItem('accessToken');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
    }
  };

  useEffect(() => {
    loadClients(currentPage);
  }, [currentPage]);

  async function loadClients(goPage: number) {
    api.get(`client/${role === 'ADMIN' ? 'find-all' : 'me'}?page=${goPage}`, authorization).then(response => {
      setClients(response.data.data);
      setCurrentPage(response.data.meta.currentPage);
      setLastPage(response.data.meta.lastPage);
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
          <Link to={'/home/dashboard'}>Dashboard</Link>
          <IoIosArrowForward size={16} color='#7f808b' />
          <Link to={'/home/categories'}>Categorias</Link>
        </div>
        <div className="header-page">
          <h1>Clientes</h1>
        </div>
        <div className="table">
          <div className="row first-row">
            <div className="column"><p>Nome</p></div>
            <div className="column"><p>Categoria</p></div>
            <div className="column"><p>Telefone</p></div>
            <div className="column"><p>Criado em</p></div>
          </div>

          {
            clients.map((client, index) => (
              <div key={index} className="row">
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
                  <p>{client.created_at}</p>
                </div>
              </div>
            ))
          }
        </div>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          maxLength={7}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export { ListTabulacao };

