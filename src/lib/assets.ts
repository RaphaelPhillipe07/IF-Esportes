/**
 * Resolve o caminho de um arquivo de `public/` respeitando a base do Vite.
 * Em produção no GitHub Pages a base é `/IF-Esportes/`, então `/images/x.jpg`
 * precisa virar `/IF-Esportes/images/x.jpg`.
 */
export function asset(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}
