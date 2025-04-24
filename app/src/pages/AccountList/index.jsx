import Menu from '../../components/Menu'
import { MdDelete, MdAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api'

function AccountList() {

  const navigate = useNavigate();

  const [contas, setContas] = useState({});

  async function getAccounts(){
    const accountsFromApi = await api.post('/accounts/list')
    setContas(accountsFromApi.data.result)
  }

  const [form, setForm] = useState({
    name: "",
    type: "",
    status: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function searchAccounts(){
    const inputs = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '')
    );
    const accountsFromApi = await api.post('/accounts/list', inputs);

    if (accountsFromApi.data.status == 200) return setContas(accountsFromApi.data.result);
    alert("Erro ao buscar contas.");
  }

  async function deleteAccount(id){
    const accountsFromApi = await api.post('/accounts/update', {id: id, fields: {status: "Suspensa"}});
    if (accountsFromApi.data.status == 200) {
      searchAccounts();
      return alert("Conta suspensa com sucesso!");
    }
    alert("Erro ao suspender conta.");
  }

  async function reactivateAccount(id){
    const accountsFromApi = await api.post('/accounts/update', {id: id, fields: {status: "Ativa"}});
    if (accountsFromApi.data.status == 200) {
      searchAccounts();
      return alert("Conta ativada com sucesso!");
    }
    alert("Erro ao ativar conta.");
  }

  useEffect(() =>{
    getAccounts()
  }, [])
  
  return (
    <div className='container'>
      <Menu />
        
          <form className='container'>
          <h1>Listar de Contas</h1>
            <label>
              Tipo:
              <select name="type" onChange={handleChange}>
                <option value="">Todas</option>
                <option value="Interna">Interna</option>
                <option value="Externa">Externa</option>
              </select>
            </label>

            <label>
              Nome:
              <input type="text" name="name" placeholder="Nome" onChange={handleChange}/>
            </label>

            <label>
              Status:
              <select name="status" onChange={handleChange}>
                <option value="">Todas</option>
                <option value="Ativa">Ativa</option>
                <option value="Inativa">Inativa</option>
                <option value="Suspensa">Suspensa</option>
              </select>
            </label>

            <button type="button" onClick={searchAccounts}>Filtrar</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(contas) && contas.map((c) => (
                <tr 
                  key={c.id}
                  onClick={() => navigate('/contas', { state: { contaRecebida: c } })}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{c.name}</td>
                  <td>{c.type}</td>
                  <td>{c.description}</td>
                  <td>{c.status}</td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      if (c.status === 'Suspensa') {
                        reactivateAccount(c.id);
                      } else {
                        deleteAccount(c.id);
                      }
                    }}
                  >
                    {c.status === 'Suspensa' ? (
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

export default AccountList
