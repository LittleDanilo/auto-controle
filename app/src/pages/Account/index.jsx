import Menu from '../../components/Menu'
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api'

function Account() {

  const location = useLocation();
    const { contaRecebida } = location.state || {};

    const inputName = useRef();
    const inputType = useRef();
    const inputDesc = useRef();
    
    const [desabilitado, setDesabilitado] = useState(!!contaRecebida);
    const [salvarHabilitado, setSalvarHabilitado] = useState(false);
    const [editarHabilitado, setEditarHabilitado] = useState(!!contaRecebida);
    const [cancelarHabilitado, setCancelarHabilitado] = useState(false);
  
    const valorOriginal = {
      nome: contaRecebida?.name || '',
      tipo: contaRecebida?.type || 'Interna',
      descricao: contaRecebida?.description || '',
      status: contaRecebida?.status || 'Ativa',
    };
  
    const [form, setForm] = useState({ ...valorOriginal });
  
    useEffect(() => {
      if (!contaRecebida) {
        setForm({ ...valorOriginal });
      }
    }, [location.state]);

    useEffect(() => {
      const isEdicao = !!contaRecebida;
      setDesabilitado(isEdicao);
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (contaRecebida) {
        console.log("Salvar edição:", form);
      } else {
        console.log("Criar nova transação:", form);
      }
    };

    async function createAccount(){
      let rawInputs = {
        name: inputName.current.value,
        type: inputType.current.value,
        description: inputDesc.current.value
      }
      if (rawInputs.name == '') return alert("O nome deve ser preenchido")
      const inputs = Object.fromEntries(
        Object.entries(rawInputs).filter(([_, v]) => v !== '')
      );
      const accountsFromApi = await api.post('/accounts/register', inputs)
      if (accountsFromApi.data.status == 200) return alert("Conta criada com sucesso, confia");
      alert("Deu ruim :("); 
    }

    console.log(contaRecebida);

  return (
    <div className='container'>
      <Menu />
      <form>
      <h1>Pagina de Contas</h1>

        <label>
          Nome:
          <input
            type="text" name="nome" placeholder="Nome" 
            value={form.nome} onChange={handleChange} disabled={desabilitado} ref={inputName}/>
        </label>

        <label>
          Tipo:
          <select name="tipo" value={form.tipo} onChange={handleChange} disabled={desabilitado} ref={inputType}>
            <option value="Interna">Interna</option>
            <option value="Externa">Externa</option>
          </select>
        </label>

        <label>Descricao:</label>
        <textarea id="descricao" name="descricao" rows="4" cols="50"
          value={form.descricao} onChange={handleChange} disabled={desabilitado} ref={inputDesc}>
        </textarea>

          <p>
          {!contaRecebida ? (
            <button type="button" onClick={createAccount}>Criar</button>
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
