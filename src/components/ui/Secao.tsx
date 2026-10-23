import type { ReactNode } from 'react';
import { Chevron } from './Grafismos';

type SecaoProps = {
  id?: string;
  children: ReactNode;
  /** Alterna o ritmo visual entre branco, rosa névoa e creme. */
  fundo?: 'creme' | 'nevoa' | 'branco';
  className?: string;
  espacamento?: 'normal' | 'compacto';
};

export function Secao({
  id,
  children,
  fundo = 'creme',
  className = '',
  espacamento = 'normal',
}: SecaoProps) {
  const fundos = {
    creme: 'bg-creme',
    nevoa: 'bg-nevoa',
    branco: 'bg-white',
  } as const;

  const alturas =
    espacamento === 'compacto' ? 'py-14 sm:py-16' : 'py-20 sm:py-24 lg:py-28';

  return (
    <section id={id} className={`relative ${fundos[fundo]} ${alturas} ${className}`}>
      {children}
    </section>
  );
}

type TituloProps = {
  etiqueta?: string;
  titulo: ReactNode;
  descricao?: ReactNode;
  alinhamento?: 'esquerda' | 'centro';
  className?: string;
  nivel?: 2 | 3;
};

export function TituloSecao({
  etiqueta,
  titulo,
  descricao,
  alinhamento = 'esquerda',
  className = '',
  nivel = 2,
}: TituloProps) {
  const Tag = nivel === 2 ? 'h2' : 'h3';
  const centro = alinhamento === 'centro';

  return (
    <div className={`${centro ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {etiqueta && (
        <p
          className={`flex items-center gap-2.5 text-[0.6875rem] font-semibold tracking-[0.18em] text-rosa-700 uppercase ${
            centro ? 'justify-center' : ''
          }`}
        >
          <Chevron className="w-3.5 shrink-0 text-rosa-500" />
          {etiqueta}
        </p>
      )}
      <Tag className="mt-4 text-[1.875rem] leading-[1.15] font-semibold sm:text-[2.25rem] lg:text-[2.625rem]">
        {titulo}
      </Tag>
      {descricao && (
        <div className="mt-5 text-[1.0625rem] leading-[1.75] text-tinta-700">{descricao}</div>
      )}
    </div>
  );
}
