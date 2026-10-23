/**
 * Grafismos derivados da geometria do "A" da logo.
 * São formas abstratas de apoio — a logo nunca é usada como ornamento.
 */

type ChevronProps = { className?: string; cor?: string; espessura?: number };

/** Ápice do "A": usado como marcador de seção e bullet. */
export function Chevron({ className = '', cor = 'currentColor', espessura = 1.6 }: ChevronProps) {
  return (
    <svg viewBox="0 0 24 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2 18 12 2l10 16"
        stroke={cor}
        strokeWidth={espessura}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Sequência de pontos nas cores da assinatura cursiva da logo. */
export function PontosDaMarca({ className = '' }: { className?: string }) {
  const cores = ['#8FA59A', '#A98BB8', '#5FA3A2', '#C98FA0', '#C4994F', '#B57484'];
  return (
    <span className={`inline-flex items-center gap-[0.3rem] ${className}`} aria-hidden="true">
      {cores.map((cor) => (
        <span
          key={cor}
          className="block size-[0.3125rem] rounded-full"
          style={{ backgroundColor: cor }}
        />
      ))}
    </span>
  );
}

/**
 * Marca d'água geométrica: ápices concêntricos inspirados na inclinação do "A".
 * É um grafismo abstrato de apoio — a logo nunca é usada como ornamento.
 */
export function ApiceDecorativo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {[0, 46, 92, 138].map((deslocamento) => (
        <path
          key={deslocamento}
          d={`M24 ${236 - deslocamento} 200 ${16 + deslocamento * 0.42} 376 ${236 - deslocamento}`}
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/** Traço fino com um losango central — separador editorial. */
export function Filete({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`} aria-hidden="true">
      <span className="h-px w-10 bg-rosa-300" />
      <span className="size-1 rotate-45 bg-rosa-500" />
      <span className="h-px w-10 bg-rosa-300" />
    </span>
  );
}
