import moment from "moment";
import { useEffect, useState } from "react";
import { FiEdit, FiPlusCircle, FiTrash2, FiXCircle } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { AlertApp } from "../../components/AlertApp";
import { NavBar } from "../../Navbar";

import { api } from "../../services/api";
import './styles.css';

Modal.setAppElement('#root');

interface ICategory {
  id: string;
  name: string;
  cor: string;
  adminId: string;
  created_at: Date;
}

function Categories() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('#001122');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hasError, setError] = useState(false);

  const acessToken = localStorage.getItem('accessToken');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
    }
  };

  function openModal(idCategory: string) {
    setModalIsOpen(true);
    if (idCategory !== '0') {
      loadCategory(idCategory);
    } else {
      setId('0');
    }
  }

  function closeModal() {
    setModalIsOpen(false);
    setId('0');
    setName('');
    setError(false);
  }

  useEffect(() => {
    api.get('/category/find', authorization)
      .then(response => {
        setCategories(response.data);
      });
  });

  async function createOrUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      name,
      color,
    };
    try {
      if (id === '0') {
        await api.post('/category/create/', data, authorization);
        closeModal();
      } else {
        await api.put(`/category/update/${id}`, data, authorization);
        closeModal();
      }
    } catch (error) {
      setError(true);
    }
  }

  async function deleteCategory(id: string) {
    try {
      await api.delete(`/category/delete/${id}`, authorization);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      alert('Faild! try again!');
    }
  }

  async function loadCategory(id: string) {

    try {
      const response = await api.get(`/category/find-one/${id}`, authorization);
      setId(response.data.id);
      setName(response.data.name);
      setColor(response.data.cor);
    } catch (error) {
      alert('Faild! try again!');
    }
  }

  function closeError() {
    console.log('Erro');
    setError(false);
  }

  return (
    <div className='container'>

      <NavBar />
      <div className="container-category">
        <div className="breadcrumb">
          <Link to={'/home/dashboard'}>Dashboard</Link>
          <IoIosArrowForward size={16} color='#7f808b' />
          <Link to={'/home/categories'}>Categorias</Link>
        </div>
        <div className="header-page">
          <h1>Categorias</h1>
          <button onClick={() => openModal('0')}>
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
            {hasError ? <AlertApp text='Categoria já existe' click={closeError} /> : null}
            <h2>{id === '0' ? 'Criar nova' : 'Atualizar'} categoria</h2>
            <button onClick={closeModal}>
              <FiXCircle size={24} color='#7f808b' />
            </button>
          </div>
          <form onSubmit={createOrUpdate} className="form">
            <div className='input'>
              <span>Nome da categoria</span>
              <input
                required
                type="text"
                value={name}
                placeholder='Ex: Atendimento'
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='input'>
              <span>Selecione uma cor</span>
              <input
                required
                value={color}
                type="color"
                onChange={e => setColor(e.target.value)}
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
            <div className="column"><p></p></div>
          </div>

          {
            categories.map((category, index) => (
              <div key={index} className="row">
                <div className="column"><p>{category.name}</p></div>
                <div className="column">
                  <div className="color" style={{ background: `${category.cor}` }}></div>
                </div>
                <div className="column">
                  <p>{moment(category.created_at).format('DD/MM/YYYY HH:mm')}</p>
                </div>
                <div className="column">
                  <button className="edit" onClick={() => openModal(category.id)}>
                    <FiEdit size={20} color='#83879a' />
                  </button>
                  <button className="edit" onClick={() => deleteCategory(category.id)}>
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

export { Categories };

