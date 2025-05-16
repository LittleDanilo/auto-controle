//Funcao criada com o uso de IA

export function validarData(dataStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dataStr)) {
      return { valido: false, erro: 'Data inválida.' };
    }
  
    const [ano, mes, dia] = dataStr.split('-').map(Number);
  
    if (mes < 1 || mes > 12) {
      return { valido: false, erro: 'Data inválida.' };
    }
  
    const ehBissexto = (ano) => (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
    const diasPorMes = [31, (ehBissexto(ano) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (dia < 1 || dia > diasPorMes[mes - 1]) {
      return { valido: false, erro: 'Data inválida.' };
    }
  
    return { valido: true };
  }
  