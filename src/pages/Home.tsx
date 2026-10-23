import { Hero } from '../components/sections/Hero';
import { Apresentacao } from '../components/sections/Apresentacao';
import { Especialidades } from '../components/sections/Especialidades';
import { Abordagem } from '../components/sections/Abordagem';
import { Espaco } from '../components/sections/Espaco';
import { ComoContatar } from '../components/sections/ComoContatar';
import { Faq } from '../components/sections/Faq';
import { Contato } from '../components/sections/Contato';
import { ChamadaFinal } from '../components/sections/ChamadaFinal';
import { useMetadados } from '../lib/useMetadados';

export default function Home() {
  useMetadados({
    titulo:
      'ABRACE — Espaço Multidisciplinar em Patos de Minas | Fonoaudiologia, Terapia Ocupacional e Psicologia',
    descricao:
      'Espaço multidisciplinar em Patos de Minas — MG com atendimentos em fonoaudiologia, terapia ocupacional e psicologia. Conheça nosso espaço e fale com a equipe.',
    caminho: '/',
  });

  return (
    <>
      <Hero />
      <Apresentacao />
      <Especialidades />
      <Abordagem />
      <Espaco />
      <ComoContatar />
      <Faq />
      <Contato />
      <ChamadaFinal />
    </>
  );
}
