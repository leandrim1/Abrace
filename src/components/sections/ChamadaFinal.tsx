import { MessageCircle, Phone } from 'lucide-react';
import { site } from '../../data/site';
import { whatsappUrl } from '../../lib/whatsapp';
import { Revelar } from '../ui/Revelar';
import { BotaoLink } from '../ui/Botao';
import { ApiceDecorativo, PontosDaMarca } from '../ui/Grafismos';

export function ChamadaFinal() {
  return (
    <section className="relative overflow-hidden bg-nevoa py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-rosa-200/50 blur-[110px]" />
        <ApiceDecorativo className="absolute -bottom-24 left-[8%] w-[20rem] text-rosa-300/35" />
        <ApiceDecorativo className="absolute -top-20 right-[6%] w-[16rem] text-lilas/20" />
      </div>

      <div className="container-abrace relative">
        <Revelar className="mx-auto max-w-2xl text-center">
          <PontosDaMarca className="justify-center" />

          <h2 className="mt-7 text-[2rem] leading-[1.15] font-semibold sm:text-[2.5rem] lg:text-[2.875rem]">
            Vamos conversar sobre como{' '}
            <span className="text-rosa-700">podemos ajudar?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.75] text-tinta-700">
            Entre em contato com a ABRACE para conhecer nossas especialidades e obter informações
            sobre os atendimentos.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <BotaoLink href={whatsappUrl('geral')} externo tamanho="lg">
              <MessageCircle className="size-4" aria-hidden="true" />
              Fale conosco
            </BotaoLink>
            <BotaoLink href={site.telefone.href} variante="secundario" tamanho="lg">
              <Phone className="size-4" aria-hidden="true" />
              {site.telefone.exibicao}
            </BotaoLink>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
