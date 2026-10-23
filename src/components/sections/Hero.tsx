import { ArrowRight, MapPin, MessageCircle, Star } from 'lucide-react';
import { resumoHorario, site } from '../../data/site';
import { whatsappUrl } from '../../lib/whatsapp';
import { useAncora } from '../../lib/useAncora';
import { Botao, BotaoLink } from '../ui/Botao';
import { ApiceDecorativo, PontosDaMarca } from '../ui/Grafismos';
import { Foto } from '../ui/Foto';

export function Hero() {
  const irPara = useAncora();

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-creme pt-[calc(var(--altura-cabecalho)+2.5rem)] pb-16 sm:pb-20 lg:pt-[calc(var(--altura-cabecalho)+4.5rem)] lg:pb-28"
    >
      {/* Campo de fundo: névoa rosada + grafismo derivado do "A" */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 size-[34rem] rounded-full bg-rosa-100 blur-[90px] sm:size-[42rem]" />
        <div className="absolute -bottom-40 -left-32 size-[26rem] rounded-full bg-lilas-suave/70 blur-[100px]" />
        <ApiceDecorativo className="absolute top-10 left-[6%] w-[22rem] text-rosa-300/35 lg:w-[30rem]" />
      </div>

      <div className="container-abrace relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-14 xl:gap-20">
          {/* Coluna editorial */}
          <div className="max-w-xl">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] font-semibold tracking-[0.2em] text-rosa-700 uppercase">
              <span>ABRACE</span>
              <PontosDaMarca />
              <span>Espaço Multidisciplinar</span>
            </p>

            <h1 className="mt-6 text-[2.125rem] leading-[1.12] font-semibold text-tinta-900 sm:text-[2.75rem] lg:text-[3.25rem]">
              Cada pessoa tem seu jeito de crescer.{' '}
              <span className="text-rosa-700">Estamos aqui para acompanhar esse caminho.</span>
            </h1>

            <p className="mt-6 max-w-lg text-[1.0625rem] leading-[1.75] text-tinta-700 sm:text-[1.125rem]">
              Um espaço de acolhimento e cuidado, com atendimentos em fonoaudiologia, terapia
              ocupacional e psicologia.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Botao tamanho="lg" onClick={() => irPara('#especialidades')}>
                Conheça nossas especialidades
                <ArrowRight className="size-4" aria-hidden="true" />
              </Botao>
              <BotaoLink href={whatsappUrl('geral')} externo variante="secundario" tamanho="lg">
                <MessageCircle className="size-4" aria-hidden="true" />
                Fale conosco
              </BotaoLink>
            </div>

            {/* Dados utilitários da primeira dobra */}
            <dl className="mt-11 grid gap-x-8 gap-y-5 border-t border-rosa-200 pt-7 sm:grid-cols-2">
              <div>
                <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-rosa-700 uppercase">
                  Onde estamos
                </dt>
                <dd className="mt-2 flex items-start gap-2 text-[0.9375rem] leading-relaxed text-tinta-700">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-lilas" aria-hidden="true" />
                  <span>
                    {site.endereco.bairro}, {site.endereco.cidade} — {site.endereco.uf}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-rosa-700 uppercase">
                  Atendimento
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-tinta-700">
                  {resumoHorario}
                </dd>
              </div>
            </dl>
          </div>

          {/* Composição fotográfica em arco */}
          <div className="relative">
            <div className="relative mx-auto max-w-[27rem] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -top-5 -right-4 hidden h-[88%] w-[78%] rounded-t-[12rem] rounded-b-[1.5rem] border border-rosa-300/60 sm:block"
              />

              <figure className="relative">
                <div className="moldura-arco veu-foto relative bg-rosa-100 shadow-[0_2px_4px_rgba(61,36,45,.05),0_40px_70px_-40px_rgba(61,36,45,.45)]">
                  <Foto
                    src="/img/equipe"
                    srcSetWebp="/img/equipe-sm.webp 700w, /img/equipe.webp 1100w"
                    srcSetJpg="/img/equipe-sm.jpg 700w, /img/equipe.jpg 1100w"
                    sizes="(min-width: 1024px) 46vw, (min-width: 640px) 70vw, 90vw"
                    alt="Profissionais da ABRACE reunidas no espaço multidisciplinar em Patos de Minas."
                    largura={1100}
                    altura={1375}
                    prioritaria
                    className="w-full object-cover"
                  />
                </div>

                {/* Selo de avaliação — informação pública do Google */}
                <figcaption className="absolute -bottom-5 left-2 flex items-center gap-3 rounded-2xl border border-rosa-200/80 bg-white/95 px-4 py-3 shadow-suave backdrop-blur-sm sm:-left-5 sm:px-5">
                  <span className="flex items-center gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, indice) => (
                      <Star key={indice} className="size-3.5 fill-dourado text-dourado" />
                    ))}
                  </span>
                  <span className="text-[0.8125rem] leading-tight text-tinta-700">
                    <strong className="font-semibold text-tinta-900">
                      {site.avaliacao.nota.toFixed(1).replace('.', ',')}
                    </strong>{' '}
                    no {site.avaliacao.fonte}
                    <span className="block text-[0.6875rem] text-tinta-700/70">
                      {site.avaliacao.total} avaliações
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
