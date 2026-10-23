/**
 * Fonte única de verdade com as informações oficiais da ABRACE.
 * Nenhum dado aqui deve ser inventado: profissionais, registros, convênios,
 * preços e depoimentos não fazem parte desta fase do projeto.
 */

export const site = {
  nome: 'ABRACE',
  nomeCompleto: 'ABRACE — Espaço Multidisciplinar',
  descritor: 'Espaço Multidisciplinar',
  cidade: 'Patos de Minas',
  uf: 'MG',
  endereco: {
    logradouro: 'Avenida Padre Almir Neves de Medeiros, 623',
    bairro: 'Sobradinho',
    cidade: 'Patos de Minas',
    uf: 'MG',
    cep: '38701-118',
    get linhaUnica() {
      return `${this.logradouro} — ${this.bairro}, ${this.cidade} — ${this.uf}, CEP ${this.cep}`;
    },
  },
  telefone: {
    exibicao: '(34) 3822-3254',
    e164: '+553438223254',
    whatsapp: '553438223254',
    href: 'tel:+553438223254',
  },
  instagram: {
    usuario: '@abrace.espacomultidisciplinar',
    url: 'https://instagram.com/abrace.espacomultidisciplinar?igshid=YmMyMTA2M2Y=',
  },
  maps: {
    url: 'https://www.google.com/maps/place/?q=place_id:ChIJ6T8bGgz1rpQRnB4Wj2uru1M',
    embed:
      'https://www.google.com/maps?q=Avenida%20Padre%20Almir%20Neves%20de%20Medeiros%2C%20623%2C%20Sobradinho%2C%20Patos%20de%20Minas%20-%20MG%2C%2038701-118&output=embed',
  },
  avaliacao: {
    nota: 5.0,
    total: 2,
    fonte: 'Google',
  },
} as const;

export type DiaSemana = {
  dia: string;
  abreviacao: string;
  horario: string;
  aberto: boolean;
  /** 0 = domingo ... 6 = sábado, no padrão de Date.getDay() */
  indice: number;
};

export const horarios: DiaSemana[] = [
  { dia: 'Segunda-feira', abreviacao: 'Seg', horario: '07h às 17h30', aberto: true, indice: 1 },
  { dia: 'Terça-feira', abreviacao: 'Ter', horario: '07h às 17h30', aberto: true, indice: 2 },
  { dia: 'Quarta-feira', abreviacao: 'Qua', horario: '07h às 17h30', aberto: true, indice: 3 },
  { dia: 'Quinta-feira', abreviacao: 'Qui', horario: '07h às 17h30', aberto: true, indice: 4 },
  { dia: 'Sexta-feira', abreviacao: 'Sex', horario: '07h às 17h30', aberto: true, indice: 5 },
  { dia: 'Sábado', abreviacao: 'Sáb', horario: 'Fechado', aberto: false, indice: 6 },
  { dia: 'Domingo', abreviacao: 'Dom', horario: 'Fechado', aberto: false, indice: 0 },
];

export const resumoHorario = 'Segunda a sexta, das 07h às 17h30';

export type EspecialidadeId = 'fonoaudiologia' | 'terapia-ocupacional' | 'psicologia';

export type Profissional = {
  /** Como a equipe é apresentada no material oficial da ABRACE. */
  nome: string;
  cargo: string;
  imagem: string;
};

export type Especialidade = {
  id: EspecialidadeId;
  titulo: string;
  subtitulo: string;
  descricao: string;
  profissionais: Profissional[];
  acento: 'turquesa' | 'verde' | 'lilas';
};

/** Todas as fotos da equipe compartilham a mesma proporção. */
export const retrato = { largura: 640, altura: 1138 } as const;

export const especialidades: Especialidade[] = [
  {
    id: 'fonoaudiologia',
    titulo: 'Fonoaudiologia',
    subtitulo: 'Comunicação e linguagem',
    descricao:
      'Um atendimento voltado à comunicação, à linguagem, à fala e a outras necessidades relacionadas à atuação fonoaudiológica, conforme avaliação profissional.',
    profissionais: [
      { nome: 'Tia Marina', cargo: 'Fonoaudióloga', imagem: '/img/equipe-marina' },
      { nome: 'Tia Jôsiane', cargo: 'Fonoaudióloga', imagem: '/img/equipe-josiane' },
    ],
    acento: 'turquesa',
  },
  {
    id: 'terapia-ocupacional',
    titulo: 'Terapia Ocupacional',
    subtitulo: 'Autonomia no dia a dia',
    descricao:
      'Um espaço de cuidado voltado à participação nas atividades do dia a dia, à autonomia e ao desenvolvimento de habilidades, conforme as necessidades individuais.',
    profissionais: [
      { nome: 'Tia Amanda', cargo: 'Terapeuta Ocupacional', imagem: '/img/equipe-amanda' },
    ],
    acento: 'verde',
  },
  {
    id: 'psicologia',
    titulo: 'Psicologia',
    subtitulo: 'Abordagens ABA e Denver',
    descricao:
      'Atendimento em psicologia com referências às abordagens ABA e Denver, de acordo com os serviços oferecidos pela equipe e as necessidades de cada pessoa.',
    profissionais: [
      { nome: 'Tia Gisele', cargo: 'Psicóloga', imagem: '/img/equipe-gisele' },
      { nome: 'Tia Monize', cargo: 'Psicóloga', imagem: '/img/equipe-monize' },
    ],
    acento: 'lilas',
  },
];

