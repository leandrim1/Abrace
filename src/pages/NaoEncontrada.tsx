import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { useMetadados } from '../lib/useMetadados';
import { ApiceDecorativo } from '../components/ui/Grafismos';
import { BotaoLink } from '../components/ui/Botao';
import { whatsappUrl } from '../lib/whatsapp';

export default function NaoEncontrada() {
  useMetadados({
    titulo: 'Página não encontrada | ABRACE — Espaço Multidisciplinar',
    descricao: 'A página procurada não existe no site da ABRACE — Espaço Multidisciplinar.',
    caminho: '/404',
    indexar: false,
  });

  return (
    <section className="relative overflow-hidden bg-creme pt-[calc(var(--altura-cabecalho)+5rem)] pb-28">
      <ApiceDecorativo
        className="pointer-events-none absolute -top-10 left-1/2 w-[26rem] -translate-x-1/2 text-rosa-300/30"
        aria-hidden="true"
      />

      <div className="container-abrace relative text-center">
        <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-rosa-700 uppercase">
          Erro 404
        </p>
        <h1 className="mx-auto mt-5 max-w-xl text-[2rem] leading-[1.15] font-semibold sm:text-[2.5rem]">
          Não encontramos esta página.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-[1.75] text-tinta-700">
          O endereço pode ter mudado ou o link pode estar incompleto. Volte ao início para conhecer
          a {site.nome} ou fale com a nossa equipe.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-rosa-700 px-7 py-3.5 text-[0.9375rem] font-medium text-white shadow-[0_10px_26px_-14px_rgba(150,89,106,.9)] transition-colors duration-300 hover:bg-rosa-800"
          >
            Voltar para o início
          </Link>
          <BotaoLink href={whatsappUrl('geral')} externo variante="secundario" tamanho="lg">
            Fale conosco
          </BotaoLink>
        </div>
      </div>
    </section>
  );
}
