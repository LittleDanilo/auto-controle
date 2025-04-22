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

  useEffect(() =>{
    getAccounts()
  }, [])
  
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

            <label>
              Status:
              <select name="status">
                <option value="Ativa">Ativa</option>
                <option value="Inativa">Inativa</option>
                <option value="Suspensa">Suspensa</option>
              </select>
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
              {Array.isArray(contas) && contas.map((c) => (
                <tr key={c.id}onClick={() => navigate('/contas', { state: { contaRecebida: c } })} style={{ cursor: 'pointer' }}>
                  <td>{c.name}</td>
                  <td>{c.type}</td>
                  <td>{c.description}</td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      if (c.status === 'Suspensa') {
                        console.log('Essa cação será reativada:', c.id);
                      } else {
                        console.log('Deletar cação:', c.id);
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
