import { Link } from 'react-router-dom'; 
import './style.css'

export default function Menu() {
  
  return (
    <nav>
      <ul>
        <li><Link to="/lista-transacoes">Listar Transacoes</Link></li>
        <li><Link to="/transacoes">Nova Transacao</Link></li>
        <li><Link to="/lista-contas">Listar Contas</Link></li>
        <li><Link to="/contas">Nova Conta</Link></li>
        <li><Link to="/">Sair</Link></li>
      </ul>
    </nav>
  );
}