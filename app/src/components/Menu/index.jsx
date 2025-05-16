import { Link } from 'react-router-dom'; 
import './style.css'

export default function Menu({user}) {

  return (
    <>
      <div className='usuario'>
        Usuario: {user.name}
      </div>
      <nav>
        <ul>
          <li><Link to="/lista-transacoes">Listar Transacoes</Link></li>
          <li><Link to="/transacoes">Nova Transacao</Link></li>
          <li><Link to="/lista-contas">Listar Contas</Link></li>
          <li><Link to="/contas">Nova Conta</Link></li>
          <li><Link to="/lista-usuarios">Listar Usuarios</Link></li>
          <li><Link to="/usuarios">Novo Usuario</Link></li>
          <li><Link to="/" onClick={() => sessionStorage.removeItem("acesso")}>Sair</Link></li>
        </ul>
      </nav>
    </>
  );
}