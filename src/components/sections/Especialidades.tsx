import { ArrowUpRight } from 'lucide-react';
import { especialidades, retrato, type Especialidade } from '../../data/site';
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
      className={`inline-flex w-fit items-center gap-2 rounded-full ${acento.fundo} px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase ${acento.texto}`}
    >
      <Chevron className="w-3" />
      {especialidade.subtitulo}
    </span>
  );
}

function Retratos({ especialidade }: { especialidade: Especialidade }) {
  const sozinha = especialidade.profissionais.length === 1;

  return (
    <ul
      className={
        sozinha
          ? 'mx-auto grid max-w-[17rem] grid-cols-1'
          : 'grid grid-cols-2 gap-4 sm:gap-5'
      }
    >
      {especialidade.profissionais.map((profissional) => (
        <li key={profissional.imagem}>
          <figure className="group/foto relative overflow-hidden rounded-[1.5rem] bg-rosa-100 shadow-suave">
            <Foto
              src={profissional.imagem}
              alt={`${profissional.nome}, ${profissional.cargo.toLowerCase()} da ABRACE.`}
              largura={retrato.largura}
              altura={retrato.altura}
              sizes="(min-width: 1024px) 18vw, (min-width: 640px) 24vw, 44vw"
              className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover/foto:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-1 ${acentos[especialidade.acento].traco}`}
            />
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function Especialidades() {
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

        <div className="mt-16 flex flex-col gap-16 lg:mt-20 lg:gap-24">
          {especialidades.map((especialidade, indice) => {
            // Alterna o lado das fotos para dar ritmo editorial à seção.
            const invertido = indice % 2 === 1;

            return (
              <Revelar key={especialidade.id} as="article">
                <article className="grid items-center gap-10 border-t border-rosa-200 pt-12 first:border-0 first:pt-0 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                  <div className={invertido ? 'lg:order-2' : ''}>
                    <Etiqueta especialidade={especialidade} />

                    <h3 className="mt-5 text-[1.625rem] font-semibold sm:text-[2rem]">
                      {especialidade.titulo}
                    </h3>

                    <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.75] text-tinta-700">
                      {especialidade.descricao}
                    </p>

                    <p className="mt-6 text-[0.8125rem] leading-relaxed text-tinta-700/75">
                      {especialidade.profissionais.length > 1
                        ? 'Profissionais que atuam nesta área:'
                        : 'Profissional que atua nesta área:'}{' '}
                      <span className="font-medium text-tinta-800">
                        {especialidade.profissionais.map((p) => p.nome).join(' e ')}.
                      </span>
                    </p>

                    <BotaoLink
                      href={whatsappUrl(especialidade.id as AssuntoWhatsapp)}
                      externo
                      variante="discreto"
                      className="group/link mt-5 font-medium"
                      aria-label={`Consultar atendimento de ${especialidade.titulo} pelo WhatsApp`}
                    >
                      Consultar atendimento
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </BotaoLink>
                  </div>

                  <div className={invertido ? 'lg:order-1' : ''}>
                    <Retratos especialidade={especialidade} />
                  </div>
                </article>
              </Revelar>
            );
          })}
        </div>

        <Revelar atraso={120}>
          <p className="mt-14 max-w-3xl text-[0.875rem] leading-relaxed text-tinta-700/80">
            As informações desta página são institucionais e não substituem avaliação profissional.
            A definição do atendimento mais adequado é feita pela equipe, caso a caso.
          </p>
        </Revelar>
      </div>
    </Secao>
  );
}
