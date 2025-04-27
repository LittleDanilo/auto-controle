import Menu from '../../components/Menu'
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../../services/api'

function Transaction() {

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

  async function getAccounts(){
    const accountsFromApi = await api.post('/accounts/list')
    setContas(accountsFromApi.data.result)
  }

  useEffect(() => {
    getAccounts();
  }, []);

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
    if (form.description == '' || form.value == '' || form.date == '') return alert("Preencha todos os campos.")
    if (form.origin == form.destiny || !form.origin || !form.destiny) return alert("Informe contas validas e diferentes.");
    const inputs = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '')
    );
    
    const accountsFromApi = await api.post('/transactions/create', inputs)
    if (accountsFromApi.data.status == 200) return alert("Transacao registrada com sucesso!");
    alert("Erro ao registrar transacao."); 
  }

  async function updateTransaction(){

    if (form.descripton == '' || form.value == '') return alert("A descricao e o valor devem ser preenchidos.")
    if (form.origin == form.destiny) return alert("As contas de origem e destino nao podem ser iguais.");
    const accountsFromApi = await api.post('/transactions/update', {
      id: transacaoRecebida.id,
      fields: form
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
    alert("Erro ao editar transacao."); 
  }

  return (
    <div className='container'>
      <Menu />
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
          <input type="number" name="value" placeholder="Valor" value={form.value} onChange={handleChange} disabled={desabilitado}/>
        </label>

        <label>
          Data:
          <input type="date" name="date" value={form.date} onChange={handleChange} disabled={desabilitado}/>
        </label>

        <label>Descricao:</label>
          <textarea name="description" rows="4" cols="50" value={form.description} onChange={handleChange} disabled={desabilitado}></textarea>
        
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
