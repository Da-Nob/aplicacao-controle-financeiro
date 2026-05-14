import React, { useState } from 'react';

const DayModal = ({ diaSelecionado, dataReferencia, aoFechar, gastos, aoAdicionar }) => {
  const [titulo, setTitulo] = useState("");
  const [valor, setValor] = useState("");

  const mesAtual = dataReferencia.getMonth();
  const anoAtual = dataReferencia.getFullYear();

  // Filtramos apenas os gastos deste dia/mês/ano específico
  const gastosDesteDia = gastos.filter(g => 
    g.dia === diaSelecionado && g.mes === mesAtual && g.ano === anoAtual
  );

  const totalDia = gastosDesteDia.reduce((acc, g) => acc + g.valor, 0);

  const salvarGasto = () => {
    if (!titulo || !valor) return;
    const novo = {
      id: Math.random(),
      titulo,
      valor: parseFloat(valor),
      dia: diaSelecionado,
      mes: mesAtual,
      ano: anoAtual
    };
    aoAdicionar([...gastos, novo]);
    setTitulo("");
    setValor("");
  };

  const aoExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja apagar este gasto?")) {
      aoAdicionar(gastos.filter(g => g.id !== id));
    }
  };

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Gastos de {diaSelecionado}/{mesAtual + 1}</h2>
        
        <div className="lista-gastos">
          {gastosDesteDia.map(g => (
            <div key={g.id} className="item-gasto">
              <span>{g.titulo}</span>
              <span>{g.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              <button onClick={() => aoExcluir(g.id)}>🗑️</button>
            </div>
          ))}
        </div>

        <div className="total-dia">
          <strong>Total: {totalDia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
        </div>

        <div className="formulario-gasto">
          <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="O que comprou?" />
          <input type="number" value={valor} onChange={e => setValor(e.target.value)} placeholder="Valor" />
          <button onClick={salvarGasto}>Adicionar</button>
        </div>
        
        <button className="botao-fechar" onClick={aoFechar}>Fechar</button>
      </div>
    </div>
  );
};

export default DayModal;