import Menu from '../../components/Menu'
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../../services/api'

function User() {

  const navigate = useNavigate();

  const [currentUser, setUser] = useState(null);

  const location = useLocation();
  const { usuarioRecebido } = location.state || {};
  const [usuarioAtual, setUsuarioAtual] = useState(usuarioRecebido);
    
    const [desabilitado, setDesabilitado] = useState(!!usuarioRecebido);
    const [salvarHabilitado, setSalvarHabilitado] = useState(false);
    const [editarHabilitado, setEditarHabilitado] = useState(!!usuarioRecebido);
    const [cancelarHabilitado, setCancelarHabilitado] = useState(false);
  
    const valorOriginal = {
      name: usuarioAtual?.name || '',
      email: usuarioAtual?.email || 'Interna',
      password: usuarioAtual?.password || '',
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
      if (!usuarioRecebido) {
        setForm({ ...valorOriginal });
      }
    }, [location.state]);

    useEffect(() => {
      const isEdicao = !!usuarioRecebido;
      if (isEdicao) return setDesabilitado(isEdicao);
      setForm({
        name: "",
        email: "",
        password: "",
      })
    }, [usuarioRecebido]);
    
  
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

    async function createUser(){

      if (form.name == '') return alert("O nome deve ser preenchido")
      const inputs = Object.fromEntries(
        Object.entries(form).filter(([_, v]) => v !== '')
      );
      const accountsFromApi = await api.post('/users/register', inputs)
      if (accountsFromApi.data.status == 200) return alert("Conta criada com sucesso!");
      alert("Erro ao criar conta."); 
    }

    async function updateUser(){

      if (form.name == '') return alert("O nome deve ser preenchido")
      const accountsFromApi = await api.post('/users/update', {
        id: usuarioRecebido.id,
        fields: form
      })
      if (accountsFromApi.data.status == 200) {
        const usuarioAtualizado = { id: usuarioAtual.id, ...form };
        setUsuarioAtual(usuarioAtualizado);

        setDesabilitado(true);
        setSalvarHabilitado(false);
        setEditarHabilitado(true);
        setCancelarHabilitado(false);
        return alert("Conta editada com sucesso!");
      }
      alert("Erro ao editar conta."); 
    }
    
  if (!currentUser) return <p>Carregando ...</p>;
  return (
    <div className='container'>
      <Menu user={currentUser}/>
      <form>
      {!usuarioRecebido ? (<h1>Novo Usuario</h1>) : (<h1>Editar Usuario</h1>)}
      
        <label>
          Nome:
          <input
            type="text" name="name" placeholder="Nome" 
            value={form.name} onChange={handleChange} disabled={desabilitado}/>
        </label>

        <label>
          Email:
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} disabled={desabilitado}/>
        </label>

        <label>
          Senha:
          <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange} disabled={desabilitado}/>
        </label>

          
          {!usuarioRecebido ? (
            <p>
              <button type="button" onClick={createUser}>Criar</button>
            </p>
          ) : (
            <p>
              <button type="button" onClick={handleEditar} disabled={!editarHabilitado}>
                Editar
              </button>
              <button type="button" onClick={updateUser} disabled={!salvarHabilitado}>
                Salvar
              </button>
              <button type="button" onClick={handleCancelar} disabled={!cancelarHabilitado}>
                Cancelar
              </button>
            </p>
          )}
      </form>
    </div>
  )
}

export default User
