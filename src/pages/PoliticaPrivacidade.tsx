import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { site } from '../data/site';
import { useMetadados } from '../lib/useMetadados';
import { Filete } from '../components/ui/Grafismos';

const blocos = [
  {
    titulo: 'Sobre esta página',
    paragrafos: [
      'Este site é institucional e tem a finalidade de apresentar a ABRACE — Espaço Multidisciplinar, suas áreas de atendimento, seu espaço físico e seus canais oficiais de contato.',
      'Nesta versão, o site não possui área de login, cadastro de pacientes, prontuários, agendamento on-line ou pagamentos.',
    ],
  },
  {
    titulo: 'Informações preenchidas no formulário',
    paragrafos: [
      'O formulário disponível na seção de contato funciona apenas como um apoio para organizar a mensagem antes de iniciar a conversa pelo WhatsApp.',
      'As informações digitadas permanecem no seu próprio navegador enquanto você usa a página. Elas não são enviadas para servidores deste site, não são armazenadas em banco de dados e não são compartilhadas automaticamente com terceiros.',
      'Ao clicar para continuar, o texto é transferido para o aplicativo WhatsApp, onde você revisa e decide se deseja enviá-lo à equipe da ABRACE.',
    ],
  },
  {
    titulo: 'Informações de saúde',
    paragrafos: [
      'Pedimos que diagnósticos, laudos, relatórios e outras informações de saúde não sejam incluídos no formulário desta página. Assuntos clínicos devem ser tratados diretamente com a equipe pelos canais oficiais de atendimento.',
    ],
  },
  {
    titulo: 'Serviços de terceiros',
    paragrafos: [
      'Algumas funcionalidades desta página direcionam para serviços externos — WhatsApp, Instagram e Google Maps. Ao utilizá-los, você passa a estar sujeito às políticas de privacidade dessas plataformas.',
      'O mapa do Google é carregado apenas quando você escolhe carregá-lo, evitando conexões desnecessárias com serviços externos durante a navegação.',
    ],
  },
  {
    titulo: 'Dúvidas',
    paragrafos: [
      `Para esclarecer dúvidas sobre esta página ou sobre o tratamento de informações, entre em contato com a ABRACE pelo telefone ${site.telefone.exibicao} ou pelos canais oficiais indicados no site.`,
    ],
  },
];

export default function PoliticaPrivacidade() {
  useMetadados({
    titulo: 'Política de privacidade | ABRACE — Espaço Multidisciplinar',
    descricao:
      'Como o site institucional da ABRACE — Espaço Multidisciplinar trata as informações preenchidas pelos visitantes.',
    caminho: '/politica-de-privacidade',
    indexar: false,
  });

  return (
    <article className="bg-creme pt-[calc(var(--altura-cabecalho)+3.5rem)] pb-24">
      <div className="container-abrace">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-rosa-700 underline-offset-4 transition-colors duration-300 hover:text-rosa-800 hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar para o início
          </Link>

          <h1 className="mt-8 text-[2rem] leading-[1.15] font-semibold sm:text-[2.5rem]">
            Política de privacidade
          </h1>

          <Filete className="mt-7" />

          <div className="mt-10 space-y-10">
            {blocos.map((bloco) => (
              <section key={bloco.titulo}>
                <h2 className="text-[1.25rem] font-semibold">{bloco.titulo}</h2>
                <div className="mt-4 space-y-4">
                  {bloco.paragrafos.map((paragrafo) => (
                    <p key={paragrafo} className="text-[1rem] leading-[1.8] text-tinta-700">
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-12 rounded-2xl border border-rosa-200 bg-nevoa p-6 text-[0.875rem] leading-relaxed text-tinta-700">
            Este texto descreve o funcionamento da versão atual do site, que é exclusivamente
            institucional. Caso novos recursos sejam adicionados no futuro, esta página será
            revisada.
          </p>
        </div>
      </div>
    </article>
  );
}
