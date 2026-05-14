import Calendar from './components/Calendar';

function App() {
  return (
    <main className="app-shell">
      <section className="app-frame" aria-label="Aplicativo financeiro">
        <header className="app-title">
          <span className="wallet-icon" aria-hidden="true"><span className="wallet-shape"><span className="wallet-coin" /></span></span>
          <h1>Aplicativo Financeiro</h1>
        </header>

        <Calendar />
      </section>
    </main>
  );
}

export default App;
