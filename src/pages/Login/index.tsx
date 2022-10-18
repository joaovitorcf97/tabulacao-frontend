import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertApp } from '../../components/AlertApp';
import '../../components/AlertApp/styles.css';
import { api } from '../../services/api';
import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setError] = useState(false);

  const navigate = useNavigate();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post('/admin/login', data);

      localStorage.setItem('email', email);
      localStorage.setItem('accessToken', response.data);

      navigate('/home/dashboard/');
    } catch (error) {
      setError(true);
    }
  }

  function closeAlert() {
    console.log('teste');
  }

  return (
    <div className="container-login">
      {hasError ? <AlertApp /> : null}
      <div className="container-left">
        <h1>Logo</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
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

