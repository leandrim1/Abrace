import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { faq } from '../../data/site';
import { whatsappUrl } from '../../lib/whatsapp';
import { Secao, TituloSecao } from '../ui/Secao';
import { Revelar } from '../ui/Revelar';
import { BotaoLink } from '../ui/Botao';

export function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);
  const idBase = useId();

  return (
    <Secao id="faq" fundo="nevoa">
      <div className="container-abrace">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Revelar>
            <TituloSecao
              etiqueta="Perguntas frequentes"
              titulo={
                <>
                  Dúvidas que chegam <span className="text-rosa-700">com frequência.</span>
                </>
              }
            />

            <div className="mt-8 rounded-[1.5rem] border border-rosa-200 bg-white/70 p-7">
              <p className="text-[0.9375rem] leading-[1.7] text-tinta-700">
                Não encontrou o que procurava? Nossa equipe responde diretamente sobre valores,
                formas de atendimento, disponibilidade e documentos.
              </p>
              <BotaoLink
                href={whatsappUrl('geral')}
                externo
                variante="secundario"
                className="mt-5"
              >
                Enviar minha dúvida
              </BotaoLink>
            </div>
          </Revelar>

          <Revelar atraso={80}>
            <dl className="divide-y divide-rosa-200 border-y border-rosa-200">
              {faq.map((item, indice) => {
                const estaAberta = aberta === indice;
                const idPainel = `${idBase}-painel-${indice}`;
                const idBotao = `${idBase}-botao-${indice}`;

                return (
                  <div key={item.pergunta}>
                    <dt>
                      <button
                        type="button"
                        id={idBotao}
                        aria-expanded={estaAberta}
                        aria-controls={idPainel}
                        onClick={() => setAberta(estaAberta ? null : indice)}
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={`font-display text-[1.0625rem] leading-snug font-medium transition-colors duration-300 sm:text-[1.125rem] ${
                            estaAberta ? 'text-rosa-800' : 'text-tinta-900 group-hover:text-rosa-800'
                          }`}
                        >
                          {item.pergunta}
                        </span>

                        <span
                          aria-hidden="true"
                          className={`mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-400 ease-[cubic-bezier(.22,.61,.36,1)] ${
                            estaAberta
                              ? 'rotate-45 border-rosa-700 bg-rosa-700 text-white'
                              : 'border-rosa-300 text-rosa-700 group-hover:border-rosa-500'
                          }`}
                        >
                          <Plus className="size-4" />
                        </span>
                      </button>
                    </dt>

                    <dd
                      id={idPainel}
                      role="region"
                      aria-labelledby={idBotao}
                      hidden={!estaAberta}
                      className="pb-7"
                    >
                      <p className="max-w-2xl text-[1rem] leading-[1.75] text-tinta-700">
                        {item.resposta}
                      </p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Revelar>
        </div>
      </div>
    </Secao>
  );
}
