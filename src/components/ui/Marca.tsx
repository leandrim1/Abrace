import { Link } from 'react-router-dom';
import { site } from '../../data/site';

type Props = {
  /** Variante clara para fundos escuros (rodapé). */
  claro?: boolean;
  tamanho?: 'sm' | 'md';
  className?: string;
};

/**
 * Lockup da marca: logo oficial + assinatura tipográfica.
 * A logo nunca é recolorida — apenas o texto ao lado muda de tom.
 */
export function Marca({ claro = false, tamanho = 'md', className = '' }: Props) {
  const alturaLogo = tamanho === 'sm' ? 'h-11' : 'h-13 lg:h-15';

  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label={`${site.nomeCompleto} — ir para o início`}
    >
      <img
        src="/img/logo-abrace.png"
        alt=""
        width={640}
        height={610}
        className={`${alturaLogo} w-auto transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:-translate-y-0.5`}
        decoding="async"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.0625rem] font-semibold tracking-[0.22em] ${
            claro ? 'text-rosa-100' : 'text-tinta-900'
          }`}
        >
          ABRACE
        </span>
        <span
          className={`mt-1.5 text-[0.6875rem] font-medium tracking-[0.13em] uppercase ${
            claro ? 'text-rosa-300' : 'text-rosa-700'
          }`}
        >
          {site.descritor}
        </span>
      </span>
    </Link>
  );
}
