import { Component, type ErrorInfo, type ReactNode } from 'react';
import { site } from '../../data/site';

type Props = { children: ReactNode };
type Estado = { comErro: boolean };

/**
 * Impede que uma falha pontual de renderização derrube a página inteira:
 * o visitante continua com acesso aos canais oficiais de contato.
 */
export class LimiteDeErro extends Component<Props, Estado> {
  state: Estado = { comErro: false };

  static getDerivedStateFromError(): Estado {
    return { comErro: true };
  }

  componentDidCatch(erro: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Falha ao renderizar a página:', erro, info.componentStack);
    }
  }

  render() {
    if (!this.state.comErro) return this.props.children;

    return (
      <section className="bg-creme pt-[calc(var(--altura-cabecalho)+5rem)] pb-28">
        <div className="container-abrace text-center">
          <h1 className="text-[1.75rem] font-semibold sm:text-[2.25rem]">
            Não foi possível exibir esta parte do site.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-[1.75] text-tinta-700">
            Tente recarregar a página. Se o problema continuar, fale com a {site.nome} pelo telefone{' '}
            <a
              href={site.telefone.href}
              className="font-medium text-rosa-700 underline underline-offset-4"
            >
              {site.telefone.exibicao}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-rosa-700 px-7 py-3.5 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-rosa-800"
          >
            Recarregar página
          </button>
        </div>
      </section>
    );
  }
}
