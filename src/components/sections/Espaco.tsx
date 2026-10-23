import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { galeria } from '../../data/site';
import { Secao, TituloSecao } from '../ui/Secao';
import { Revelar } from '../ui/Revelar';
import { Foto } from '../ui/Foto';

/**
 * Mosaico editorial: as proporções de cada par foram calculadas para que
 * os ladrilhos de uma mesma linha terminem na mesma altura na grade de 8 colunas.
 */
const disposicao = [
  'md:col-span-5 aspect-[4/5] md:aspect-square',
  'md:col-span-3 aspect-[3/4] md:aspect-[4/7]',
  'md:col-span-8 aspect-[2/1] md:aspect-[12/5]',
];

export function Espaco() {
  const [aberta, setAberta] = useState<number | null>(null);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const gatilhoRef = useRef<HTMLButtonElement | null>(null);

  const fechar = useCallback(() => {
    setAberta(null);
    gatilhoRef.current?.focus();
  }, []);

  const mover = useCallback((passo: number) => {
    setAberta((atual) => {
      if (atual === null) return atual;
      return (atual + passo + galeria.length) % galeria.length;
    });
  }, []);

  useEffect(() => {
    if (aberta === null) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogoRef.current?.focus();

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') fechar();
      if (evento.key === 'ArrowRight') mover(1);
      if (evento.key === 'ArrowLeft') mover(-1);
      if (evento.key === 'Tab') {
        // Mantém o foco dentro do visualizador.
        const focaveis = dialogoRef.current?.querySelectorAll<HTMLElement>('button');
        if (!focaveis || focaveis.length === 0) return;
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (evento.shiftKey && document.activeElement === primeiro) {
          evento.preventDefault();
          ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault();
          primeiro.focus();
        }
      }
    };

    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aberta, fechar, mover]);

  const foto = aberta !== null ? galeria[aberta] : null;

  return (
    <Secao id="espaco" fundo="creme" className="overflow-hidden">
      <div className="container-abrace">
        <Revelar>
          <TituloSecao
            etiqueta="Nosso espaço"
            titulo={
              <>
                Ambientes pensados para <span className="text-rosa-700">receber bem.</span>
              </>
            }
            descricao={
              <p>
                Salas de atendimento, acesso aos ambientes e a equipe que recebe você —
                registros feitos no próprio espaço da ABRACE.
              </p>
            }
          />
        </Revelar>

        <div className="mt-12 grid gap-4 md:grid-cols-8 lg:mt-14 lg:gap-5">
          {galeria.map((item, indice) => (
            <Revelar
              key={item.src}
              as="figure"
              atraso={indice * 70}
              className={`group relative overflow-hidden rounded-[1.5rem] bg-rosa-100 ${disposicao[indice]}`}
            >
              <figure className="relative size-full">
                <Foto
                  src={item.src}
                  alt={item.alt}
                  largura={item.largura}
                  altura={item.altura}
                  sizes="(min-width: 768px) 45vw, 92vw"
                  className={`size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.05] ${
                    item.foco === 'topo' ? 'object-top' : 'object-center'
                  }`}
                />

                <button
                  type="button"
                  onClick={(evento) => {
                    gatilhoRef.current = evento.currentTarget;
                    setAberta(indice);
                  }}
                  className="absolute inset-0 flex cursor-zoom-in items-end bg-gradient-to-t from-tinta-900/60 via-tinta-900/5 to-transparent p-5 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 focus-visible:opacity-100"
                  aria-label={`Ampliar imagem: ${item.legenda}`}
                >
                  <span className="flex items-center gap-2 text-[0.8125rem] font-medium text-white">
                    <Expand className="size-4" aria-hidden="true" />
                    {item.legenda}
                  </span>
                </button>

                <figcaption className="pointer-events-none absolute bottom-0 left-0 p-5 text-[0.8125rem] font-medium text-white opacity-100 drop-shadow-[0_1px_6px_rgba(45,31,38,.8)] transition-opacity duration-500 group-hover:opacity-0">
                  {item.legenda}
                </figcaption>
              </figure>
            </Revelar>
          ))}
        </div>

        <Revelar atraso={120}>
          <p className="mt-8 max-w-3xl text-[0.875rem] leading-relaxed text-tinta-700/80">
            Imagens registradas no espaço da ABRACE. Os ambientes podem passar por ajustes ao longo
            do tempo.
          </p>
        </Revelar>
      </div>

      {/* Visualizador ampliado */}
      {foto && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-tinta-900/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada: ${foto.legenda}`}
          ref={dialogoRef}
          tabIndex={-1}
          onClick={(evento) => {
            if (evento.target === evento.currentTarget) fechar();
          }}
        >
          <button
            type="button"
            onClick={fechar}
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-white/12 text-white transition-colors duration-300 hover:bg-white/25 sm:top-6 sm:right-6"
            aria-label="Fechar imagem ampliada"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => mover(-1)}
            className="absolute left-3 inline-flex size-11 items-center justify-center rounded-full bg-white/12 text-white transition-colors duration-300 hover:bg-white/25 sm:left-6"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <figure className="max-h-full">
            <img
              src={`${foto.src}.jpg`}
              alt={foto.alt}
              width={foto.largura}
              height={foto.altura}
              className="mx-auto max-h-[78vh] w-auto rounded-2xl object-contain shadow-elevado"
            />
            <figcaption className="mt-4 text-center text-[0.875rem] text-rosa-200">
              {foto.legenda}
              <span className="ml-2 text-rosa-200/60">
                {(aberta ?? 0) + 1} / {galeria.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => mover(1)}
            className="absolute right-3 inline-flex size-11 items-center justify-center rounded-full bg-white/12 text-white transition-colors duration-300 hover:bg-white/25 sm:right-6"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </Secao>
  );
}
