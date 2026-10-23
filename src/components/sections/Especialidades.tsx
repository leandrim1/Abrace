import { ArrowUpRight } from 'lucide-react';
import { especialidades, type Especialidade } from '../../data/site';
import { whatsappUrl, type AssuntoWhatsapp } from '../../lib/whatsapp';
import { Secao, TituloSecao } from '../ui/Secao';
import { Revelar } from '../ui/Revelar';
import { Foto } from '../ui/Foto';
import { BotaoLink } from '../ui/Botao';
import { Chevron } from '../ui/Grafismos';

const acentos = {
  turquesa: { texto: 'text-turquesa', fundo: 'bg-turquesa-suave', traco: 'bg-turquesa' },
  verde: { texto: 'text-verde', fundo: 'bg-verde-suave', traco: 'bg-verde' },
  lilas: { texto: 'text-lilas', fundo: 'bg-lilas-suave', traco: 'bg-lilas' },
} as const;

function Etiqueta({ especialidade }: { especialidade: Especialidade }) {
  const acento = acentos[especialidade.acento];
  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-2 self-start rounded-full ${acento.fundo} px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase ${acento.texto}`}
    >
      <Chevron className="w-3" />
      {especialidade.subtitulo}
    </span>
  );
}

function LinkConsulta({ id, titulo }: { id: string; titulo: string }) {
  return (
    <BotaoLink
      href={whatsappUrl(id as AssuntoWhatsapp)}
      externo
      variante="discreto"
      className="group/link mt-7 font-medium"
      aria-label={`Consultar atendimento de ${titulo} pelo WhatsApp`}
    >
      Consultar atendimento
      <ArrowUpRight
        className="size-4 transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
        aria-hidden="true"
      />
    </BotaoLink>
  );
}

export function Especialidades() {
  const [destaque, ...demais] = especialidades;

  return (
    <Secao id="especialidades" fundo="creme" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-40 size-[30rem] rounded-full bg-rosa-100/60 blur-[110px]"
      />

      <div className="container-abrace relative">
        <Revelar>
          <TituloSecao
            etiqueta="O que oferecemos"
            titulo={
              <>
                Três áreas de atendimento, <span className="text-rosa-700">um mesmo cuidado.</span>
              </>
            }
            descricao={
              <p>
                Cada acompanhamento é definido a partir de avaliação profissional e das necessidades
                de quem chega até nós. Fale com a equipe para entender qual atendimento faz sentido
                no seu caso.
              </p>
            }
          />
        </Revelar>

        {/* Destaque: composição horizontal com moldura em arco */}
        <Revelar atraso={60} className="mt-14 lg:mt-16">
          <article className="grid overflow-hidden rounded-[2rem] border border-rosa-200 bg-white shadow-suave lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative aspect-[5/4] bg-rosa-100 lg:aspect-auto lg:min-h-[24rem]">
              <Foto
                src={destaque.imagem}
                alt={destaque.imagemAlt}
                largura={destaque.largura}
                altura={destaque.altura}
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="absolute inset-0 size-full object-cover object-top"
              />
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <Etiqueta especialidade={destaque} />
              <h3 className="mt-5 text-[1.625rem] font-semibold sm:text-[2rem]">
                {destaque.titulo}
              </h3>
              <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.75] text-tinta-700">
                {destaque.descricao}
              </p>
              <LinkConsulta id={destaque.id} titulo={destaque.titulo} />
            </div>
          </article>
        </Revelar>

        {/* Demais áreas: cartões verticais com imagem no topo */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {demais.map((especialidade, indice) => (
            <Revelar key={especialidade.id} as="article" atraso={100 + indice * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-rosa-200 bg-white shadow-suave transition-shadow duration-500 ease-[cubic-bezier(.22,.61,.36,1)] hover:shadow-elevado">
                <div className="relative aspect-[4/3] overflow-hidden bg-rosa-100">
                  <Foto
                    src={especialidade.imagem}
                    alt={especialidade.imagemAlt}
                    largura={especialidade.largura}
                    altura={especialidade.altura}
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-1 ${acentos[especialidade.acento].traco}`}
                  />
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <Etiqueta especialidade={especialidade} />
                  <h3 className="mt-5 text-[1.375rem] font-semibold sm:text-[1.5rem]">
                    {especialidade.titulo}
                  </h3>
                  <p className="mt-3.5 flex-1 text-[1rem] leading-[1.7] text-tinta-700">
                    {especialidade.descricao}
                  </p>
                  <LinkConsulta id={especialidade.id} titulo={especialidade.titulo} />
                </div>
              </article>
            </Revelar>
          ))}
        </div>

        <Revelar atraso={160}>
          <p className="mt-10 max-w-3xl text-[0.875rem] leading-relaxed text-tinta-700/80">
            As informações desta página são institucionais e não substituem avaliação profissional.
            A definição do atendimento mais adequado é feita pela equipe, caso a caso.
          </p>
        </Revelar>
      </div>
    </Secao>
  );
}
