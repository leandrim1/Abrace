import { site } from '../data/site';

export type AssuntoWhatsapp =
  | 'geral'
  | 'fonoaudiologia'
  | 'terapia-ocupacional'
  | 'psicologia'
  | 'localizacao';

const mensagens: Record<AssuntoWhatsapp, string> = {
  geral:
    'Olá! Vim pelo site da ABRACE e gostaria de obter informações sobre os atendimentos do espaço.',
  fonoaudiologia:
    'Olá! Vim pelo site da ABRACE e gostaria de obter informações sobre os atendimentos de Fonoaudiologia.',
  'terapia-ocupacional':
    'Olá! Vim pelo site da ABRACE e gostaria de obter informações sobre os atendimentos de Terapia Ocupacional.',
  psicologia:
    'Olá! Vim pelo site da ABRACE e gostaria de obter informações sobre os atendimentos de Psicologia.',
  localizacao:
    'Olá! Vim pelo site da ABRACE e gostaria de confirmar a localização e os horários de atendimento.',
};

export const rotulosAssunto: Record<AssuntoWhatsapp, string> = {
  geral: 'Informações gerais',
  fonoaudiologia: 'Fonoaudiologia',
  'terapia-ocupacional': 'Terapia Ocupacional',
  psicologia: 'Psicologia',
  localizacao: 'Localização e horários',
};

/** Monta a URL do WhatsApp a partir do telefone comercial oficial. */
export function whatsappUrl(assunto: AssuntoWhatsapp = 'geral', textoPersonalizado?: string) {
  const texto = textoPersonalizado?.trim() || mensagens[assunto];
  return `https://wa.me/${site.telefone.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/** Texto enviado após a validação do formulário demonstrativo. */
export function mensagemFormulario(dados: {
  nome: string;
  telefone: string;
  assunto: AssuntoWhatsapp;
  mensagem: string;
}) {
  return [
    'Olá! Vim pelo site da ABRACE.',
    '',
    `Nome do responsável: ${dados.nome.trim()}`,
    `Telefone para contato: ${dados.telefone.trim()}`,
    `Assunto: ${rotulosAssunto[dados.assunto]}`,
    '',
    dados.mensagem.trim(),
  ].join('\n');
}
