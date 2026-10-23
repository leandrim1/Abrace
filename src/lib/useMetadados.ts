import { useEffect } from 'react';

type Metadados = {
  titulo: string;
  descricao: string;
  caminho: string;
  /** Páginas auxiliares não precisam ser indexadas como conteúdo principal. */
  indexar?: boolean;
};

function definirMeta(seletor: string, atributo: 'name' | 'property', chave: string, valor: string) {
  let elemento = document.head.querySelector<HTMLMetaElement>(seletor);
  if (!elemento) {
    elemento = document.createElement('meta');
    elemento.setAttribute(atributo, chave);
    document.head.appendChild(elemento);
  }
  elemento.setAttribute('content', valor);
}

/** Mantém título, descrição, canonical e Open Graph sincronizados com a rota. */
export function useMetadados({ titulo, descricao, caminho, indexar = true }: Metadados) {
  useEffect(() => {
    document.title = titulo;

    definirMeta('meta[name="description"]', 'name', 'description', descricao);
    definirMeta('meta[name="robots"]', 'name', 'robots', indexar ? 'index, follow' : 'noindex, follow');
    definirMeta('meta[property="og:title"]', 'property', 'og:title', titulo);
    definirMeta('meta[property="og:description"]', 'property', 'og:description', descricao);
    definirMeta('meta[name="twitter:title"]', 'name', 'twitter:title', titulo);
    definirMeta('meta[name="twitter:description"]', 'name', 'twitter:description', descricao);

    const url = `${window.location.origin}${caminho}`;
    definirMeta('meta[property="og:url"]', 'property', 'og:url', url);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [titulo, descricao, caminho, indexar]);
}
