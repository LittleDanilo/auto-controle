import Menu from '../../components/Menu'
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../../services/api'

function Account() {

  const navigate = useNavigate();

  const [currentUser, setUser] = useState(null);

  const location = useLocation();
  const { contaRecebida } = location.state || {};
  const [contaAtual, setContaAtual] = useState(contaRecebida);
    
    const [desabilitado, setDesabilitado] = useState(!!contaRecebida);
    const [salvarHabilitado, setSalvarHabilitado] = useState(false);
    const [editarHabilitado, setEditarHabilitado] = useState(!!contaRecebida);
    const [cancelarHabilitado, setCancelarHabilitado] = useState(false);
  
    const valorOriginal = {
      name: contaAtual?.name || '',
      type: contaAtual?.type || 'Interna',
      description: contaAtual?.description || '',
      status: contaAtual?.status || 'Ativa',
    };
  
    const [form, setForm] = useState({ ...valorOriginal });

    useEffect(() => {
      const storedUser = JSON.parse(sessionStorage.getItem("acesso"));
      if (!storedUser) {
        return navigate('/');
      }
      setUser(storedUser);
    }, []);
  
    useEffect(() => {
      if (!contaRecebida) {
        setForm({ ...valorOriginal });
      }
    }, [location.state]);

    useEffect(() => {
      const isEdicao = !!contaRecebida;
      if (isEdicao) return setDesabilitado(isEdicao);
      setForm({
        name: "",
        type: "Interna",
        description: "",
      })
      return setDesabilitado(isEdicao)
    }, [contaRecebida]);
    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleEditar = () => {
      setDesabilitado(false);
      setSalvarHabilitado(true);
      setEditarHabilitado(false);
      setCancelarHabilitado(true);
    };
  
    const handleCancelar = () => {
      setForm({ ...valorOriginal });
      setDesabilitado(true);
      setSalvarHabilitado(false);
      setEditarHabilitado(true);
      setCancelarHabilitado(false);
    };

    async function createAccount(){

      if (form.name == '') return alert("O nome deve ser preenchido")
      const inputs = Object.fromEntries(
        Object.entries(form).filter(([_, v]) => v !== '')
      );

      try {
        const accountsFromApi = await api.post('/accounts/register', {
          userID: currentUser.id,
          data: inputs
        })

        if (accountsFromApi.data.status == 200) {
          setForm({name: "",type: "Interna",description: ""}) // Limpa o formulario
          return alert("Conta criada com sucesso!");
        }
        return alert(accountsFromApi.data.error);
      } catch (e) {
        return alert(e.message); 
      }  
    }

    async function updateAccount(){

      if (form.name == '') return alert("O nome deve ser preenchido")
      try {
        const accountsFromApi = await api.post('/accounts/update', {
          userID: currentUser.id,
          data: {id: contaRecebida.id, fields: form}
        })

        if (accountsFromApi.data.status == 200) {
          const contaAtualizada = { id: contaAtual.id, ...form };
          setContaAtual(contaAtualizada);
          setDesabilitado(true);
          setSalvarHabilitado(false);
          setEditarHabilitado(true);
          setCancelarHabilitado(false);
          return alert("Conta alterada com sucesso!");
        }
          return alert(accountsFromApi.data.error);
      } catch (e) {
        return alert(e.message); 
      }
    }

    
  if (!currentUser) return <p>Carregando ...</p>;
  return (
    <div className='container'>
      <Menu user={currentUser}/>
      <form>
      {!contaRecebida ? (<h1>Nova Conta</h1>) : (<h1>Editar Conta</h1>)}
      
        <label>
          Nome:
          <input
            type="text" name="name" placeholder="Nome" maxLength="30"
            value={form.name} onChange={handleChange} disabled={desabilitado}/>
        </label>

        <label>
          Tipo:
          <select name="type" value={form.type} onChange={handleChange} disabled={desabilitado}>
            <option value="Interna">Interna</option>
            <option value="Externa">Externa</option>
          </select>
        </label>

        <label>Descricao:</label>
        <textarea name="description" rows="4" cols="50" maxLength="200"
          value={form.description} onChange={handleChange} disabled={desabilitado}>
        </textarea>

          
          {!contaRecebida ? (
            <p>
              <button type="button" onClick={createAccount}>Criar</button>
            </p>
          ) : (
            <>
            <label>
              Status:
              <select name="status" value={form.status} onChange={handleChange} disabled={desabilitado}>
                <option value="Ativa">Ativa</option>
                <option value="Inativa">Inativa</option>
                <option value="Suspensa">Suspensa</option>
              </select>
            </label>
            <p>
              <button type="button" onClick={handleEditar} disabled={!editarHabilitado}>
                Editar
              </button>
              <button type="button" onClick={updateAccount} disabled={!salvarHabilitado}>
                Salvar
              </button>
              <button type="button" onClick={handleCancelar} disabled={!cancelarHabilitado}>
                Cancelar
              </button>
            </p></>
          )}
      </form>
    </div>
  )
}

export default Account
