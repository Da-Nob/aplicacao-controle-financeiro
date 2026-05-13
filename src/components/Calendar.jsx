import React from 'react'
import React, {useState} from 'react'
import DayModal from './DayModal'

const Calendar = () => {
    const [dia, setDia] = useState(null);

    // 1. Descobrimos que Abril tem 30 dias
    const diasNoMes = new Date(2026, 4, 0).getDate(); 

    // 2. Descobrimos o dia da semana que cai o dia 1º (ex: 3 para Quarta-feira)
    const espacosVazios = new Date(2026, 3, 1).getDay(); 

    // 3. Criamos o tamanho total da grade e a lista vazia
    const tamanhoTotal = espacosVazios + diasNoMes; 
    const gradeCalendario = new Array(tamanhoTotal).fill(null);

  return (
    <div className="grade-calendario">
      {gradeCalendario.map((item, index) => {
        if (index < espacosVazios) {
            return <div key={index} className="dia-vazio"></div>
        } else {
            const diaAtual = (index - espacosVazios) + 1;
            return <div key={index} className="dia" onClick={() => setDia(diaAtual)}>{diaAtual}</div>
        }
      })}
    </div>
    {dia && <DayModal diaSelecionado={dia}  aoFechar={setDia} />}
  )
}

export default Calendar
