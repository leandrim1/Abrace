# ABRACE — Espaço Multidisciplinar

Site institucional da **ABRACE — Espaço Multidisciplinar**, em Patos de Minas (MG).
Projeto **somente front-end**: não há backend, banco de dados, autenticação, painel
administrativo, agendamento ou integrações com serviços externos.

## Tecnologias

| Recurso | Escolha |
| --- | --- |
| Biblioteca | React 19 |
| Linguagem | TypeScript (modo `strict`) |
| Build | Vite 8 |
| Estilos | Tailwind CSS 4 (configuração CSS-first em `src/index.css`) |
| Rotas | React Router 7 |
| Ícones | lucide-react |

## Scripts

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # verificação de tipos + build de produção em dist/
npm run preview  # pré-visualiza o build
npm run lint     # apenas a verificação de tipos
```

Por ser uma SPA, a hospedagem precisa reescrever todas as rotas para `index.html`
(já configurado em `public/_redirects` para plataformas compatíveis).

## Estrutura

```
src/
├─ data/site.ts            fonte única de verdade (contato, horários, especialidades, FAQ)
├─ lib/
│  ├─ whatsapp.ts          montagem dos links wa.me e da mensagem do formulário
│  ├─ formato.ts           máscara e validação de telefone
│  ├─ useAncora.ts         navegação por âncora respeitando o cabeçalho fixo
│  ├─ useSecaoAtiva.ts     destaque da seção visível no menu
│  └─ useMetadados.ts      título, descrição, canonical e Open Graph por rota
├─ components/
│  ├─ layout/              Cabecalho, Rodape, LimiteDeErro, BotaoFlutuanteWhatsapp
│  ├─ ui/                  Botao, Secao, TituloSecao, Foto, Revelar, Marca, Grafismos
│  ├─ sections/            Hero, Apresentacao, Especialidades, Abordagem, Espaco,
│  │                       ComoContatar, Faq, Contato, ChamadaFinal
│  └─ forms/               FormularioContato
└─ pages/                  Home, PoliticaPrivacidade, NaoEncontrada
```

## Identidade visual

A paleta deriva da logo oficial. O **rosa antigo** (`#C98FA0` e derivados) é a cor de
marca; branco, creme e rosa névoa formam as bases; lilás, verde, turquesa e dourado
aparecem apenas em detalhes pontuais. Os tokens ficam no bloco `@theme` de
`src/index.css`.

A tipografia combina **DM Sans** (títulos) e **Inter** (textos). A escrita cursiva da
logo permanece exclusiva da marca e não é reproduzida na interface. Os grafismos de
apoio (`Grafismos.tsx`) são formas abstratas inspiradas na geometria do "A" — a logo
nunca é usada como ornamento nem recolorida.

## Conteúdo

Todas as informações institucionais vêm de `src/data/site.ts` e seguem apenas os dados
oficiais fornecidos. O projeto não afirma resultados terapêuticos e não inclui
profissionais, registros, certificações, convênios, preços ou depoimentos.

As fotografias são registros do próprio espaço e da equipe da ABRACE, processadas para
web em `public/img/` (WebP com alternativa JPEG, dimensões explícitas e carregamento
preguiçoso fora da primeira dobra).

## Formulário de contato

O formulário é **demonstrativo**: valida os campos no navegador e monta uma mensagem
pré-preenchida para o WhatsApp. Nenhum dado é enviado ou armazenado por este site, e a
interface informa isso ao visitante. O campo de mensagem orienta a não incluir
diagnósticos, laudos ou outras informações de saúde.

## Acessibilidade

- Hierarquia semântica com um único `h1` por página e sem saltos de nível.
- Link "pular para o conteúdo" como primeiro ponto de foco.
- Menu mobile e visualizador de imagens com retenção de foco, fechamento por `Esc` e
  devolução do foco ao elemento de origem.
- Acordeão com `aria-expanded` / `aria-controls`; galeria navegável pelas setas.
- Erros de formulário anunciados por `aria-live` e vinculados por `aria-describedby`.
- Contorno de foco visível, alvos de toque confortáveis e respeito a
  `prefers-reduced-motion`.

## Próximas fases

A arquitetura isola dados (`src/data`) e regras (`src/lib`) dos componentes, de modo que
funcionalidades administrativas possam ser acopladas futuramente sem reescrever a
interface. Nada disso está implementado nesta fase.
