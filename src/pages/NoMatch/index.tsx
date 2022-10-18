import { Link } from 'react-router-dom';
import './styles.css';

function NoMatch() {
  return (
    <div className="no-match">
      <span>Ooops.. &#128557;</span>
      <h1>404</h1>
      <p>Pagina não encontrada</p>
      <Link to={'/home/dashboard'} >
        Voltar para a Dashboard
      </Link>
    </div>
  );
}

export { NoMatch };

