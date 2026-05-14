import React, { useState } from 'react';
import DayModal from './DayModal';

const Calendar = () => {
  const [todosOsGastos, setTodosOsGastos] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [dataReferencia, setDataReferencia] = useState(new Date());

  const mudarMes = (direcao) => {
    const novaData = new Date(dataReferencia);
    novaData.setMonth(dataReferencia.getMonth() + direcao);
    setDataReferencia(novaData);
  };

  const nomeMes = dataReferencia.toLocaleString('pt-BR', { month: 'long' });
  const ano = dataReferencia.getFullYear();
  const mesAtual = dataReferencia.getMonth();

  // Lógica para calcular quantos dias tem o mês atual
  const diasNoMes = new Date(ano, mesAtual + 1, 0).getDate();
  const arrayDias = Array.from({ length: diasNoMes }, (_, i) => i + 1);

  return (
    <div className="calendario-container">
      <header className="calendario-header">
        <button onClick={() => mudarMes(-1)}>&lt;</button>
        <h1 style={{ textTransform: 'capitalize' }}>{nomeMes} {ano}</h1>
        <button onClick={() => mudarMes(1)}>&gt;</button>
      </header>

      <div className="calendario-grid">
        {arrayDias.map((dia) => {
          // Verifica se este dia específico tem algum gasto salvo
          const temGasto = todosOsGastos.some(g => 
            g.dia === dia && g.mes === mesAtual && g.ano === ano
          );

          return (
            <button 
              key={dia} 
              className={`dia-botao ${temGasto ? 'com-gasto' : ''}`}
              onClick={() => setDiaSelecionado(dia)}
            >
              {dia}
            </button>
          );
        })}
      </div>

      {diaSelecionado && (
        <DayModal 
          diaSelecionado={diaSelecionado}
          dataReferencia={dataReferencia}
          aoFechar={() => setDiaSelecionado(null)}
          gastos={todosOsGastos}
          aoAdicionar={setTodosOsGastos}
        />
      )}
    </div>
  );
};

export default Calendar;