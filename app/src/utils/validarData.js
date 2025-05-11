//Funcao criada com o uso de IA

export function validarData(dataStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dataStr)) {
      return { valido: false, erro: 'Formato de data inválido.' };
    }
  
    const [ano, mes, dia] = dataStr.split('-').map(Number);
  
    if (mes < 1 || mes > 12) {
      return { valido: false, erro: 'Mês inválido.' };
    }
  
    const ehBissexto = (ano) => (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
    const diasPorMes = [31, (ehBissexto(ano) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (dia < 1 || dia > diasPorMes[mes - 1]) {
      return { valido: false, erro: 'Dia inválido para o mês ou ano.' };
    }
  
    const dataInserida = new Date(dataStr + 'T00:00:00');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
  
    if (dataInserida > hoje) {
      return { valido: false, erro: 'A data não pode ser no futuro.' };
    }
  
    return { valido: true };
  }
  