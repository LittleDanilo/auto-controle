import './style.css'
import Menu from '../../components/Menu'

function Transaction() {

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
      <form>
      <h1>Pagina de Transacoes</h1>
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

        <label>Descricao:</label>
          <textarea id="descricao" name="descricao" rows="4" cols="50"></textarea>
        
        <label>
          Status:
          <select name="status">
            <option value="">Concluida</option>
            <option value="">Pendente</option>
            <option value="">Cancelada</option>
          </select>
        </label>
                  
        <p><button type='submit'>Criar</button>
        <button>Cancelar</button></p>
      </form>
    </div>
  )
}

export default Transaction
