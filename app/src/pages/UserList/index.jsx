import Menu from '../../components/Menu'
import { MdDelete, MdAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api'

function UserList() {

  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState({});
  const [currentUser, setUser] = useState(null);

  async function getUsers(id){
    try {
      const accountsFromApi = await api.post('/users/list', {userID: id})
      if(accountsFromApi.data.status == 200) return setUsuarios(accountsFromApi.data.result)
      return alert(usersFromApi.data.error);
    } catch (e) {
      return alert(e.message);
    }
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

  async function searchUsers(){
    const inputs = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '')
    );
    const accountsFromApi = await api.post('/accounts/list', inputs);

    if (accountsFromApi.data.status == 200) return setUsuarios(accountsFromApi.data.result);
    alert("Erro ao buscar usuarios.");
  }

  async function deleteAccount(id){
    const accountsFromApi = await api.post('/accounts/update', {id: id, fields: {status: "Suspensa"}});
    if (accountsFromApi.data.status == 200) {
        searchUsers();
      return alert("Conta suspensa com sucesso!");
    }
    alert("Erro ao suspender conta.");
  }

  async function reactivateAccount(id){
    const accountsFromApi = await api.post('/accounts/update', {id: id, fields: {status: "Ativa"}});
    if (accountsFromApi.data.status == 200) {
        searchUsers();
      return alert("Conta ativada com sucesso!");
    }
    alert("Erro ao ativar conta.");
  }

  useEffect(() =>{
    const storedUser = JSON.parse(sessionStorage.getItem("acesso"));
      if (!storedUser) {
        return navigate('/');
      }
    setUser(storedUser);
    getUsers(storedUser.id)
  }, [])
  
  if (!currentUser) return <p>Carregando ...</p>;
    return (
      <div className='container'>
        <Menu user={currentUser}/>
          <form className='container'>
          <h1>Listar de Usuarios</h1>
        
            <label>
              Nome:
              <input type="text" name="name" placeholder="Nome" onChange={handleChange}/>
            </label>

            <label>
                Email:
                <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
            </label>

            <label>
              Status:
              <select name="status" onChange={handleChange}>
                <option value="">Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Desativado">Desativado</option>
                <option value="Excluido">Excluido</option>
              </select>
            </label>

            <button type="button" onClick={searchUsers}>Filtrar</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(usuarios) && usuarios.map((u) => (
                <tr 
                  key={u.id}
                  onClick={() => navigate('/usuarios', { state: { usuarioRecebido: u } })}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.status}</td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      if (u.status === 'Excluido') {
                        reactivateAccount(u.id);
                      } else {
                        deleteAccount(u.id);
                      }
                    }}
                  >
                    {u.status === 'Excluido' ? (
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

export default UserList
