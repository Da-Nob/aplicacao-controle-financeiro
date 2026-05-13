import React from 'react'
import React from 'useState'

const DayModal = ({diaSelecionado, aoFechar}) => {
    const [titulo, setTitulo] = useState("")
    const [valor, setValor] = useState("")
  return (
    <div className="modal">
      <h2>Gastos do dia {diaSelecionado}</h2>
      {gastosDoDia.map((gasto) => (
        <div key={gasto.id} className="item-gasto">
            <span>{gasto.titulo}</span>
            <span>{gasto.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
        </div>
      ))}
      <div className="formulario-gasto">
        <input type="text" placeholder="Nome do gasto" value={titulo} onChange={e => setTitulo(e.target.value)}
        <input type="number placeholder="Valor value={valor} onChange={e => setValor(e.target.value)}></input>  
        <button>Adicionar Gasto</button>
      </div>
      <button onClick={() => aoFechar(null)}>Fechar</button>
    </div>
  )
}

export default DayModal
