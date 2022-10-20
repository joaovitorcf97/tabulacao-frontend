import moment from 'moment';
import { useEffect, useState } from 'react';
import { FiEdit, FiPlusCircle, FiXCircle } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { NavBar } from '../../Navbar';

import { api } from '../../services/api';
import './styles.css';

Modal.setAppElement('#root');

interface IUser {
  id: String;
  name: String;
  email: String;
  adminId: String;
  created_at: Date;
}

function Users() {
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

  function openModal() {
    console.log('Abrir modal');
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    api.get('/users/find', authorization)
      .then(response => {
        setUsers(response.data);
      });
  });

  async function createNewUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = { name, email, password };

    try {
      await api.post('/user/create', data, authorization);
      closeModal();
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
          <button onClick={openModal}>
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
          <form onSubmit={createNewUser} className="form">
            <div className='input'>
              <span>Nome completo</span>
              <input
                required
                type="text"
                placeholder='Exemplo: Maria da Silva Costa'
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='input'>
              <span>Email</span>
              <input
                required
                type="text"
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
            <div className="column"><p>Atualizado em</p></div>
            <div className="column"><p>Editar</p></div>
          </div>

          {
            users.map((user, index) => (
              <div key={index} className="row">
                <div className="column">
                  <div className='user'>
                    <div className='user-profile'>
                      <p>JV</p>
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
                <div className="column"><p>12/01/2022</p></div>
                <div className="column">
                  <button className="edit">
                    <FiEdit size={20} color='#83879a' />
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

