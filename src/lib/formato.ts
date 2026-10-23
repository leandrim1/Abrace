/** Aplica a máscara (00) 00000-0000 conforme o visitante digita. */
export function mascaraTelefone(valor: string) {
  const digitos = valor.replace(/\D/g, '').slice(0, 11);
  if (digitos.length <= 2) return digitos.replace(/^(\d{0,2})/, '($1');
  if (digitos.length <= 6) return digitos.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
  if (digitos.length <= 10) return digitos.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  return digitos.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

/** Telefones brasileiros válidos têm 10 (fixo) ou 11 (celular) dígitos. */
export function telefoneValido(valor: string) {
  const digitos = valor.replace(/\D/g, '');
  return digitos.length === 10 || digitos.length === 11;
}
