import Menu from '../../components/Menu'
import { MdDelete, MdAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api'

function TransactionList() {

  const navigate = useNavigate();

  const [contas, setContas] = useState({});
  
  async function getAccounts(){
    const accountsFromApi = await api.post('/accounts/list')
    setContas(accountsFromApi.data.result)
  }

  const [transacoes, setTrans] = useState({});
  
  async function getTransactions(){
    const transactionsFromApi = await api.post('/transactions/list')
    setTrans(transactionsFromApi.data.result)
  }

  useEffect(() =>{
      getAccounts();
      getTransactions();
    }, [])

  const [form, setForm] = useState({
      name: "",
      type: "",
      status: ""
    });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function searchTransactions(){
    const inputs = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '')
    );
    const transactionsFromApi = await api.post('/transactions/list', inputs);

    if (transactionsFromApi.data.status == 200) return setTrans(transactionsFromApi.data.result);
    alert("Erro ao buscar transacoes.");
  }

  async function cancelTransaction(id){
    const transactionsFromApi = await api.post('/transactions/update', {id: id, fields: {status: "Cancelada"}});
    if (transactionsFromApi.data.status == 200) {
      searchTransactions();
      return alert("Transacao cancelada com sucesso!");
    }
    alert("Erro ao cancelar transacao.");
  }

  async function reactivateTransaction(id){
    const transactionsFromApi = await api.post('/transactions/update', {id: id, fields: {status: "Concluida"}});
    if (transactionsFromApi.data.status == 200) {
      searchTransactions();
      return alert("Transacao retomada com sucesso!");
    }
    alert("Erro ao retomar conta.");
  }
  
  return (
    <div className='container'>
      <Menu />
        
          <form className='container'>
          <h1>Listar de Transacoes</h1>
            <label>
              Origem:
              <select name="origin" onChange={handleChange}>
                <option value="">Todas</option>
                {Array.isArray(contas) && contas.map((conta) => (
                  <option key={conta.id} value={conta.id}>
                  {conta.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Destino:
              <select name="destiny" onChange={handleChange}>
                <option value="">Todas</option>
                {Array.isArray(contas) && contas.map((conta) => (
                  <option key={conta.id} value={conta.id}>
                    {conta.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Valor:
              <input type="number" name="value" placeholder="Valor" onChange={handleChange}/>
            </label>

            <label>
              Data:
              <input type="date" name="date" onChange={handleChange}/>
            </label>

            <label>
              Status:
              <select name="status" onChange={handleChange}>
                <option value="">Todas</option>
                <option value="Concluida">Concluida</option>
                <option value="Pendente">Pendente</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </label>

            <button type="button" onClick={searchTransactions}>Filtrar</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Valor</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(transacoes) && transacoes.map((t) => {
                const contaOrigem = contas.find((c) => c.id === t.origin);
                const contaDestino = contas.find((c) => c.id === t.destiny);

                return (
                  <tr
                    key={t.id}
                    onClick={() => navigate('/transacoes', { state: { transacaoRecebida: t } })}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{t.date.slice(0, 10).split('-').reverse().join('/')}</td>
                    <td>{contaOrigem?.name || 'Origem não encontrada'}</td>
                    <td>{contaDestino?.name || 'Destino não encontrado'}</td>
                    <td className='valor'>R$ {parseFloat(t.value).toFixed(2)}</td>
                    <td>{t.description}</td>
                    <td>{t.status}</td>
                    <td
                      onClick={(e) => {
                        e.stopPropagation();
                        if (t.status === 'Cancelada') {
                          reactivateTransaction(t.id);
                        } else {
                          cancelTransaction(t.id);
                        }
                      }}
                    >
                      {t.status === 'Cancelada' ? (
                        <MdAdd size={28} className="plus" />
                      ) : (
                        <MdDelete size={28} className="trash" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
    </div>
  )
}

export default TransactionList
