import { HeartHandshake, Sparkles, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { principios } from '../../data/site';
import { Secao, TituloSecao } from '../ui/Secao';
import { Revelar } from '../ui/Revelar';
import { ApiceDecorativo } from '../ui/Grafismos';

const visual: { icone: LucideIcon; cor: string; fundo: string }[] = [
  { icone: Sparkles, cor: 'text-rosa-700', fundo: 'bg-rosa-100' },
  { icone: Users, cor: 'text-lilas', fundo: 'bg-lilas-suave' },
  { icone: HeartHandshake, cor: 'text-verde', fundo: 'bg-verde-suave' },
];

export function Abordagem() {
  return (
    <Secao id="abordagem" fundo="nevoa" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <ApiceDecorativo className="absolute -top-16 right-[4%] w-[26rem] text-rosa-300/30 lg:w-[34rem]" />
      </div>

      <div className="container-abrace relative">
        <Revelar>
          <TituloSecao
            etiqueta="Nossa abordagem"
            alinhamento="centro"
            titulo={
              <>
                O cuidado começa pela <span className="text-rosa-700">escuta.</span>
              </>
            }
            descricao={
              <p>
                Princípios que orientam a forma como conduzimos os atendimentos e a comunicação com
                quem acompanha cada pessoa.
              </p>
            }
          />
        </Revelar>

        <ol className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
          {principios.map((principio, indice) => {
            const { icone: Icone, cor, fundo } = visual[indice];
            return (
              <Revelar key={principio.titulo} as="li" atraso={indice * 90} className="h-full">
                <li className="flex h-full flex-col rounded-[1.75rem] border border-rosa-200/80 bg-white/85 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-rosa-300 lg:p-9">
                  <span
                    className={`inline-flex size-12 items-center justify-center rounded-2xl ${fundo} ${cor}`}
                  >
                    <Icone className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  <span className="mt-6 block text-[0.6875rem] font-semibold tracking-[0.18em] text-rosa-700/70 tabular-nums">
                    0{indice + 1}
                  </span>

                  <h3 className="mt-2 text-[1.25rem] font-semibold">{principio.titulo}</h3>
                  <p className="mt-3.5 text-[0.9875rem] leading-[1.75] text-tinta-700">
                    {principio.texto}
                  </p>
                </li>
              </Revelar>
            );
          })}
        </ol>

        <Revelar atraso={160}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[0.875rem] leading-relaxed text-tinta-700/80">
            Estes princípios descrevem a nossa comunicação institucional e não representam
            certificações ou métodos exclusivos.
          </p>
        </Revelar>
      </div>
    </Secao>
  );
}
