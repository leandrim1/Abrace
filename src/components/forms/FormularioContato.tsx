import { useId, useRef, useState, type FormEvent } from 'react';
import { AlertCircle, ArrowUpRight, Info } from 'lucide-react';
import { mascaraTelefone, telefoneValido } from '../../lib/formato';
import {
  mensagemFormulario,
  rotulosAssunto,
  whatsappUrl,
  type AssuntoWhatsapp,
} from '../../lib/whatsapp';
import { Botao, BotaoLink } from '../ui/Botao';

type Campos = {
  nome: string;
  telefone: string;
  assunto: AssuntoWhatsapp;
  mensagem: string;
};

type Erros = Partial<Record<keyof Campos, string>>;

const inicial: Campos = { nome: '', telefone: '', assunto: 'geral', mensagem: '' };

function validar(campos: Campos): Erros {
  const erros: Erros = {};

  if (campos.nome.trim().length < 2) {
    erros.nome = 'Informe o nome do responsável (pelo menos 2 caracteres).';
  }
  if (!telefoneValido(campos.telefone)) {
    erros.telefone = 'Informe um telefone com DDD, no formato (34) 99999-9999.';
  }
  if (campos.mensagem.trim().length < 10) {
    erros.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.';
  }

  return erros;
}

const classeCampo =
  'w-full rounded-2xl border bg-white px-4 py-3.5 text-[0.9375rem] text-tinta-900 transition-colors duration-300 placeholder:text-tinta-700/45 focus:outline-none';

