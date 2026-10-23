type Props = {
  /** Caminho sem extensão: o componente serve .webp com fallback .jpg. */
  src: string;
  alt: string;
  largura: number;
  altura: number;
  className?: string;
  /** Primeira dobra: carrega com prioridade; demais imagens ficam em lazy loading. */
  prioritaria?: boolean;
  sizes?: string;
  srcSetWebp?: string;
  srcSetJpg?: string;
};

export function Foto({
  src,
  alt,
  largura,
  altura,
  className = '',
  prioritaria = false,
  sizes,
  srcSetWebp,
  srcSetJpg,
}: Props) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={srcSetWebp ?? `${src}.webp`}
        {...(sizes ? { sizes } : {})}
      />
      <source type="image/jpeg" srcSet={srcSetJpg ?? `${src}.jpg`} {...(sizes ? { sizes } : {})} />
      <img
        src={`${src}.jpg`}
        alt={alt}
        width={largura}
        height={altura}
        loading={prioritaria ? 'eager' : 'lazy'}
        decoding={prioritaria ? 'sync' : 'async'}
        fetchPriority={prioritaria ? 'high' : 'auto'}
        className={className}
      />
    </picture>
  );
}
