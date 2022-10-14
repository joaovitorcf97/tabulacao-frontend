import { FiEdit } from 'react-icons/fi';
import './styles.css';

function TableApp() {
  return (
    <div className="table">
      <div className="row first-row">
        <div className="column"><p>Nome</p></div>
        <div className="column"><p>Criado em</p></div>
        <div className="column"><p>Atualizado em</p></div>
        <div className="column"><p>Editar</p></div>
      </div>
      <div className="row">
        <div className="column">
          <div className='user'>
            <div className='user-profile'>
              <p>JV</p>
            </div>
            <div>
              <p className='user-name'>João Vitor</p>
              <p className='user-role'>joao@email.com</p>
            </div>
          </div>
        </div>
        <div className="column"><p>12/01/2022</p></div>
        <div className="column"><p>12/01/2022</p></div>
        <div className="column">
          <button className="edit">
            <FiEdit size={20} color='#83879a' />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <div className='user'>
            <div className='user-profile'>
              <p>JV</p>
            </div>
            <div>
              <p className='user-name'>João Vitor</p>
              <p className='user-role'>joao@email.com</p>
            </div>
          </div>
        </div>
        <div className="column"><p>12/01/2022</p></div>
        <div className="column"><p>12/01/2022</p></div>
        <div className="column">
          <button className="edit">
            <FiEdit size={20} color='#83879a' />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <div className='user'>
            <div className='user-profile'>
              <p>JV</p>
            </div>
            <div>
              <p className='user-name'>João Vitor</p>
              <p className='user-role'>joao@email.com</p>
            </div>
          </div>
        </div>
        <div className="column"><p>12/01/2022</p></div>
        <div className="column"><p>12/01/2022</p></div>
        <div className="column">
          <button className="edit">
            <FiEdit size={20} color='#83879a' />
          </button>
        </div>
      </div>
    </div>
  );
}

export { TableApp };

