import { FiEdit } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import './styles.css';

function Categories() {
  return (
    <div className="container-category">
      <div className="breadcrumb">
        <Link to={'/home/dashboard'}>Dashboard</Link>
        <IoIosArrowForward size={16} color='#7f808b' />
        <Link to={'/home/categories'}>Categorias</Link>
      </div>
      <h1>Categorias</h1>

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

