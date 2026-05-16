import { useState, useEffect } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import DayModal from './DayModal';
import { db } from '../firebase';

const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

const Calendar = ({ usuario }) => {
  const [todosOsGastos, setTodosOsGastos] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [dataReferencia, setDataReferencia] = useState(new Date());
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!usuario) return;

    const gastosRef = collection(db, 'users', usuario.uid, 'gastos');

    const pararDeObservar = onSnapshot(
      gastosRef,
      (snapshot) => {
        const gastos = snapshot.docs.map((documento) => documento.data());
        setTodosOsGastos(gastos);
        setCarregando(false);
      },
      (erro) => {
        console.error('Erro ao buscar gastos:', erro);
        setCarregando(false);
      }
    );

    return () => pararDeObservar();
  }, [usuario]);

  const adicionarGasto = async (novoGasto) => {
    const gastoRef = doc(db, 'users', usuario.uid, 'gastos', novoGasto.id);
    await setDoc(gastoRef, novoGasto);
  };

  const excluirGasto = async (id) => {
    const gastoRef = doc(db, 'users', usuario.uid, 'gastos', id);
    await deleteDoc(gastoRef);
  };

  const mudarMes = (direcao) => {
    const novaData = new Date(dataReferencia);
    novaData.setMonth(dataReferencia.getMonth() + direcao);
    setDataReferencia(novaData);
    setDiaSelecionado(null);
  };

  const nomeMes = dataReferencia.toLocaleString('pt-BR', { month: 'long' });
  const ano = dataReferencia.getFullYear();
  const mesAtual = dataReferencia.getMonth();
  const diasNoMes = new Date(ano, mesAtual + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mesAtual, 1).getDay();
  const diasVazios = Array.from({ length: primeiroDiaSemana });
  const arrayDias = Array.from({ length: diasNoMes }, (_, i) => i + 1);

  if (carregando) {
    return <p>Carregando gastos...</p>;
  }

  return (
    <div className="calendario-container">
      <div className="month-bar">
        <button
          className="nav-button"
          type="button"
          aria-label="Mês anterior"
          onClick={() => mudarMes(-1)}
        >
          ‹
        </button>

        <div className="month-title-wrap">
          <span className="month-line" aria-hidden="true" />
          <h2>{nomeMes} {ano}</h2>
          <span className="month-line" aria-hidden="true" />
        </div>

        <button
          className="nav-button"
          type="button"
          aria-label="Próximo mês"
          onClick={() => mudarMes(1)}
        >
          ›
        </button>
      </div>

      <section className="calendar-card">
        <div className="weekdays">
          {diasSemana.map((dia) => (
            <span key={dia}>{dia}</span>
          ))}
        </div>

        <div className="calendario-grid">
          {diasVazios.map((_, index) => (
            <span key={`vazio-${index}`} className="dia-vazio" />
          ))}

          {arrayDias.map((dia) => {
            const temGasto = todosOsGastos.some((gasto) =>
              gasto.dia === dia && gasto.mes === mesAtual && gasto.ano === ano
            );
            const estaSelecionado = diaSelecionado === dia;

            return (
              <button
                key={dia}
                type="button"
                className={`dia-botao ${temGasto ? 'com-gasto' : ''} ${estaSelecionado ? 'selecionado' : ''}`}
                onClick={() => setDiaSelecionado(dia)}
              >
                {dia}
              </button>
            );
          })}
        </div>
      </section>

      {diaSelecionado && (
        <DayModal
          diaSelecionado={diaSelecionado}
          dataReferencia={dataReferencia}
          aoFechar={() => setDiaSelecionado(null)}
          gastos={todosOsGastos}
          aoAdicionar={adicionarGasto}
          aoExcluir={excluirGasto}
        />
      )}
    </div>
  );
};

export default Calendar;