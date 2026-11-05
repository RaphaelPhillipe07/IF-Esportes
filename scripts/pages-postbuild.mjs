import { copyFile, writeFile } from 'node:fs/promises'

/**
 * Ajustes pós-build para o GitHub Pages:
 *
 * 1. `404.html` — o Pages não conhece as rotas do React Router. Ao acessar
 *    uma URL profunda (ex.: /IF-Esportes/torneios/jogos-internos-2026), o
 *    servidor devolve o 404.html, que carrega o app e deixa o router resolver
 *    a rota.
 * 2. `.nojekyll` — evita que o Jekyll do Pages tente processar o build.
 */
const dist = new URL('../dist/', import.meta.url)

await copyFile(new URL('index.html', dist), new URL('404.html', dist))
await writeFile(new URL('.nojekyll', dist), '')

console.log('GitHub Pages: dist/404.html e dist/.nojekyll gerados.')
