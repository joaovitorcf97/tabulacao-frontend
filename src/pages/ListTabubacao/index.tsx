import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import { Link } from "react-router-dom";
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

interface Pagination {
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number;
  next: number;
}

function ListTabubacao() {
  const [clients, setClients] = useState<Iclient[]>([]);
  const [pagination, setPagination] = useState<Pagination>();

  const role = localStorage.getItem('role');
  const acessToken = localStorage.getItem('accessToken');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
    }
  };

  useEffect(() => {
    loadClients(1);
  }, []);

  async function fetchMoreClients() {
    if (pagination?.next !== null) {
      loadClients(pagination?.currentPage! + 1);
    }
  }
  async function fetchLessClients() {
    if (pagination?.prev !== null) {
      loadClients(pagination?.currentPage! - 1);
    }
  }

  async function goPage(goPage: number) {
    api.get(`client/${role === 'ADMIN' ? 'find-all' : 'me'}?page=${goPage}`, authorization).then(response => {
      setClients(response.data.data);
      setPagination(response.data.meta);
    });
  }

  async function loadClients(goPage: number) {
    api.get(`client/${role === 'ADMIN' ? 'find-all' : 'me'}?page=${goPage}`, authorization).then(response => {
      setClients(response.data.data);
      setPagination(response.data.meta);
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

        <div className="pagination-button">
          {
            pagination?.prev !== null
              ? <button className="button-pagination" onClick={fetchLessClients}>
                <MdArrowBackIos color="#fff" /> Anterior
              </button> : null}
          <div className="pages">

            {
              [...Array(pagination?.lastPage)].map((_, index) => <button className={pagination?.currentPage === index + 1 ? 'page-active' : ''} onClick={() => goPage(index + 1)}>{index + 1}</button>)
            }
          </div>
          {
            pagination?.next !== null
              ? <button className="button-pagination" onClick={fetchMoreClients}>
                Proximo <MdArrowForwardIos color="#fff" />
              </button> : null
          }
        </div>
      </div>
    </div>
  );
}

export { ListTabubacao };

