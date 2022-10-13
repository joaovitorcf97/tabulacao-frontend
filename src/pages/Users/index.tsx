import { FiEdit } from 'react-icons/fi';

import './styles.css';
function Users() {
  return (
    <div className="container-users">
      <h1>Usuários</h1>
      <table className="table">
        <tr>
          <th>NOME</th>
          <th>CRIADO EM</th>
          <th>ATUALIZADO EM</th>
          <th>TIPO</th>

        </tr>
        <tr>
          <td>
            <div className='user'>
              <div className='user-profile'>
                <p>JV</p>
              </div>
              <div>
                <p className='user-name'>João Vitor</p>
                <p className='user-role'>joao@email.com</p>
              </div>
            </div>
          </td>
          <td>08/10/2022</td>
          <td>12/10/2022</td>
          <td>Usuário padrão</td>

          <td className="edit-buttons">
            <button className="edit">
              <FiEdit size={20} color='#83879a' />
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div className='user'>
              <div className='user-profile'>
                <p>JV</p>
              </div>
              <div>
                <p className='user-name'>João Vitor</p>
                <p className='user-role'>joao@email.com</p>
              </div>
            </div>
          </td>
          <td>08/10/2022</td>
          <td>12/10/2022</td>
          <td>Usuário padrão</td>

          <td className="edit-buttons">
            <button className="edit">
              <FiEdit size={20} color='#83879a' />
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div className='user'>
              <div className='user-profile'>
                <p>JV</p>
              </div>
              <div>
                <p className='user-name'>João Vitor</p>
                <p className='user-role'>joao@email.com</p>
              </div>
            </div>
          </td>
          <td>08/10/2022</td>
          <td>12/10/2022</td>
          <td>Usuário padrão</td>

          <td className="edit-buttons">
            <button className="edit">
              <FiEdit size={20} color='#83879a' />
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div className='user'>
              <div className='user-profile'>
                <p>JV</p>
              </div>
              <div>
                <p className='user-name'>João Vitor</p>
                <p className='user-role'>joao@email.com</p>
              </div>
            </div>
          </td>
          <td>08/10/2022</td>
          <td>12/10/2022</td>
          <td>Usuário padrão</td>

          <td className="edit-buttons">
            <button className="edit">
              <FiEdit size={20} color='#83879a' />
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export { Users };

