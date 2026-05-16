import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import Calendar from './components/Calendar';
import { auth, provider } from './firebase';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const pararDeObservar = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });

    return () => pararDeObservar();
  }, []);

  const entrarComGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (erro) {
      console.error('Erro ao fazer login:', erro);
      alert('Não foi possível fazer login.');
    }
  };

  const sair = async () => {
    await signOut(auth);
  };

  if (carregando) {
    return (
      <main className="app-shell">
        <section className="app-frame">
          <p>Carregando...</p>
        </section>
      </main>
    );
  }

  if (!usuario) {
    return (
      <main className="app-shell">
        <section className="app-frame" aria-label="Login do aplicativo financeiro">
          <header className="app-title">
            <span className="wallet-icon" aria-hidden="true">
              <span className="wallet-shape">
                <span className="wallet-coin" />
              </span>
            </span>

            <h1>Aplicativo Financeiro</h1>
          </header>

          <div className="login-box">
            <h2>Entre para salvar seus dados</h2>
            <p>Use sua conta Google para acessar seus gastos no computador e no celular.</p>

            <button className="botao-adicionar" type="button" onClick={entrarComGoogle}>
              Entrar com Google
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="app-frame" aria-label="Aplicativo financeiro">
        <header className="app-title">
          <span className="wallet-icon" aria-hidden="true">
            <span className="wallet-shape">
              <span className="wallet-coin" />
            </span>
          </span>

          <div>
            <h1>Aplicativo Financeiro</h1>
            <p className="usuario-logado">
              Logado como {usuario.displayName || usuario.email}
            </p>
          </div>

          <button className="botao-sair" type="button" onClick={sair}>
            Sair
          </button>
        </header>

        <Calendar usuario={usuario} />
      </section>
    </main>
  );
}

export default App;