export const principios = [
  {
    titulo: 'Respeito à individualidade',
    texto:
      'Cada pessoa tem necessidades, características e formas de se desenvolver que merecem ser respeitadas.',
  },
  {
    titulo: 'Parceria com a família',
    texto:
      'A troca de informações com a família ajuda a compreender necessidades e alinhar orientações, respeitando a privacidade de cada pessoa.',
  },
  {
    titulo: 'Cuidado com propósito',
    texto:
      'Valorizar as necessidades individuais, a participação e o desenvolvimento de cada pessoa faz parte de uma proposta de cuidado responsável.',
  },
] as const;

export type FotoEspaco = {
  src: string;
  alt: string;
  legenda: string;
  largura: number;
  altura: number;
  /** Ponto de interesse preservado quando o ladrilho recorta a imagem. */
  foco?: 'topo' | 'centro';
};

export const galeria: FotoEspaco[] = [
  {
    src: '/img/sala-infantil',
    alt: 'Sala de atendimento da ABRACE com mural de árvore, mobiliário infantil e tapete colorido.',
    legenda: 'Sala de atendimento',
    largura: 1040,
    altura: 1107,
  },
  {
    src: '/img/recepcao',
    alt: 'Corredor interno da ABRACE que dá acesso às salas de atendimento.',
    legenda: 'Acesso às salas',
    largura: 440,
    altura: 875,
  },
  {
    src: '/img/equipe-uniforme',
    alt: 'Profissionais da ABRACE reunidas no espaço.',
    legenda: 'Equipe ABRACE',
    largura: 1100,
    altura: 461,
    foco: 'topo',
  },
];

export const faq = [
  {
    pergunta: 'Quais especialidades são oferecidas?',
    resposta:
      'A ABRACE reúne atendimentos em Fonoaudiologia, Terapia Ocupacional e Psicologia — com referências às abordagens ABA e Denver. Para saber mais sobre cada área, fale com a nossa equipe.',
  },
  {
    pergunta: 'Como posso obter informações sobre os atendimentos?',
    resposta:
      'Entre em contato pelo telefone (34) 3822-3254 ou pelo WhatsApp, informe a especialidade que deseja conhecer e converse com a equipe sobre os próximos passos.',
  },
  {
    pergunta: 'Onde fica a ABRACE?',
    resposta:
      'Estamos na Avenida Padre Almir Neves de Medeiros, 623, bairro Sobradinho, em Patos de Minas — MG, CEP 38701-118. Você pode abrir a rota direto no Google Maps pelo botão desta página.',
  },
  {
    pergunta: 'Qual é o horário de funcionamento?',
    resposta:
      'Atendemos de segunda a sexta-feira, das 07h às 17h30. Aos sábados e domingos permanecemos fechados.',
  },
  {
    pergunta: 'Como faço para entrar em contato?',
    resposta:
      'Pelo telefone (34) 3822-3254, pelo WhatsApp ou pelo nosso perfil no Instagram. Também é possível usar o formulário desta página para organizar as informações antes de iniciar a conversa.',
  },
  {
    pergunta: 'E dúvidas sobre valores, convênios ou documentos?',
    resposta:
      'Informações sobre valores, formas de atendimento, disponibilidade de profissionais e documentos necessários são tratadas diretamente com a equipe. Entre em contato para receber as orientações adequadas ao seu caso.',
  },
] as const;

export type NavItem = { label: string; hash: string };

export const navegacao: NavItem[] = [
  { label: 'Início', hash: '#inicio' },
  { label: 'Especialidades', hash: '#especialidades' },
  { label: 'Nossa abordagem', hash: '#abordagem' },
  { label: 'Nosso espaço', hash: '#espaco' },
  { label: 'Perguntas frequentes', hash: '#faq' },
  { label: 'Contato', hash: '#contato' },
];
