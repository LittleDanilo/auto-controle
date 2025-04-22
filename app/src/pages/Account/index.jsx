import Menu from '../../components/Menu'
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Account() {

  const location = useLocation();
    const { contaRecebida } = location.state || {};
    
    const [desabilitado, setDesabilitado] = useState(!!contaRecebida);
    const [salvarHabilitado, setSalvarHabilitado] = useState(false);
    const [editarHabilitado, setEditarHabilitado] = useState(!!contaRecebida);
    const [cancelarHabilitado, setCancelarHabilitado] = useState(false);
  
    const valorOriginal = {
      nome: contaRecebida?.nome || '',
      tipo: contaRecebida?.tipo || 'Interna',
      descricao: contaRecebida?.descricao || '',
      status: contaRecebida?.status || 'Ativa',
    };
  
    const [form, setForm] = useState({ ...valorOriginal });
  
    useEffect(() => {
      if (!contaRecebida) {
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
      if (contaRecebida) {
        console.log("Salvar edição:", form);
      } else {
        console.log("Criar nova transação:", form);
      }
    };


  return (
    <div className='container'>
      <Menu />
      <form>
      <h1>Pagina de Contas</h1>

        <label>
          Nome:
          <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} disabled={desabilitado}/>
        </label>

        <label>
          Tipo:
          <select name="tipo" value={form.tipo} onChange={handleChange} disabled={desabilitado}>
            <option value="">Interna</option>
            <option value="">Externa</option>
          </select>
        </label>

        <label>Descricao:</label>
          <textarea id="descricao" name="descricao" rows="4" cols="50" value={form.descricao} onChange={handleChange} disabled={desabilitado}></textarea>

        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange} disabled={desabilitado}>
            <option value="Ativa">Ativa</option>
            <option value="Inativa">Inativa</option>
            <option value="Suspensa">Suspensa</option>
          </select>
        </label>

          <p>
          {!contaRecebida ? (
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

export default Account
