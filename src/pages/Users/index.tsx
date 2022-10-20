import moment from 'moment';
import { useEffect, useState } from 'react';
import { FiEdit, FiPlusCircle, FiTrash2, FiXCircle } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { NavBar } from '../../Navbar';

import { api } from '../../services/api';
import './styles.css';

Modal.setAppElement('#root');

interface IUser {
  id: string;
  name: string;
  email: string;
  admin: IAdmin;
  created_at: Date;
}
interface IAdmin {
  id: string;
  name: string;
}

function Users() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const accessToken = localStorage.getItem('accessToken');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  };

  function openModal(idUse: string) {
    setModalIsOpen(true);
    if (idUse !== '0') {
      loadUser(idUse);
    } else {
      setId('0');
      setName('');
      setEmail('');
    }
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function initialsName(name: string) {
    const arrayName = name.split(' ');
    const first = arrayName[0][0];
    let second;
    let result;
    if (arrayName.length > 1) {
      second = arrayName[1][0];
      return result = `${first}${second}`;
    }

    result = `${first}`;
    return result;
  }

  useEffect(() => {
    api.get('/users/find', authorization)
      .then(response => {
        setUsers(response.data);
      });
  });

  async function createOrUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = { name, email, password };

    try {
      if (id === '0') {
        await api.post('/user/create/', data, authorization);
        closeModal();
      } else {
        await api.put(`/user/update-password/${id}`, data, authorization);
        closeModal();
      }
    } catch (error) {
      alert('Faild! try again!');
    }
  }

  async function loadUser(id: string) {

    try {
      const response = await api.get(`/users/find-one/${id}`, authorization);
      setId(response.data.id);
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      alert('Faild! try again!');
    }
  }

  async function deleteUser(id: string) {
    try {
      await api.delete(`/user/delete-user/${id}`, authorization);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      alert('Faild! try again!');
    }
  }

  return (
    <div className='container'>
      <NavBar />
      <div className="container-users">
        <div className="breadcrumb">
          <Link to={'/home/dashboard'}>Dashboard</Link>
          <IoIosArrowForward size={16} color='#7f808b' />
          <Link to={'/home/users'}>Usuários</Link>
        </div>
        <div className="header-page">
          <h1>Usuários</h1>
          <button onClick={() => openModal('0')}>
            <FiPlusCircle size={16} color='#7f808b' />
            <p>Adicionar usuario</p>
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Exemplo Modal'
          overlayClassName='modal-overlay'
          className='modal-content'
          closeTimeoutMS={300}
        >
          <div className="modal-header">
            <h2>Criar usuário</h2>
            <button onClick={closeModal}>
              <FiXCircle size={24} color='#7f808b' />
            </button>
          </div>
          <form onSubmit={createOrUpdate} className="form">
            <div className='input'>
              <span>Nome completo</span>
              <input
                required
                type="text"
                value={name}
                placeholder='Exemplo: Maria da Silva Costa'
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='input'>
              <span>Email</span>
              <input
                required
                type="text"
                value={email}
                placeholder='Exemplo: maria@email.com'
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='input'>
              <span>Senha</span>
              <input
                required
                type="text"
                placeholder='Senha'
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button>Criar usuário</button>
          </form>
        </Modal>

        <div className="table">
          <div className="row first-row">
            <div className="column"><p>Nome</p></div>
            <div className="column"><p>Criado em</p></div>
            <div className="column"><p>Criado por</p></div>
            <div className="column"><p></p></div>
          </div>

          {
            users.map((user, index) => (
              <div key={index} className="row">
                <div className="column">
                  <div className='user'>
                    <div className='user-profile'>
                      <p>{initialsName(user.name)}</p>
                    </div>
                    <div>
                      <p className='user-name'>{user.name}</p>
                      <p className='user-role'>{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <p>{moment(user.created_at).format('DD/MM/YYYY HH:mm')}</p>
                </div>
                <div className="column">
                  <p>{user.admin.name}</p>
                </div>
                <div className="column">
                  <button onClick={() => openModal(user.id)} className="edit">
                    <FiEdit size={20} color='#83879a' />
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="edit">
                    <FiTrash2 size={20} color='#83879a' />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export { Users };

