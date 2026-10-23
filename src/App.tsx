import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Cabecalho } from './components/layout/Cabecalho';
import { Rodape } from './components/layout/Rodape';
import { BotaoFlutuanteWhatsapp } from './components/layout/BotaoFlutuanteWhatsapp';
import { LimiteDeErro } from './components/layout/LimiteDeErro';
import Home from './pages/Home';

const PoliticaPrivacidade = lazy(() => import('./pages/PoliticaPrivacidade'));
const NaoEncontrada = lazy(() => import('./pages/NaoEncontrada'));

/** Restaura o topo ao trocar de rota e honra âncoras vindas de outra página. */
function ControleDeRolagem() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const alvo = document.getElementById(hash.replace('#', ''));
      if (alvo) {
        // Um quadro de atraso garante que a seção já esteja montada.
        requestAnimationFrame(() => alvo.scrollIntoView({ block: 'start' }));
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function Carregando() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Carregando conteúdo…</span>
      <span
        aria-hidden="true"
        className="size-8 animate-spin rounded-full border-2 border-rosa-200 border-t-rosa-700"
      />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Cabecalho />
      <ControleDeRolagem />

      <main id="conteudo">
        <LimiteDeErro>
          <Suspense fallback={<Carregando />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
              <Route path="*" element={<NaoEncontrada />} />
            </Routes>
          </Suspense>
        </LimiteDeErro>
      </main>

      <Rodape />
      <BotaoFlutuanteWhatsapp />
    </>
  );
}
