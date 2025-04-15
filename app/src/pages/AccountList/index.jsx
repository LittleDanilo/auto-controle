import './style.css'
import Menu from '../../components/Menu'
import { MdDelete } from 'react-icons/md'

function AccountList() {

  const contas = [
    {
      id_conta: 1,
      nome: "Conta Corrente Interna 1",
      descricao: "Conta utilizada para transações internas",
      tipo: "Interna",
      status: "Ativa",
      created_at: "2025-04-10T10:00:00",
      updated_at: "2025-04-10T10:00:00"
    },
    {
      id_conta: 2,
      nome: "Conta Corrente Interna 2",
      descricao: "Conta utilizada para transações internas",
      tipo: "Interna",
      status: "Ativa",
      created_at: "2025-04-10T10:30:00",
      updated_at: "2025-04-10T10:30:00"
    },
    {
      id_conta: 3,
      nome: "Conta Corrente Interna 3",
      descricao: "Conta utilizada para transações internas",
      tipo: "Interna",
      status: "Suspensa",
      created_at: "2025-04-11T12:00:00",
      updated_at: "2025-04-11T12:00:00"
    },
    {
      id_conta: 4,
      nome: "Conta Corrente Externa 1",
      descricao: "Conta externa utilizada para pagamento de serviços",
      tipo: "Externa",
      status: "Ativa",
      created_at: "2025-04-10T09:00:00",
      updated_at: "2025-04-10T09:00:00"
    },
    {
      id_conta: 5,
      nome: "Conta Corrente Externa 2",
      descricao: "Conta externa utilizada para pagamento de fornecedores",
      tipo: "Externa",
      status: "Ativa",
      created_at: "2025-04-10T11:00:00",
      updated_at: "2025-04-10T11:00:00"
    },
    {
      id_conta: 6,
      nome: "Conta Corrente Externa 3",
      descricao: "Conta externa de operações bancárias",
      tipo: "Externa",
      status: "Inativa",
      created_at: "2025-04-10T14:00:00",
      updated_at: "2025-04-10T14:00:00"
    }
  ];
  
  return (
    <div className='container'>
      <Menu />
        
          <form className='container'>
          <h1>Pagina de Lista de Contas</h1>
            <label>
              Tipo:
              <select name="origem">
                <option value="">Todas</option>
                <option value="">Interna</option>
                <option value="">Externa</option>
              </select>
            </label>

            <label>
              Nome:
              <input type="text" name="vanomelor" placeholder="Nome" />
            </label>

            <button type="submit">Filtrar</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Cancelar</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((c) => (
                <tr key={c.id_conta}>
                  <td>{c.nome}</td>
                  <td>{c.tipo}</td>
                  <td>{c.descricao}</td>
                  <td><MdDelete size={28} className="trash" /></td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  )
}

export default AccountList
