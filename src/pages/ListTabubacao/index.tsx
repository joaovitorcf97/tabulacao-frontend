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
}

interface ICategory {
  name: string;
  cor: String;
}

interface IUser {
  name: string;
}

function ListTabubacao() {
  const [clients, setClients] = useState<Iclient[]>([]);
  const [page, setPage] = useState(0);

  const idUser = localStorage.getItem('id');
  const acessToken = localStorage.getItem('accessToken');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
    }
  };

  useEffect(() => {
    api.get(`client/find-all?skip=${page}&take=10`, authorization).then(response => {
      if (response.data.length !== 0) {
        let arrayClients: Iclient[] = [];
        response.data.map((client: Iclient, index: number) => {
          if (idUser === response.data[index].user.id) {
            console.log(client);
            arrayClients.push(client);
          }
        });

        setClients(arrayClients);
      } else {
        fetchLessClients();
      }
    });
  }, [page]);

  async function fetchMoreClients() {
    setPage(page + 10);
  }
  async function fetchLessClients() {
    if (page > 0) {
      setPage(page - 10);
    }
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
          <div className="pagination-button">
            <button onClick={fetchLessClients}>
              <MdArrowBackIos color="#ffffff" /> Anterior
            </button>
            <div className="pagination-colum"></div>
            <button onClick={fetchMoreClients}>
              Proximo <MdArrowForwardIos color="#ffffff" />
            </button>
          </div>
        </div>
        <div className="table">
          <div className="row first-row">
            <div className="column"><p>Nome</p></div>
            <div className="column"><p>Categoria</p></div>
            <div className="column"><p>Telefone</p></div>
            <div className="column"><p>Criado por</p></div>
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
                  <p>{client.user.name}</p>
                </div>
              </div>
            ))
          }
        </div>


      </div>
    </div>
  );
}

export { ListTabubacao };

