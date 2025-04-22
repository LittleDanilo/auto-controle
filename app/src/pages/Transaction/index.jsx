import Menu from '../../components/Menu'
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Transaction() {

  const location = useLocation();
  const { transacaoRecebida } = location.state || {};
  
  const [desabilitado, setDesabilitado] = useState(!!transacaoRecebida);
  const [salvarHabilitado, setSalvarHabilitado] = useState(false);
  const [editarHabilitado, setEditarHabilitado] = useState(!!transacaoRecebida);
  const [cancelarHabilitado, setCancelarHabilitado] = useState(false);

  const valorOriginal = {
    origem: transacaoRecebida?.conta_origem || '',
    destino: transacaoRecebida?.conta_destino || '',
    valor: transacaoRecebida?.valor || '',
    data: transacaoRecebida?.data_transferencia?.slice(0, 10) || '',
    descricao: transacaoRecebida?.descricao || '',
    status: transacaoRecebida?.status || 'Concluida',
  };

  const [form, setForm] = useState({ ...valorOriginal });

  useEffect(() => {
    if (!transacaoRecebida) {
      setForm({ ...valorOriginal });
    }
  }, [location.state]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transacaoRecebida) {
      console.log("Salvar edição:", form);
    } else {
      console.log("Criar nova transação:", form);
    }
  };


  const contas = [
    {
      id_conta: 1,
      nome: "Conta Corrente Interna 1",
      descricao: "Conta utilizada para transações internas",
      tipo: "Interna",
      status: "Ativa",
      created_at: "2025-04-10T10:00:00",
      updated_at: "2025-04-10T10:00:00"
    },
    {
      id_conta: 2,
      nome: "Conta Corrente Interna 2",
      descricao: "Conta utilizada para transações internas",
      tipo: "Interna",
      status: "Ativa",
      created_at: "2025-04-10T10:30:00",
      updated_at: "2025-04-10T10:30:00"
    },
    {
      id_conta: 3,
      nome: "Conta Corrente Interna 3",
      descricao: "Conta utilizada para transações internas",
      tipo: "Interna",
      status: "Suspensa",
      created_at: "2025-04-11T12:00:00",
      updated_at: "2025-04-11T12:00:00"
    },
    {
      id_conta: 4,
      nome: "Conta Corrente Externa 1",
      descricao: "Conta externa utilizada para pagamento de serviços",
      tipo: "Externa",
      status: "Ativa",
      created_at: "2025-04-10T09:00:00",
      updated_at: "2025-04-10T09:00:00"
    },
    {
      id_conta: 5,
      nome: "Conta Corrente Externa 2",
      descricao: "Conta externa utilizada para pagamento de fornecedores",
      tipo: "Externa",
      status: "Ativa",
      created_at: "2025-04-10T11:00:00",
      updated_at: "2025-04-10T11:00:00"
    },
    {
      id_conta: 6,
      nome: "Conta Corrente Externa 3",
      descricao: "Conta externa de operações bancárias",
      tipo: "Externa",
      status: "Inativa",
      created_at: "2025-04-10T14:00:00",
      updated_at: "2025-04-10T14:00:00"
    }
  ];

  return (
    <div className='container'>
      <Menu />
      <form>
      <h1>Pagina de Transacoes</h1>
        <label>
          Origem:
          <select name="origem" value={form.origem} onChange={handleChange} disabled={desabilitado}>
            <option value="">Todas</option>
            {contas.map((conta) => (
              <option key={conta.id_conta} value={conta.id_conta}>
              {conta.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Destino:
          <select name="destino" value={form.destino} onChange={handleChange} disabled={desabilitado}>
            <option value="">Todas</option>
            {contas.map((conta) => (
              <option key={conta.id_conta} value={conta.id_conta}>
                {conta.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Valor:
          <input type="number" name="valor" placeholder="Valor" value={form.valor} onChange={handleChange} disabled={desabilitado}/>
        </label>

        <label>
          Data:
          <input type="date" name="data" value={form.data} onChange={handleChange} disabled={desabilitado}/>
        </label>

        <label>Descricao:</label>
          <textarea id="descricao" name="descricao" rows="4" cols="50" value={form.descricao} onChange={handleChange} disabled={desabilitado}></textarea>
        
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
            <button type="button" onClick={handleSubmit}>Criar</button>
          ) : (
            <>
              <button type="button" onClick={handleEditar} disabled={!editarHabilitado}>
                Editar
              </button>
              <button type="button" onClick={handleSubmit} disabled={!salvarHabilitado}>
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
