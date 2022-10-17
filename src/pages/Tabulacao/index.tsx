import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

import './styles.css';

function Tabulacao() {
  return (
    <div className="container-users">
      <div className="breadcrumb">
        <Link to={'/home/dashboard'}>Dashboard</Link>
        <IoIosArrowForward size={16} color='#7f808b' />
        <Link to={'/home/categories'}>Tabulação</Link>
      </div>
      <div className="header-page">
        <h1>Tabulação</h1>
      </div>

      <div className="container-tabulacao">
        <div className="container-tabulacao-left">
          <form className="form">
            <div className='input'>
              <span>Nome</span>
              <input type="text" placeholder='Atendimento' />
            </div>
            <div className='input'>
              <span>Telefone</span>
              <input type="text" placeholder='(31) 9 9999-9999' />
            </div>
            <div className='input'>
              <span>Categoria</span>
              <select className="minimal" name="categories" id="categories-select">
                <option value="">Atendimento 1</option>
                <option value="">Atendimento 2</option>
                <option value="">Atendimento 3</option>
              </select>
            </div>
            <button>Salvar</button>
          </form>
        </div>
        <div className="container-tabulacao-right">
          <div className="table">
            <span>Historico</span>
            <div className="row first-row">
              <div className="column"><p>Nome</p></div>
              <div className="column"><p>Categoria</p></div>
              <div className="column"><p>Telefone</p></div>
              <div className="column"><p>Criando em</p></div>
            </div>
            <div className="row">
              <div className="column"><p>Maria das Graças</p></div>
              <div className="column"><p>Atendimento</p></div>
              <div className="column"><p>99999-9999</p></div>
              <div className="column"><p>12/01/2022</p></div>
            </div>
            <div className="row">
              <div className="column"><p>Maria das Graças</p></div>
              <div className="column"><p>Atendimento</p></div>
              <div className="column"><p>99999-9999</p></div>
              <div className="column"><p>12/01/2022</p></div>
            </div>
            <div className="row">
              <div className="column"><p>Maria das Graças</p></div>
              <div className="column"><p>Atendimento</p></div>
              <div className="column"><p>99999-9999</p></div>
              <div className="column"><p>12/01/2022</p></div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export { Tabulacao };