export function FormularioContato() {
  const [campos, setCampos] = useState<Campos>(inicial);
  const [erros, setErros] = useState<Erros>({});
  const [linkPronto, setLinkPronto] = useState<string | null>(null);
  const idBase = useId();
  const resumoRef = useRef<HTMLDivElement>(null);

  const atualizar = <C extends keyof Campos>(campo: C, valor: Campos[C]) => {
    setCampos((anterior) => ({ ...anterior, [campo]: valor }));
    setLinkPronto(null);
    if (erros[campo]) {
      setErros((anterior) => {
        const proximo = { ...anterior };
        delete proximo[campo];
        return proximo;
      });
    }
  };

  const enviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const encontrados = validar(campos);
    setErros(encontrados);

    if (Object.keys(encontrados).length > 0) {
      setLinkPronto(null);
      const primeiroErro = Object.keys(encontrados)[0] as keyof Campos;
      document.getElementById(`${idBase}-${primeiroErro}`)?.focus();
      return;
    }

    setLinkPronto(whatsappUrl(campos.assunto, mensagemFormulario(campos)));
    window.setTimeout(() => resumoRef.current?.focus(), 60);
  };

  const classeErro = (campo: keyof Campos) =>
    erros[campo]
      ? 'border-rosa-700 focus:border-rosa-800'
      : 'border-rosa-200 focus:border-rosa-500';

  const idErro = (campo: keyof Campos) => `${idBase}-${campo}-erro`;

  return (
    <form
      noValidate
      onSubmit={enviar}
      className="rounded-[1.75rem] border border-rosa-200 bg-white p-7 shadow-suave sm:p-9"
      aria-labelledby={`${idBase}-titulo`}
    >
      <h3 id={`${idBase}-titulo`} className="text-[1.25rem] font-semibold">
        Prepare sua mensagem
      </h3>
      <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-tinta-700">
        Organize as informações aqui e continue a conversa pelo WhatsApp com a mensagem já
        preenchida.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label
            htmlFor={`${idBase}-nome`}
            className="mb-2 block text-[0.8125rem] font-medium text-tinta-800"
          >
            Nome do responsável
          </label>
          <input
            id={`${idBase}-nome`}
            name="nome"
            type="text"
            autoComplete="name"
            value={campos.nome}
            onChange={(evento) => atualizar('nome', evento.target.value)}
            aria-invalid={erros.nome ? true : undefined}
            aria-describedby={erros.nome ? idErro('nome') : undefined}
            className={`${classeCampo} ${classeErro('nome')}`}
            placeholder="Como podemos chamar você?"
          />
          {erros.nome && <MensagemErro id={idErro('nome')}>{erros.nome}</MensagemErro>}
        </div>

        <div>
          <label
            htmlFor={`${idBase}-telefone`}
            className="mb-2 block text-[0.8125rem] font-medium text-tinta-800"
          >
            Telefone
          </label>
          <input
            id={`${idBase}-telefone`}
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={campos.telefone}
            onChange={(evento) => atualizar('telefone', mascaraTelefone(evento.target.value))}
            aria-invalid={erros.telefone ? true : undefined}
            aria-describedby={erros.telefone ? idErro('telefone') : undefined}
            className={`${classeCampo} ${classeErro('telefone')}`}
            placeholder="(34) 99999-9999"
          />
          {erros.telefone && <MensagemErro id={idErro('telefone')}>{erros.telefone}</MensagemErro>}
        </div>

        <div>
          <label
            htmlFor={`${idBase}-assunto`}
            className="mb-2 block text-[0.8125rem] font-medium text-tinta-800"
          >
            Assunto
          </label>
          <select
            id={`${idBase}-assunto`}
            name="assunto"
            value={campos.assunto}
            onChange={(evento) => atualizar('assunto', evento.target.value as AssuntoWhatsapp)}
            className={`${classeCampo} ${classeErro('assunto')} appearance-none bg-no-repeat pr-11`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2396596a' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1.1rem',
            }}
          >
            {(Object.keys(rotulosAssunto) as AssuntoWhatsapp[]).map((chave) => (
              <option key={chave} value={chave}>
                {rotulosAssunto[chave]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${idBase}-mensagem`}
            className="mb-2 block text-[0.8125rem] font-medium text-tinta-800"
          >
            Mensagem
          </label>
          <textarea
            id={`${idBase}-mensagem`}
            name="mensagem"
            rows={4}
            value={campos.mensagem}
            onChange={(evento) => atualizar('mensagem', evento.target.value)}
            aria-invalid={erros.mensagem ? true : undefined}
            aria-describedby={
              erros.mensagem ? `${idErro('mensagem')} ${idBase}-aviso` : `${idBase}-aviso`
            }
            className={`${classeCampo} ${classeErro('mensagem')} resize-y`}
            placeholder="Conte brevemente o que você gostaria de saber."
          />
          {erros.mensagem && <MensagemErro id={idErro('mensagem')}>{erros.mensagem}</MensagemErro>}
          <p
            id={`${idBase}-aviso`}
            className="mt-2.5 flex items-start gap-2 text-[0.8125rem] leading-relaxed text-tinta-700/80"
          >
            <Info className="mt-0.5 size-3.5 shrink-0 text-lilas" aria-hidden="true" />
            Não inclua diagnósticos, laudos ou outras informações de saúde. Esses assuntos são
            tratados diretamente com a equipe.
          </p>
        </div>
      </div>

      <Botao type="submit" tamanho="lg" className="mt-7 w-full sm:w-auto">
        Revisar e continuar
      </Botao>

      {/* Região viva: anuncia erros e o resultado da validação */}
      <div aria-live="polite" className="mt-6">
        {Object.keys(erros).length > 0 && (
          <p className="flex items-start gap-2 text-[0.875rem] text-rosa-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Revise os campos destacados para continuar.
          </p>
        )}

        {linkPronto && (
          <div
            ref={resumoRef}
            tabIndex={-1}
            className="rounded-2xl border border-rosa-200 bg-nevoa p-6"
          >
            <p className="text-[0.9375rem] leading-[1.7] text-tinta-800">
              <strong className="font-semibold">Sua mensagem está pronta.</strong> Nenhuma
              informação foi enviada ou armazenada por este site — o contato acontece no WhatsApp,
              com o texto já preenchido para você revisar antes de enviar.
            </p>
            <BotaoLink href={linkPronto} externo tamanho="lg" className="mt-5">
              Abrir conversa no WhatsApp
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </BotaoLink>
          </div>
        )}
      </div>
    </form>
  );
}

function MensagemErro({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-[0.8125rem] text-rosa-800">
      <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}
