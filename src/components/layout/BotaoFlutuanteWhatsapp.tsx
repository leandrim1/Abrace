import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../../lib/whatsapp';

/**
 * Atalho permanente para o WhatsApp.
 * Aparece após a primeira dobra e some perto do rodapé, para não cobrir conteúdo.
 */
export function BotaoFlutuanteWhatsapp() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const avaliar = () => {
      const rolagem = window.scrollY;
      const alturaDocumento = document.documentElement.scrollHeight;
      const fimDaPagina = rolagem + window.innerHeight > alturaDocumento - 420;
      setVisivel(rolagem > 620 && !fimDaPagina);
    };

    avaliar();
    window.addEventListener('scroll', avaliar, { passive: true });
    window.addEventListener('resize', avaliar);
    return () => {
      window.removeEventListener('scroll', avaliar);
      window.removeEventListener('resize', avaliar);
    };
  }, []);

  return (
    <a
      href={whatsappUrl('geral')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a ABRACE pelo WhatsApp"
      tabIndex={visivel ? undefined : -1}
      aria-hidden={!visivel}
      className={`fixed right-4 bottom-4 z-40 inline-flex items-center gap-2.5 rounded-full bg-rosa-700 px-5 py-3.5 text-[0.9375rem] font-medium text-white shadow-[0_14px_34px_-14px_rgba(45,31,38,.75)] transition-[opacity,transform] duration-400 ease-[cubic-bezier(.22,.61,.36,1)] hover:bg-rosa-800 sm:right-6 sm:bottom-6 ${
        visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">Fale conosco</span>
    </a>
  );
}
