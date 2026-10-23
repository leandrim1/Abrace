import { useEffect, useState } from 'react';

/** Destaca no menu a seção visível na tela. */
export function useSecaoAtiva(ids: string[]) {
  const [ativa, setAtiva] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const elementos = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elementos.length === 0) return;

    const visiveis = new Map<string, number>();

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) visiveis.set(entrada.target.id, entrada.intersectionRatio);
          else visiveis.delete(entrada.target.id);
        }

        let melhorId = '';
        let melhorRazao = 0;
        visiveis.forEach((razao, id) => {
          if (razao > melhorRazao) {
            melhorRazao = razao;
            melhorId = id;
          }
        });

        if (melhorId) setAtiva(melhorId);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.5, 1] },
    );

    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [ids]);

  return ativa;
}
