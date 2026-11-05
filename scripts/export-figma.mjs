/**
 * Exporta as telas do protótipo em PNG para importar no Figma.
 *
 * Pré-requisitos:
 *   1. npm run build && npm run preview   (ou npm run dev e ajuste BASE_URL)
 *   2. npx playwright install chromium
 *   3. npm run export:figma
 *
 * Saída:
 *   design/exports/desktop/*.png  (1440 × 900)
 *   design/exports/mobile/*.png   (390 × 844)
 *
 * Este script NÃO foi executado na entrega inicial: a exportação aguarda a
 * aprovação visual das telas pela equipe.
 */

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4173'
const OUT_DIR = path.resolve('design', 'exports')

const routes = [
  { n: '01', slug: 'home', path: '/' },
  { n: '02', slug: 'catalogo', path: '/modalidades' },
  { n: '03', slug: 'modalidade', path: '/modalidades/natacao' },
  { n: '04', slug: 'inscricao', path: '/modalidades/natacao/inscricao' },
  { n: '05', slug: 'torneios', path: '/torneios' },
  { n: '06', slug: 'torneio', path: '/torneios/jogos-internos-2026' },
  { n: '07', slug: 'noticias', path: '/noticias' },
  { n: '08', slug: 'entrar', path: '/entrar' },
  { n: '08b', slug: 'cadastro', path: '/entrar?tab=cadastro' },
  { n: '09', slug: 'verificar', path: '/verificar' },
  { n: '10', slug: 'dashboard-aluno', path: '/app' },
  { n: '11', slug: 'inscricoes-aluno', path: '/app/inscricoes' },
  { n: '12', slug: 'passaporte', path: '/app/atleta' },
  { n: '13', slug: 'painel-atletica', path: '/gestao' },
  { n: '14', slug: 'equipes', path: '/gestao/equipes' },
  { n: '15', slug: 'gestao-torneio', path: '/gestao/torneios/jogos-internos-2026' },
  { n: '16', slug: 'painel-admin', path: '/admin' },
  { n: '17', slug: 'modalidades-admin', path: '/admin/modalidades' },
  { n: '18', slug: 'relatorios', path: '/admin/relatorios' },
]

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

function urlFor(route) {
  const separator = route.path.includes('?') ? '&' : '?'
  return `${BASE_URL}${route.path}${separator}capture=1`
}

const browser = await chromium.launch()

for (const viewport of viewports) {
  const directory = path.join(OUT_DIR, viewport.name)
  await mkdir(directory, { recursive: true })

  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  for (const route of routes) {
    await page.goto(urlFor(route), { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(400)

    const file = path.join(directory, `${route.n}-${route.slug}-${viewport.name}.png`)
    await page.screenshot({ path: file, fullPage: false })
    console.log(`✓ ${file}`)
  }

  await context.close()
}

await browser.close()
console.log('\nExportação concluída. Importe os PNGs no Figma ou use o plugin html.to.design.')
