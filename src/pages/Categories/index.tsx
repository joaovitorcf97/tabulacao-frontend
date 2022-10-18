import moment from "moment";
import { useEffect, useState } from "react";
import { FiEdit, FiPlusCircle, FiXCircle } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import Modal from 'react-modal';
import { Link } from "react-router-dom";

import { api } from "../../services/api";
import './styles.css';

Modal.setAppElement('#root');

interface ICategory {
  id: String;
  name: String;
  cor: String;
  adminId: String;
  created_at: Date;
}

function Categories() {
  const [name, setName] = useState('');
  const [color, setCoLor] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const acessToken = localStorage.getItem('accessToken');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
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
    api.get('/category/find', authorization)
      .then(response => {
        setCategories(response.data);
      });
  });

  async function createNewCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      name,
      color,
    };

    try {
      await api.post('/category/create', data, authorization);
      closeModal();
    } catch (error) {
      alert('Faild! try again!');
    }
  }

  return (
    <div className="container-category">
      <div className="breadcrumb">
        <Link to={'/home/dashboard'}>Dashboard</Link>
        <IoIosArrowForward size={16} color='#7f808b' />
        <Link to={'/home/categories'}>Categorias</Link>
      </div>
      <div className="header-page">
        <h1>Categorias</h1>
        <button onClick={openModal}>
          <FiPlusCircle size={16} color='#7f808b' />
          <p>Adicionar categoria</p>
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
          <h2>Criar nova categoria</h2>
          <button onClick={closeModal}>
            <FiXCircle size={24} color='#7f808b' />
          </button>
        </div>
        <form onSubmit={createNewCategory} className="form">
          <div className='input'>
            <span>Nome da categoria</span>
            <input
              required
              type="text"
              placeholder='Ex: Atendimento'
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='input'>
            <span>Selecione uma cor</span>
            <input
              required
              type="color"
              onChange={e => setCoLor(e.target.value)}
            />
          </div>

          <button>Salvar</button>
        </form>
      </Modal>
      <div className="table">
        <div className="row first-row">
          <div className="column"><p>Nome</p></div>
          <div className="column"><p>Cor</p></div>
          <div className="column"><p>Criado em</p></div>
          <div className="column"><p>Editar</p></div>
        </div>

        {
          categories.map(category => (
            <div className="row">
              <div className="column"><p>{category.name}</p></div>
              <div className="column">
                <div className="color" style={{ background: `${category.cor}` }}></div>
              </div>
              <div className="column">
                <p>{moment(category.created_at).format('DD/MM/YYYY HH:mm')}</p>
              </div>
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
  );
}

export { Categories };

