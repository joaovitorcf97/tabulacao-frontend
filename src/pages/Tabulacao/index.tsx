import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { AlertApp } from "../../components/AlertApp";
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
}

interface ICategory {
  id: string;
  name: string;
  cor: String;
}

interface IUser {
  name: string;
}

function Tabulacao() {
  const [user, setUser] = useState<IUser>();
  const [clients, setClients] = useState<Iclient[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([{ id: '0', name: 'Escolha uma categoria', cor: '' }]);
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hasError, setError] = useState(false);
  const role = localStorage.getItem('role');

  const acessToken = localStorage.getItem('accessToken');
  const token = localStorage.getItem('id');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
    }
  };

  useEffect(() => {
    console.log(categoryId);
    loadCategories();
    loadClients();
  }, []);

  useEffect(() => {
    loadUser(token!);
  }, [token]);

  async function createClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      categoryId,
      name,
      phone,
    };

    try {
      console.log(categoryId);
      await api.post('/client/create/', data, authorization);
      setName('');
      setPhone('');
      setCategories([categories[0]]);
      setCategoryId('');
      loadCategories();
      loadClients();
      setError(false);

    } catch (error) {
      console.log(data.categoryId);
      setError(true);
    }
  }

  async function loadCategories() {
    api.get(`/category/find/`, authorization).then(response => {
      let arrayCategories = [categories, ...response.data];
      setCategories(arrayCategories);
    });
  }

  async function loadClients() {
    const result = await api.get(`client/${role === 'ADMIN' ? 'find-all' : 'me'}?page=1`, authorization);
    setClients(result.data.data);
    console.log(result.data.data);
  }

  async function loadUser(id: string) {
    await api.get(`/users/find-one/${id}`, authorization)
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      });
  }

  function phoneFormat(v: string) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
  }

  function closeError() {
    setError(false);
  }

  return (
    <div className='container'>
      {hasError ? <AlertApp text='Escolha uma categoria' click={closeError} /> : null}
      <NavBar />
      <div className="container-users">
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
              <p>JV</p>
            </div>
          </div>
        </div>
        <div className="header-page">
          <h1>Tabulação</h1>
        </div>

        <div className="container-tabulacao">
          <div className="container-tabulacao-left">
            <form onSubmit={createClient} className="form">
              <div className='input'>
                <span>Nome</span>
                <input
                  required
                  value={name}
                  type="text"
                  placeholder='Atendimento'
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className='input'>
                <span>Telefone</span>
                <input
                  value={phone}
                  type="text"
                  placeholder='(31) 9 9999-9999'
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <div className='input'>
                <span>Categoria</span>
                <select
                  className="minimal"
                  name="categories" id="categories-select"
                  onChange={e => setCategoryId(e.target.value)}>
                  {
                    categories.map((category, index) => (
                      <option
                        key={index}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))
                  }
                </select>
              </div>
              <button>Salvar</button>
            </form>
          </div>
          <div className="container-tabulacao-right">
            <div className="tabl">
              <div className="row-tabulacao first-row">
                <div className="column"><p>Nome</p></div>
                <div className="column"><p>Categoria</p></div>
                <div className="column"><p>Telefone</p></div>
              </div>

              {
                clients.map((client, index) => (
                  <div key={index} className="row-tabulacao">
                    <div className="column">
                      <div className="border-name">
                        <div className="cicle" style={{ background: `${client.category.cor}` }}></div>
                        <p>{client.name}</p>
                      </div>
                    </div>
                    <div className="column tabulacao-category">
                      <p>{client.category.name}</p>
                    </div>
                    <div className="column tabulacao-phone">
                      <p>{phoneFormat(client.phone)}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}

export { Tabulacao };

