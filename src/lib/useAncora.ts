import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Navega até uma âncora da home respeitando o cabeçalho fixo.
 * Se o visitante estiver em outra rota, volta para a home antes de rolar.
 */
export function useAncora() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (hash: string) => {
      const id = hash.replace('#', '');

      if (pathname !== '/') {
        navigate(`/${hash}`);
        return;
      }

      const alvo = document.getElementById(id);
      if (!alvo) return;

      const prefereMenosMovimento = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      alvo.scrollIntoView({
        behavior: prefereMenosMovimento ? 'auto' : 'smooth',
        block: 'start',
      });

      // Mantém a âncora na URL sem provocar um segundo salto de rolagem.
      window.history.replaceState(null, '', hash);
    },
    [navigate, pathname],
  );
}
