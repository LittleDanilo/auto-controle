import './style.css'
import { Link } from 'react-router-dom'

function Login() {

  return (
    <div className='container'>
      <form>
      <h1>Pagina de Login</h1>
        <label>
          Login:
          <input type="text" name="login" placeholder="Login" />
        </label>
        <label>
          Senha:
          <input type="password" name="pass" placeholder="Senha" />
        </label>
        <Link to="/lista-transacoes">
          <button>Entrar</button>
        </Link>
      </form>
    </div>
  )
}

export default Login
