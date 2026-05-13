import React, { useState } from 'react';

const DayModal = ({ diaSelecionado, aoFechar, gastos, aoAdicionar}) => {
  // 1. Estados de memória do componente
  const [gastosDoDia, setGastosDoDia] = useState([]); // Simulando a lista de gastos
  const [titulo, setTitulo] = useState("");
  const [valor, setValor] = useState("");

  // 2. Função de ação do formulário
  const salvarValorGasto = () => {
    const novoGasto = {
      id: Math.random(),
      titulo: titulo,
      valor: parseFloat(valor), // parseFloat garante que o texto digitado seja tratado como número
      dia: diaSelecionado
    };
    
    // Usa a prop 'aoAdicionar' e a lista 'gastos' vindas do pai
    aoAdicionar([...gastosDoDia, novoGasto]);

    // Limpa os campos após salvar
    setTitulo("");
    setValor("");
  };

  const gastosDesteDia = gastos.filter((gasto) => gasto.dia === diaSelecionado)

  // 3. Renderização visual
  return (
    <div className="modal">
      <h2>Gastos do dia {diaSelecionado}</h2>
      
      {/* Lista Dinâmica */}
      <div className="lista-gastos">
        {gastosDesteDia.map(( gasto) => (
          <div key={gasto.id} className="item-gasto">
            <span>{gasto.titulo}</span>
            <span>{gasto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        ))}
      </div>

      {/* Formulário de Adição */}
      <div className="formulario-gasto">
        <input 
          type="text" 
          placeholder="Nome do gasto" 
          value={titulo} 
          onChange={e => setTitulo(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Valor" 
          value={valor} 
          onChange={e => setValor(e.target.value)} 
        />  
        <button onClick={salvarValorGasto}>Adicionar Gasto</button>
      </div>

      {/* Botão de Fechar */}
      <button onClick={() => aoFechar(null)}>Fechar</button>
    </div>
  );
}

export default DayModal;