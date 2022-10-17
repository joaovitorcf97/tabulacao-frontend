import { useState } from "react";
import { FiEdit, FiPlusCircle, FiXCircle } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import './styles.css';

Modal.setAppElement('#root');

function Categories() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    console.log('Abrir modal');
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
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
        <form className="form">
          <div className='input'>
            <span>Nome da categoria</span>
            <input type="text" placeholder='Atendimento' />
          </div>
          <div className='input'>
            <span>Selecione uma cor</span>
            <input type="color" />
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
        <div className="row">
          <div className="column"><p>Atendimento</p></div>
          <div className="column">
            <div className="color"></div>
          </div>
          <div className="column"><p>12/01/2022</p></div>
          <div className="column">
            <button className="edit">
              <FiEdit size={20} color='#83879a' />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="column"><p>Atendimento</p></div>
          <div className="column">
            <div className="color"></div>
          </div>
          <div className="column"><p>12/01/2022</p></div>
          <div className="column">
            <button className="edit">
              <FiEdit size={20} color='#83879a' />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="column"><p>Atendimento</p></div>
          <div className="column">
            <div className="color"></div>
          </div>
          <div className="column"><p>12/01/2022</p></div>
          <div className="column">
            <button className="edit">
              <FiEdit size={20} color='#83879a' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Categories };

