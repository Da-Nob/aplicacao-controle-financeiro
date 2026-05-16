import { useState } from 'react';

const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const DayModal = ({ diaSelecionado, dataReferencia, aoFechar, gastos, aoAdicionar, aoExcluir }) => {
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState('');

  const mesAtual = dataReferencia.getMonth();
  const anoAtual = dataReferencia.getFullYear();

  const gastosDesteDia = gastos.filter((gasto) =>
    gasto.dia === diaSelecionado && gasto.mes === mesAtual && gasto.ano === anoAtual
  );

  const totalDia = gastosDesteDia.reduce((acc, gasto) => acc + gasto.valor, 0);

  const salvarGasto = () => {
    if (!titulo.trim() || !valor) return;

    const novoGasto = {
      id: crypto.randomUUID(),
      titulo: titulo.trim(),
      valor: Number(valor),
      dia: diaSelecionado,
      mes: mesAtual,
      ano: anoAtual,
    };

    aoAdicionar(novoGasto);
    setTitulo('');
    setValor('');
  };

  const excluirGasto = (id) => {
    if (window.confirm('Tem certeza que deseja apagar este gasto?')) {
      aoExcluir(id);
    }
};

  return (
    <div className="modal-overlay" onClick={aoFechar} role="presentation">
      <article
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-icon" aria-hidden="true"><span className="wallet-icon"><span className="wallet-shape"><span className="wallet-coin" /></span></span></div>

        <h2 id="modal-title">Gastos do dia {diaSelecionado}</h2>
        <p className="modal-total">Total: <strong>{formatarMoeda(totalDia)}</strong></p>

        <div className="modal-divider" />

        {gastosDesteDia.length > 0 && (
          <div className="lista-gastos" aria-label="Gastos cadastrados neste dia">
            {gastosDesteDia.map((gasto) => (
              <div key={gasto.id} className="item-gasto">
                <div>
                  <span>{gasto.titulo}</span>
                  <strong>{formatarMoeda(gasto.valor)}</strong>
                </div>
                <button type="button" onClick={() => excluirGasto(gasto.id)} aria-label={`Excluir ${gasto.titulo}`}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}

        <form className="formulario-gasto" onSubmit={(event) => { event.preventDefault(); salvarGasto(); }}>
          <label htmlFor="nome-gasto">Nome do gasto</label>
          <div className="input-group">
            <span aria-hidden="true">🏷️</span>
            <input
              id="nome-gasto"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              placeholder="Ex.: Almoço, Transporte, Supermercado..."
            />
          </div>

          <label htmlFor="valor-gasto">Valor</label>
          <div className="input-group">
            <span>R$</span>
            <input
              id="valor-gasto"
              type="number"
              min="0"
              step="0.01"
              value={valor}
              onChange={(event) => setValor(event.target.value)}
              placeholder="0,00"
            />
          </div>

          <button className="botao-adicionar" type="submit">
            <span aria-hidden="true">✚</span>
            Adicionar Gasto
          </button>
        </form>

        <button className="botao-fechar" type="button" onClick={aoFechar}>
          <span aria-hidden="true">×</span>
          Fechar
        </button>
      </article>
    </div>
  );
};

export default DayModal;
