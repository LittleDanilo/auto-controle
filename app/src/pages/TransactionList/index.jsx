import Menu from '../../components/Menu'
import { MdDelete, MdAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api'

function TransactionList() {

  const navigate = useNavigate();

  const [contas, setContas] = useState([]);
  const [currentUser, setUser] = useState(null);
  
  async function getAccounts(id){
    try {
      const accountsFromApi = await api.post('/accounts/list', {userID: id})
      if(accountsFromApi.data.status == 200) return setContas(accountsFromApi.data.result)
      return alert(usersFromApi.data.error);
    } catch (e) {
      return alert(e.message);
    }
  }

  const [transacoes, setTrans] = useState({});

  useEffect(() =>{
    const storedUser = JSON.parse(sessionStorage.getItem("acesso"));
      if (!storedUser) {
        return navigate('/');
      }
    setUser(storedUser);
    getAccounts(storedUser.id);
    searchTransactions(storedUser.id);
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

  async function searchTransactions(id){
    const inputs = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '')
    );
    try {
      const transactionsFromApi = await api.post('/transactions/list', {userID: id, data: {...inputs}});

      if (transactionsFromApi.data.status == 200) return setTrans(transactionsFromApi.data.result);

      return alert(transactionsFromApi.data.error);
    } catch (e) {
      return alert(e.message);
    }
    
  }

  async function cancelTransaction(id){
    try {
      const transactionsFromApi = await api.post('/transactions/update', {
        userID: currentUser.id,
        data: {id: id, fields: {status: "Cancelada"}}
      });
      if (transactionsFromApi.data.status == 200) {
        searchTransactions(currentUser.id);
        return alert("Transacao cancelada com sucesso!");
      }
      return alert(transactionsFromApi.data.error);
    } catch (e) {
      return alert(e.message);
    }
  }

  async function reactivateTransaction(id){
    try {
      const transactionsFromApi = await api.post('/transactions/update', {
        userID: currentUser.id,
        data: {id: id, fields: {status: "Concluida"}}
      });
      if (transactionsFromApi.data.status == 200) {
        searchTransactions(currentUser.id);
        return alert("Transacao retomada com sucesso!");
      }
      return alert(transactionsFromApi.data.error);
    } catch (e) {
      return alert(e.message);
    }
  }

  if (!currentUser) return <p>Carregando ...</p>;
  return (
    <div className='container'>
      <Menu user={currentUser}/>
        
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
              <input type="number" name="value" placeholder="Valor" maxLength={20} step="0.01" onChange={handleChange}/>
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

            <button type="button" onClick={() =>searchTransactions(currentUser.id)}>Filtrar</button>
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
                <th>Criação</th>
                <th>Alteração</th>
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
                    <td>{t.createdBy.name}</td>
                    <td>{t.updatedBy.name}</td>
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
