import Menu from '../../components/Menu'
import { MdDelete, MdAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api'

function UserList() {

  const navigate = useNavigate();

  const [usuarios, setListaUsuarios] = useState({});
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

  async function searchUsers(id){
    const inputs = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '')
    );

    try {
      const usersFromApi = await api.post('/users/list', {
        userID: id,
        data: inputs
      })

      if  (usersFromApi.data.status == 200) return setListaUsuarios(usersFromApi.data.result);
      return alert (usersFromApi.data.error);

    } catch (e) {
      return alert(e.message); 
    }
  }

  async function deleteUser(id){
    try {
      const usersFromApi = await api.post('/users/update', {
        userID: currentUser.id,
        data: {id: id, fields: {status: "Excluido"}}
      });

      if (usersFromApi.data.status == 200) {
        searchUsers(currentUser.id);
        return alert("Usuario excluido com sucesso!");
      }
      return alert(usersFromApi.data.error);

    } catch (e) {
      return alert(e.message); 
    }
  }

  async function reactivateUser(id){
    try {
      const usersFromApi = await api.post('/users/update', {
        userID: currentUser.id,
        data: {id: id, fields: {status: "Ativo"}}
      });

      if (usersFromApi.data.status == 200) {
        searchUsers(currentUser.id);
        return alert("Usuario ativado com sucesso!");
      }
      return alert(usersFromApi.data.error);

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
    searchUsers(storedUser.id)
  }, [])
  
  if (!currentUser) return <p>Carregando ...</p>;
    return (
      <div className='container'>
        <Menu user={currentUser}/>
          <form className='container'>
          <h1>Listar de Usuarios</h1>
        
            <label>
              Nome:
              <input type="text" name="name" placeholder="Nome" maxLength={30} onChange={handleChange}/>
            </label>

            <label>
                Email:
                <input type="email" name="email" placeholder="Email" maxLength={30} onChange={handleChange}/>
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

            <button type="button" onClick={searchUsers(currentUser.id)}>Filtrar</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Status</th>
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
                        reactivateUser(u.id);
                      } else {
                        deleteUser(u.id);
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
