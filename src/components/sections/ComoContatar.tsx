import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../../lib/whatsapp';
import { Secao, TituloSecao } from '../ui/Secao';
import { Revelar } from '../ui/Revelar';
import { BotaoLink } from '../ui/Botao';

const passos = [
  {
    titulo: 'Entre em contato com a ABRACE',
    texto: 'Pelo WhatsApp, pelo telefone comercial ou pelo nosso perfil no Instagram.',
  },
  {
    titulo: 'Informe qual especialidade deseja conhecer',
    texto: 'Fonoaudiologia, Terapia Ocupacional ou Psicologia — e o que você precisa saber.',
  },
  {
    titulo: 'Converse com a equipe sobre os próximos passos',
    texto: 'A equipe orienta sobre como seguir a partir das informações que você trouxer.',
  },
];

export function ComoContatar() {
  return (
    <Secao id="como-contatar" fundo="branco" className="overflow-hidden">
      <div className="container-abrace">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Revelar>
            <TituloSecao
              etiqueta="Como entrar em contato"
              titulo={
                <>
                  Três passos simples para <span className="text-rosa-700">começar a conversa.</span>
                </>
              }
              descricao={
                <p>
                  Ainda não trabalhamos com agendamento on-line. O contato direto com a equipe é a
                  forma de obter informações sobre os atendimentos.
                </p>
              }
            />

            <BotaoLink
              href={whatsappUrl('geral')}
              externo
              tamanho="lg"
              className="mt-9"
              aria-label="Conversar com a equipe da ABRACE pelo WhatsApp"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Conversar com a equipe
            </BotaoLink>
          </Revelar>

          <ol className="relative">
            {/* Linha condutora do percurso */}
            <span
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[1.4375rem] w-px bg-gradient-to-b from-rosa-300 via-rosa-300 to-transparent"
            />

            {passos.map((passo, indice) => (
              <Revelar key={passo.titulo} as="li" atraso={indice * 110}>
                <li className="relative flex gap-6 pb-10 last:pb-0">
                  <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-rosa-200 bg-creme font-display text-[1.0625rem] font-semibold text-rosa-700 tabular-nums">
                    {indice + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-[1.125rem] font-semibold sm:text-[1.1875rem]">
                      {passo.titulo}
                    </h3>
                    <p className="mt-2 text-[1rem] leading-[1.7] text-tinta-700">{passo.texto}</p>
                  </div>
                </li>
              </Revelar>
            ))}
          </ol>
        </div>
      </div>
    </Secao>
  );
}
