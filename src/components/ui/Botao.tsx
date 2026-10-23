import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variante = 'principal' | 'secundario' | 'discreto' | 'claro';
type Tamanho = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full text-center font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(.22,.61,.36,1)] disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px';

const variantes: Record<Variante, string> = {
  principal:
    'bg-rosa-700 text-white shadow-[0_10px_26px_-14px_rgba(150,89,106,.9)] hover:bg-rosa-800 hover:shadow-[0_14px_30px_-14px_rgba(150,89,106,.95)]',
  secundario:
    'border border-rosa-300 bg-white/70 text-tinta-800 hover:border-rosa-500 hover:bg-white',
  discreto:
    'min-h-11 text-rosa-700 hover:text-rosa-800 underline-offset-[6px] hover:underline',
  claro: 'bg-rosa-100 text-rosa-900 hover:bg-white',
};

const tamanhos: Record<Tamanho, string> = {
  md: 'px-5 py-2.5 text-[0.9375rem]',
  lg: 'px-7 py-3.5 text-[0.9375rem]',
};

type Comum = { variante?: Variante; tamanho?: Tamanho; children: ReactNode; className?: string };

export function Botao({
  variante = 'principal',
  tamanho = 'md',
  className = '',
  children,
  ...props
}: Comum & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={`${base} ${variantes[variante]} ${
        variante === 'discreto' ? 'px-1 py-2 text-[0.9375rem]' : tamanhos[tamanho]
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type PropsLink = Comum &
  ComponentPropsWithoutRef<'a'> & {
    /** Links externos recebem rel de segurança automaticamente. */
    externo?: boolean;
  };

export function BotaoLink({
  variante = 'principal',
  tamanho = 'md',
  className = '',
  externo = false,
  children,
  ...props
}: PropsLink) {
  const seguranca = externo
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      className={`${base} ${variantes[variante]} ${
        variante === 'discreto' ? 'px-1 py-2 text-[0.9375rem]' : tamanhos[tamanho]
      } ${className}`}
      {...seguranca}
      {...props}
    >
      {children}
    </a>
  );
}
