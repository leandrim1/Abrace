import { Link } from 'react-router-dom';
import { Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { especialidades, horarios, navegacao, site } from '../../data/site';
import { whatsappUrl, type AssuntoWhatsapp } from '../../lib/whatsapp';
import { useAncora } from '../../lib/useAncora';
import { Marca } from '../ui/Marca';
import { PontosDaMarca } from '../ui/Grafismos';

const anoAtual = new Date().getFullYear();

export function Rodape() {
  const irPara = useAncora();

  return (
    <footer className="bg-tinta-900 text-rosa-200/85">
      <div className="container-abrace py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr] lg:gap-10">
          {/* Marca */}
          <div>
            <Marca claro />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-[1.75] text-rosa-200/70">
              Espaço multidisciplinar dedicado ao cuidado e ao desenvolvimento, em Patos de Minas —
              MG.
            </p>
            <PontosDaMarca className="mt-7" />
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé">
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-rosa-300 uppercase">
              Navegação
            </h2>
            <ul className="mt-4 space-y-1.5">
              {navegacao.map((item) => (
                <li key={item.hash}>
                  <a
                    href={item.hash}
                    onClick={(evento) => {
                      evento.preventDefault();
                      irPara(item.hash);
                    }}
                    className="inline-block py-1 text-[0.9375rem] text-rosa-200/75 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Especialidades */}
          <nav aria-label="Especialidades">
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-rosa-300 uppercase">
              Especialidades
            </h2>
            <ul className="mt-4 space-y-1.5">
              {especialidades.map((especialidade) => (
                <li key={especialidade.id}>
                  <a
                    href={whatsappUrl(especialidade.id as AssuntoWhatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1 text-[0.9375rem] text-rosa-200/75 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
                  >
                    {especialidade.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato e horários */}
          <div>
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-rosa-300 uppercase">
              Contato
            </h2>

            <ul className="mt-5 space-y-4 text-[0.9375rem]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-rosa-400" aria-hidden="true" />
                <address className="leading-[1.7] text-rosa-200/75 not-italic">
                  {site.endereco.logradouro}
                  <br />
                  {site.endereco.bairro}, {site.endereco.cidade} — {site.endereco.uf}
                  <br />
                  CEP {site.endereco.cep}
                </address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-rosa-400" aria-hidden="true" />
                <a
                  href={site.telefone.href}
                  className="inline-block py-1 text-rosa-200/75 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
                >
                  {site.telefone.exibicao}
                </a>
              </li>
              <li className="flex gap-3">
                <Instagram className="mt-0.5 size-4 shrink-0 text-rosa-400" aria-hidden="true" />
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 break-all text-rosa-200/75 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
                >
                  {site.instagram.usuario}
                </a>
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappUrl('geral')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-rosa-100 px-4 py-2.5 text-[0.875rem] font-medium text-rosa-900 transition-colors duration-300 hover:bg-white"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={site.maps.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-rosa-200/30 px-4 py-2.5 text-[0.875rem] font-medium text-rosa-200/85 transition-colors duration-300 hover:border-rosa-200/60 hover:text-white"
              >
                <MapPin className="size-4" aria-hidden="true" />
                Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Horários em faixa */}
        <div className="mt-14 border-t border-rosa-200/15 pt-8">
          <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-rosa-300 uppercase">
            Horário de funcionamento
          </h2>
          <dl className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {horarios.map((item) => (
              <div
                key={item.dia}
                className="flex items-center justify-between gap-4 border-b border-rosa-200/10 pb-2.5 text-[0.875rem]"
              >
                <dt className="text-rosa-200/75">{item.dia}</dt>
                <dd className={item.aberto ? 'text-rosa-100' : 'text-rosa-200/40'}>
                  {item.horario}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Base legal */}
        <div className="mt-12 flex flex-col gap-4 border-t border-rosa-200/15 pt-8 text-[0.8125rem] text-rosa-200/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {anoAtual} {site.nomeCompleto}. Todos os direitos reservados.
          </p>
          <Link
            to="/politica-de-privacidade"
            className="inline-flex min-h-11 items-center underline-offset-4 transition-colors duration-300 hover:text-rosa-100 hover:underline"
          >
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
