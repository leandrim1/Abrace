import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { navegacao, site } from '../../data/site';
import { whatsappUrl } from '../../lib/whatsapp';
import { useAncora } from '../../lib/useAncora';
import { useSecaoAtiva } from '../../lib/useSecaoAtiva';
import { Marca } from '../ui/Marca';
import { BotaoLink } from '../ui/Botao';
import { PontosDaMarca } from '../ui/Grafismos';

const idsSecoes = navegacao.map((item) => item.hash.replace('#', ''));

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const irPara = useAncora();
  const secaoAtiva = useSecaoAtiva(idsSecoes);
  const painelRef = useRef<HTMLDivElement>(null);
  const botaoMenuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 16);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Trava a rolagem do corpo e devolve o foco ao fechar o menu.
  useEffect(() => {
    if (!aberto) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setAberto(false);
        botaoMenuRef.current?.focus();
        return;
      }

      if (evento.key !== 'Tab' || !painelRef.current) return;

      const focaveis = painelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focaveis.length === 0) return;

      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aberto]);

  const navegar = useCallback(
    (hash: string) => {
      setAberto(false);
      // Aguarda o fechamento do painel antes de rolar, evitando salto duplo.
      window.setTimeout(() => irPara(hash), 10);
    },
    [irPara],
  );

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-rosa-700 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-400 ease-[cubic-bezier(.22,.61,.36,1)] ${
          rolou || aberto
            ? 'border-b border-rosa-200/70 bg-creme/92 backdrop-blur-xl'
            : 'border-b border-transparent bg-creme/70 backdrop-blur-sm'
        }`}
      >
        <div className="container-abrace flex h-[var(--altura-cabecalho)] items-center justify-between gap-6">
          <Marca className="shrink-0" />

          <nav aria-label="Navegação principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navegacao.map((item) => {
                const ativo = secaoAtiva === item.hash.replace('#', '');
                return (
                  <li key={item.hash}>
                    <a
                      href={item.hash}
                      onClick={(evento) => {
                        evento.preventDefault();
                        navegar(item.hash);
                      }}
                      aria-current={ativo ? 'true' : undefined}
                      className={`relative block rounded-full px-3 py-2 text-[0.875rem] whitespace-nowrap transition-colors duration-300 hover:text-rosa-800 2xl:px-3.5 ${
                        ativo ? 'text-rosa-800' : 'text-tinta-700'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-rosa-500 transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)] ${
                          ativo ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* O invólucro controla a visibilidade: evita conflito com o
                display do próprio botão, que também é inline-flex. */}
            <span className="hidden sm:block">
              <BotaoLink
                href={whatsappUrl('geral')}
                externo
                aria-label={`Fale conosco pelo WhatsApp ${site.telefone.exibicao}`}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Fale conosco
              </BotaoLink>
            </span>

            <button
              ref={botaoMenuRef}
              type="button"
              onClick={() => setAberto((valor) => !valor)}
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              aria-label={aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="inline-flex size-11 items-center justify-center rounded-full border border-rosa-200 bg-white/70 text-tinta-800 transition-colors duration-300 hover:border-rosa-400 hover:text-rosa-800 xl:hidden"
            >
              {aberto ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Painel de navegação mobile */}
      <div
        className={`fixed inset-0 z-40 xl:hidden ${aberto ? '' : 'pointer-events-none'}`}
        aria-hidden={!aberto}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setAberto(false)}
          className={`absolute inset-0 bg-tinta-900/25 transition-opacity duration-300 ${
            aberto ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          ref={painelRef}
          id="menu-mobile"
          className={`absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto border-b border-rosa-200 bg-creme pt-[calc(var(--altura-cabecalho)+1rem)] pb-8 shadow-[0_28px_60px_-32px_rgba(61,36,45,.3)] transition-transform duration-400 ease-[cubic-bezier(.22,.61,.36,1)] ${
            aberto ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <nav aria-label="Navegação principal (celular)" className="container-abrace">
            <ul className="flex flex-col">
              {navegacao.map((item, indice) => (
                <li key={item.hash} className={indice > 0 ? 'border-t border-rosa-200/70' : ''}>
                  <a
                    href={item.hash}
                    onClick={(evento) => {
                      evento.preventDefault();
                      navegar(item.hash);
                    }}
                    tabIndex={aberto ? undefined : -1}
                    className="flex items-center justify-between py-4 font-display text-[1.0625rem] text-tinta-900 transition-colors duration-300 hover:text-rosa-800"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-rosa-400">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3">
              <BotaoLink
                href={whatsappUrl('geral')}
                externo
                tamanho="lg"
                tabIndex={aberto ? undefined : -1}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Fale conosco
              </BotaoLink>
              <BotaoLink
                href={site.telefone.href}
                variante="secundario"
                tamanho="lg"
                tabIndex={aberto ? undefined : -1}
              >
                Ligar para {site.telefone.exibicao}
              </BotaoLink>
            </div>

            <PontosDaMarca className="mt-8 justify-center" />
          </nav>
        </div>
      </div>
    </>
  );
}
