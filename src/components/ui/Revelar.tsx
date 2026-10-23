import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Atraso em milissegundos para escalonar elementos irmãos. */
  atraso?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'figure';
};

/**
 * Revela o conteúdo quando ele entra na viewport.
 * A animação é neutralizada por CSS quando há preferência por movimento reduzido.
 */
export function Revelar({ children, atraso = 0, className = '', as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisivel(true);
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setVisivel(true);
            observador.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  const Tag = as as 'div';

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`revelar ${className}`}
      data-visivel={visivel}
      style={atraso ? ({ '--atraso': `${atraso}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
