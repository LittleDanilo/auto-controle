import Menu from '../../components/Menu'
import { MdDelete, MdAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

function TransactionList() {

  const navigate = useNavigate();

  const transacoes = [
    {
      id_transacao: 1,
      conta_origem: 1,
      conta_destino: 2,
      valor: 1500.75,
      data_transferencia: "2025-04-10T10:30:00",
      descricao: "Pagamento de serviços",
      status: "Concluida",
      created_at: "2025-04-10T09:15:00",
      updated_at: "2025-04-10T10:30:00"
    },
    {
      id_transacao: 2,
      conta_origem: 3,
      conta_destino: 4,
      valor: 500.00,
      data_transferencia: "2025-04-11T14:45:00",
      descricao: "Transferência para parceiro",
      status: "Concluida",
      created_at: "2025-04-11T14:00:00",
      updated_at: "2025-04-11T14:00:00"
    },
    {
      id_transacao: 3,
      conta_origem: 5,
      conta_destino: 6,
      valor: 250.25,
      data_transferencia: "2025-04-12T08:00:00",
      descricao: "Reembolso de despesas",
      status: "Cancelada",
      created_at: "2025-04-12T07:30:00",
      updated_at: "2025-04-12T07:45:00"
    }
  ];

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
          <h1>Pagina de Lista de Transacoes</h1>
            <label>
              Origem:
              <select name="origem">
                <option value="">Todas</option>
                {contas.map((conta) => (
                  <option key={conta.id_conta} value={conta.id_conta}>
                  {conta.nome}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Destino:
              <select name="destino">
                <option value="">Todas</option>
                {contas.map((conta) => (
                  <option key={conta.id_conta} value={conta.id_conta}>
                    {conta.nome}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Valor:
              <input type="number" name="valor" placeholder="Valor" />
            </label>

            <label>
              Data:
              <input type="date" name="data" />
            </label>

            <label>
              Status:
              <select name="status">
                <option value="">Concluida</option>
                <option value="">Pendente</option>
                <option value="">Cancelada</option>
              </select>
            </label>

            <button type="button">Filtrar</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Valor</th>
                <th>Descrição</th>
                <th>Cancelar</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((trans) => (
                <tr 
                  key={trans.id_transacao}
                  onClick={() => navigate('/transacoes', { state: { transacaoRecebida: trans } })}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{new Date(trans.data_transferencia).toLocaleDateString()}</td>
                  <td>{trans.conta_origem}</td>
                  <td>{trans.conta_destino}</td>
                  <td>R$ {trans.valor.toFixed(2)}</td>
                  <td>{trans.descricao}</td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      if (trans.status === 'Cancelada') {
                        console.log('Essa transação será reativada:', trans.id_transacao);
                      } else {
                        console.log('Deletar transação:', trans.id_transacao);
                      }
                    }}
                  >
                    {trans.status === 'Cancelada' ? (
                      <MdAdd size={28} className="plus" />
                    ) : (
                      <MdDelete size={28} className="trash" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  )
}

export default TransactionList
