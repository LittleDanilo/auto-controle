import Menu from '../../components/Menu'
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import { validarData } from '../../utils/validarData';

function Transaction() {

  const navigate = useNavigate();

  const [currentUser, setUser] = useState(null);
  const location = useLocation();
  const { transacaoRecebida } = location.state || {};
  const [transacaoAtual, setTransacaoAtual] = useState(transacaoRecebida);
  
  const [desabilitado, setDesabilitado] = useState(!!transacaoRecebida);
  const [salvarHabilitado, setSalvarHabilitado] = useState(false);
  const [editarHabilitado, setEditarHabilitado] = useState(!!transacaoRecebida);
  const [cancelarHabilitado, setCancelarHabilitado] = useState(false);

  const valorOriginal = {
    origin: transacaoAtual?.origin || '',
    destiny: transacaoAtual?.destiny || '',
    value: transacaoAtual?.value || '',
    date: transacaoAtual?.date?.slice(0, 10) || '',
    description: transacaoAtual?.description || '',
    status: transacaoAtual?.status || 'Concluida',
  };

  const [form, setForm] = useState({ ...valorOriginal });
  const [contas, setContas] = useState({});

  async function getAccounts(id){
    try {
      const accountsFromApi = await api.post('/accounts/list', {userID: id})
      if(accountsFromApi.data.status == 200) return setContas(accountsFromApi.data.result)
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
    getAccounts(storedUser.id);
  }, [])

  useEffect(() => {
    if (!transacaoRecebida) {
      setForm({ ...valorOriginal });
    }
  }, [location.state]);

  useEffect(() => {
      const isEdicao = !!transacaoRecebida;
      if (isEdicao) return setDesabilitado(isEdicao);
      setForm({
        origin: '',
        destiny: '',
        value: '',
        date: '',
        description: '',
        status: 'Concluida',
      })
      return setDesabilitado(isEdicao)
    }, [transacaoRecebida]);

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

  async function newTransaction(){
    const resultado = validarData(form.date)
    if (!resultado.valido) return alert(resultado.erro) 
    if (form.value == '' || form.date == '' || form.origin == "" || form.destiny == "") return alert("Preencha todos os campos.")
    if (form.origin == form.destiny || !form.origin || !form.destiny) return alert("Informe contas validas e diferentes.");
    if (form.value < 0) return alert("Informe um valor positivo")
     

    const inputs = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '')
    );

    try {
      const transactionsFromApi = await api.post('/transactions/register', {userID: currentUser.id, data: inputs});
      if (transactionsFromApi.data.status == 200) {
        setForm({origin: '',destiny: '',value: '',date: '',description: '',status: 'Concluida'})
        return alert("Transacao registrada com sucesso!");
      }
      return alert(transactionsFromApi.data.error); 
    } catch (e) {
      return alert(e.message);
    }
  }

  async function updateTransaction(){
    
    const resultado = validarData(form.date)
    if (!resultado.valido) return alert(resultado.erro) 

    if (form.value == '' || form.date == '' || form.origin == "" || form.destiny == "") return alert("Preencha todos os campos.")
    if (form.origin == form.destiny || !form.origin || !form.destiny) return alert("Informe contas validas e diferentes.");
    if (form.value < 0) return alert("Informe um valor positivo")
    
    try {
      const accountsFromApi = await api.post('/transactions/update', {
        userID: currentUser.id,
        data: {
          id: transacaoRecebida.id,
          fields: form
        }
      })
  
      if (accountsFromApi.data.status == 200) {
        const TransacaoAtualizada = { id: transacaoAtual.id, ...form };
        setTransacaoAtual(TransacaoAtualizada);
        setDesabilitado(true);
        setSalvarHabilitado(false);
        setEditarHabilitado(true);
        setCancelarHabilitado(false);
        return alert("Transacao editada com sucesso!");
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
      <form>
      {!transacaoRecebida ? (<h1>Nova Transacao</h1>) : (<h1>Editar Transacao</h1>)}
        <label>
          Origem:
          <select name="origin" value={form.origin} onChange={handleChange} disabled={desabilitado}>
            <option value="">Selecione uma conta</option>
            {Array.isArray(contas) && contas.map((conta) => (
              <option key={conta.id} value={conta.id}>
              {conta.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Destino:
          <select name="destiny" value={form.destiny} onChange={handleChange} disabled={desabilitado}>
          <option value="">Selecione uma conta</option>
            {Array.isArray(contas) && contas.map((conta) => (
              <option key={conta.id} value={conta.id}>
                {conta.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Valor:
          <input 
            type="number" name="value" placeholder="Valor" maxLength={30} step="0.01"
            value={form.value} onChange={handleChange} disabled={desabilitado}/>
        </label>

        <label>
          Data:
          <input type="date" name="date" value={form.date} onChange={handleChange} disabled={desabilitado}/>
        </label>

        <label>Descricao:</label>
          <textarea 
            name="description" rows="4" cols="50" maxLength={30}
            value={form.description} onChange={handleChange} disabled={desabilitado}>        
          </textarea>
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange} disabled={desabilitado}>
            <option value="Concluida">Concluida</option>
            <option value="Pendente">Pendente</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </label>
                  
        <p>
          {!transacaoRecebida ? (
            <button type="button" onClick={newTransaction}>Criar</button>
          ) : (
            <>
              <button type="button" onClick={handleEditar} disabled={!editarHabilitado}>
                Editar
              </button>
              <button type="button" onClick={updateTransaction} disabled={!salvarHabilitado}>
                Salvar
              </button>
              <button type="button" onClick={handleCancelar} disabled={!cancelarHabilitado}>
                Cancelar
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default Transaction
