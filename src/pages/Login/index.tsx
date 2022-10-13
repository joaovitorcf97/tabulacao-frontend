import './styles.css';

function Login() {
  return (
    <div className="container-login">
      <div className="container-left">
        <h1>Logo</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="container-right">
        <form>
          <h2>Login</h2>
          <div className='input'>
            <span>Email</span>
            <input type="text" placeholder='email@email.com' />
          </div>
          <div className='input'>
            <span>Password</span>
            <input type="password" placeholder='Password' />
          </div>
          <button>Entrar</button>
        </form>
      </div>
    </div>
  );
}

export { Login };

