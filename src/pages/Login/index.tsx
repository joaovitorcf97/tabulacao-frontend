import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertApp } from '../../components/AlertApp';
import '../../components/AlertApp/styles.css';
import { api } from '../../services/api';
import './styles.css';

interface IToken {
  email: string;
  exp: number;
  sub: string;
}

function Login() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setError] = useState(false);

  const navigate = useNavigate();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      id,
      email,
      password,
    };

    try {
      const response = await api.post('/user/login', data);

      localStorage.setItem('email', email);
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('role', response.data.user.role);

      const token = localStorage.getItem('accessToken');
      if (token !== null) {
        const decoded: IToken = jwt_decode(token);
        localStorage.setItem('id', decoded.sub);
      }

      navigate('/dashboard/');
    } catch (error) {
      setError(true);
    }
  }

  function closeError() {
    console.log('Erro');
    setError(false);
  }

  return (
    <div className="container-login">
      {
        hasError
          ? <AlertApp
            text="Error ao tentar logar"
            body='Email ou senha incorreto'
            click={closeError} />
          : null
      }
      <div className="container-right">
        <form onSubmit={login} className="form">
          <h2>Login</h2>
          <div className='input'>
            <span>Email</span>
            <input
              type="text"
              placeholder='email@email.com'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='input'>
            <span>Password</span>
            <input
              type="password"
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button>Entrar</button>

        </form>
      </div>
    </div>
  );
}

export { Login };

