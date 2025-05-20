import Menu from '../../components/Menu'
import { MdDelete, MdAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api'

function AccountList() {

  const navigate = useNavigate();

  const [contas, setContas] = useState({});
  const [currentUser, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "",
    status: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function searchAccounts(id){
    
    const inputs = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '')
    );
    try {
      const accountsFromApi = await api.post('/accounts/list', {
        userID: id,
        data: inputs || {}
      })

      if (accountsFromApi.data.status == 200) return setContas(accountsFromApi.data.result);
      return alert(accountsFromApi.data.error);

    } catch (e) {
      return alert(e.message); 
    }
  }

  async function deleteAccount(id){
    try {
      const accountsFromApi = await api.post('/accounts/update', {
        userID: currentUser.id,
        data: {id: id, fields: {status: "Suspensa"}}
      });

      if (accountsFromApi.data.status == 200) {
        searchAccounts(currentUser.id);
        return alert("Conta suspensa com sucesso!");
      }

      return alert(accountsFromApi.data.error);
    } catch (e) {
      return alert(e.message); 
    }
  }

  async function reactivateAccount(id){
    try {
      const accountsFromApi = await api.post('/accounts/update', {
        userID: currentUser.id,
        data: {id: id, fields: {status: "Ativa"}}
      });
      
      if (accountsFromApi.data.status == 200) {
        searchAccounts(currentUser.id);
        return alert("Conta ativada com sucesso!");
      }

      return alert(accountsFromApi.data.error);
    } catch (e) {
      return alert(e.message); 
    }
  }

  useEffect(() =>{
    const storedUser = JSON.parse(sessionStorage.getItem("acesso"));
      if (!storedUser) {
        return navigate('/');
      }
    setUser(storedUser);
    searchAccounts(storedUser.id);
  }, [])

  if (!currentUser) return <p>Carregando ...</p>;
    return (
      <div className='container'>
        <Menu user={currentUser}/>
          <form className='container'>
          <h1>Lista de Contas</h1>
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
              <input type="text" name="name" placeholder="Nome" maxLength="30" onChange={handleChange}/>
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

            <button type="button" onClick={() =>searchAccounts(currentUser.id)}>Filtrar</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Criação</th>
                <th>Alteração</th>
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
                  <td>{c.createdBy.name}</td>
                  <td>{c.updatedBy.name}</td>
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
