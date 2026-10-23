import { Secao, TituloSecao } from '../ui/Secao';
import { Revelar } from '../ui/Revelar';
import { Foto } from '../ui/Foto';
import { Chevron, Filete } from '../ui/Grafismos';

const destaques = [
  'Três áreas de atendimento reunidas em um mesmo espaço',
  'Salas preparadas para diferentes necessidades',
  'Acompanhamento construído junto com a família',
];

export function Apresentacao() {
  return (
    <Secao id="sobre" fundo="nevoa" className="overflow-hidden">
      <div className="container-abrace">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-20">
          {/* Fotografia do espaço, em composição assimétrica */}
          <Revelar className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-[26rem] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -left-6 size-28 rounded-full bg-verde-suave sm:size-36"
              />
              <div className="moldura-arco-suave relative bg-white shadow-elevado">
                <Foto
                  src="/img/sala-infantil"
                  alt="Sala de atendimento da ABRACE com mural de árvore, mobiliário infantil e tapete colorido."
                  largura={1040}
                  altura={1107}
                  sizes="(min-width: 1024px) 42vw, 85vw"
                  className="w-full object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -top-5 -right-5 hidden size-20 rotate-12 rounded-[1.75rem] border border-rosa-300 sm:block"
              />
            </div>
          </Revelar>

          <Revelar atraso={80} className="order-1 lg:order-2">
            <TituloSecao
              etiqueta="Quem somos"
              titulo={
                <>
                  Um espaço para acolher, compreender e{' '}
                  <span className="text-rosa-700">desenvolver.</span>
                </>
              }
              descricao={
                <p>
                  A ABRACE é um espaço multidisciplinar dedicado ao cuidado e ao desenvolvimento.
                  Reunimos diferentes áreas de atendimento para acompanhar as necessidades de cada
                  pessoa, respeitando sua individualidade e valorizando a participação da família.
                </p>
              }
            />

            <Filete className="mt-9" />

            <ul className="mt-7 space-y-4">
              {destaques.map((destaque) => (
                <li key={destaque} className="flex items-start gap-3.5">
                  <Chevron className="mt-1.5 w-4 shrink-0 text-rosa-500" />
                  <span className="text-[1rem] leading-relaxed text-tinta-700">{destaque}</span>
                </li>
              ))}
            </ul>
          </Revelar>
        </div>
      </div>
    </Secao>
  );
}
