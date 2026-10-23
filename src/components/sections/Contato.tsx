import { useState } from 'react';
import { Clock, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { horarios, resumoHorario, site } from '../../data/site';
import { whatsappUrl } from '../../lib/whatsapp';
import { Secao, TituloSecao } from '../ui/Secao';
import { Revelar } from '../ui/Revelar';
import { BotaoLink } from '../ui/Botao';
import { FormularioContato } from '../forms/FormularioContato';

function hojeIndice() {
  return new Date().getDay();
}

export function Contato() {
  const [mapaVisivel, setMapaVisivel] = useState(false);
  const hoje = hojeIndice();

  return (
    <Secao id="contato" fundo="creme" className="overflow-hidden">
      <div className="container-abrace">
        <Revelar>
          <TituloSecao
            etiqueta="Localização e contato"
            titulo={
              <>
                Estamos no Sobradinho, em <span className="text-rosa-700">Patos de Minas.</span>
              </>
            }
            descricao={
              <p>
                Venha nos visitar ou fale com a equipe pelos canais oficiais da ABRACE.
              </p>
            }
          />
        </Revelar>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Coluna de informações */}
          <Revelar className="flex flex-col gap-6">
            <div className="rounded-[1.75rem] border border-rosa-200 bg-white p-7 shadow-suave sm:p-9">
              <ul className="space-y-7">
                <li className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-rosa-100 text-rosa-700">
                    <MapPin className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-rosa-700 uppercase">
                      Endereço
                    </h3>
                    <address className="mt-2 text-[1rem] leading-[1.7] text-tinta-700 not-italic">
                      {site.endereco.logradouro}
                      <br />
                      {site.endereco.bairro}, {site.endereco.cidade} — {site.endereco.uf}
                      <br />
                      CEP {site.endereco.cep}
                    </address>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-turquesa-suave text-turquesa">
                    <Phone className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-rosa-700 uppercase">
                      Telefone
                    </h3>
                    <p className="mt-1">
                      <a
                        href={site.telefone.href}
                        className="inline-flex min-h-11 items-center text-[1.0625rem] font-medium text-tinta-900 underline-offset-[5px] transition-colors duration-300 hover:text-rosa-800 hover:underline"
                      >
                        {site.telefone.exibicao}
                      </a>
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-lilas-suave text-lilas">
                    <Instagram className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-rosa-700 uppercase">
                      Instagram
                    </h3>
                    <p className="mt-1">
                      <a
                        href={site.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-[0.875rem] break-all text-tinta-700 underline-offset-[5px] transition-colors duration-300 hover:text-rosa-800 hover:underline sm:text-[1rem]"
                      >
                        {site.instagram.usuario}
                      </a>
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex flex-col gap-3 border-t border-rosa-200 pt-7 sm:flex-row">
                <BotaoLink href={whatsappUrl('localizacao')} externo tamanho="lg">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Conversar pelo WhatsApp
                </BotaoLink>
                <BotaoLink href={site.maps.url} externo variante="secundario" tamanho="lg">
                  <MapPin className="size-4" aria-hidden="true" />
                  Abrir no Google Maps
                </BotaoLink>
              </div>
            </div>

            {/* Horários */}
            <div className="rounded-[1.75rem] border border-rosa-200 bg-nevoa p-7 sm:p-9">
              <h3 className="flex items-center gap-2.5 text-[0.6875rem] font-semibold tracking-[0.16em] text-rosa-700 uppercase">
                <Clock className="size-4" strokeWidth={1.7} aria-hidden="true" />
                Horário de funcionamento
              </h3>

              <dl className="mt-5 divide-y divide-rosa-200">
                {horarios.map((item) => {
                  const ehHoje = item.indice === hoje;
                  return (
                    <div
                      key={item.dia}
                      className={`flex items-center justify-between gap-4 py-2.5 text-[0.9375rem] ${
                        ehHoje ? 'font-medium text-tinta-900' : 'text-tinta-700'
                      }`}
                    >
                      <dt className="flex items-center gap-2.5">
                        {item.dia}
                        {ehHoje && (
                          <span className="rounded-full bg-rosa-200 px-2 py-0.5 text-[0.625rem] font-semibold tracking-wider text-rosa-800 uppercase">
                            Hoje
                          </span>
                        )}
                      </dt>
                      <dd className={item.aberto ? '' : 'text-tinta-700/55'}>{item.horario}</dd>
                    </div>
                  );
                })}
              </dl>

              <p className="mt-5 text-[0.8125rem] text-tinta-700/75">{resumoHorario}.</p>
            </div>
          </Revelar>

          {/* Coluna do formulário + mapa */}
          <Revelar atraso={90} className="flex flex-col gap-6">
            <FormularioContato />

            <div className="overflow-hidden rounded-[1.75rem] border border-rosa-200 bg-nevoa">
              {mapaVisivel ? (
                <iframe
                  title={`Mapa com a localização da ${site.nomeCompleto}`}
                  src={site.maps.embed}
                  width={600}
                  height={340}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[18rem] w-full border-0 sm:h-[21rem]"
                />
              ) : (
                <div className="flex h-[18rem] flex-col items-center justify-center gap-4 p-7 text-center sm:h-[21rem]">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-rosa-100 text-rosa-700">
                    <MapPin className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <p className="max-w-xs text-[0.9375rem] leading-relaxed text-tinta-700">
                    O mapa é carregado sob demanda para manter a página leve.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMapaVisivel(true)}
                      className="rounded-full border border-rosa-300 bg-white px-5 py-2.5 text-[0.875rem] font-medium text-tinta-800 transition-colors duration-300 hover:border-rosa-500 hover:text-rosa-800"
                    >
                      Carregar mapa
                    </button>
                    <BotaoLink
                      href={site.maps.url}
                      externo
                      variante="discreto"
                      className="px-2"
                    >
                      Abrir no Google Maps
                    </BotaoLink>
                  </div>
                </div>
              )}
            </div>
          </Revelar>
        </div>
      </div>
    </Secao>
  );
}
