import { Link } from 'react-router-dom'; 
import './style.css'

export default function Menu({user}) {

  return (
    <>
      <div className='usuario'>
        Usuário: {user.name}
      </div>
      <nav>
        <ul>
          <li><Link to="/lista-transacoes">Lista de Transações</Link></li>
          <li><Link to="/transacoes">Nova Transação</Link></li>
          <li><Link to="/lista-contas">Lista de Contas</Link></li>
          <li><Link to="/contas">Nova Conta</Link></li>
          <li><Link to="/lista-usuarios">Lista de Usuários</Link></li>
          <li><Link to="/usuarios">Novo Usuário</Link></li>
          <li><Link to="/" onClick={() => sessionStorage.removeItem("acesso")}>Sair</Link></li>
        </ul>
      </nav>
    </>
  );
}