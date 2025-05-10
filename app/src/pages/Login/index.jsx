import { useNavigate } from 'react-router-dom';
import React, { useState} from 'react';

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({ 
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleLogin() {
    if (form.email == '' || form.password == '') return alert("Preencha ambos os campos")
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!regex.test(form.email)) return alert("Por favor, insira um e-mail válido.");
    try {
      const usersFromApi = await api.post('/users/login', form);
      if (accountsFromApi.data.status == 200) {
        sessionStorage.setItem("acesso", JSON.stringify(form));
        return navigate('/lista-transacoes');
      }
    } catch(e) {
      return alert(e.message);
    } 
  }

  return (
    <div className='container'>
      <form>
      <h1>Pagina de Login</h1>
        <label>
          Email:
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required/>
        </label>
        <label>
          Senha:
          <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange}/>
        </label>
          <button onClick={handleLogin}>Entrar</button>
      </form>
    </div>
  )
}

export default Login
