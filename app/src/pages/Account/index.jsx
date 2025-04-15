import './style.css'
import Menu from '../../components/Menu'

function Account() {


  return (
    <div className='container'>
      <Menu />
      <form>
      <h1>Pagina de Contas</h1>

        <label>
          Nome:
          <input type="text" name="nome" placeholder="Nome" />
        </label>

        <label>
          Tipo:
          <select name="origem">
            <option value="">Interna</option>
            <option value="">Externa</option>
          </select>
        </label>

        <label>Descricao:</label>
          <textarea id="descricao" name="descricao" rows="4" cols="50"></textarea>
                  
        <p><button type='submit'>Criar</button>
        <button>Cancelar</button></p>
      </form>
    </div>
  )
}

export default Account
