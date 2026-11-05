# IF Esportes

**Plataforma de Esportes e Gestão Atlética do IFAL Campus Maceió** — protótipo acadêmico do Projeto Integrador em Sistemas de Informação.

> **Nome provisório.** A marca está centralizada em [`src/config/brand.ts`](src/config/brand.ts); trocar o nome não exige alterar as telas.

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)

---

## O que é

Uma plataforma web responsiva para centralizar modalidades, turmas, inscrições, torneios, notícias e o passaporte esportivo dos alunos do IFAL Campus Maceió. O protótipo cobre os quatro perfis do TAP:

- **Visitante** — catálogo, torneios, notícias e editais.
- **Aluno-atleta** — inscrição em turmas, frequência e passaporte esportivo.
- **Atlética** — equipes, atletas, torneios, chaves e resultados.
- **Coordenação/Admin** — modalidades, turmas, homologações, relatórios e auditoria.

---

## Status

| Entrega | Situação |
|---|---|
| 18 telas de alta fidelidade | ✅ prontas |
| 8 wireframes de referência (SVG) | ✅ prontos · versão final no Figma |
| Galeria navegável | ✅ pronta |
| Requisitos refinados | ✅ documentados |
| Guia do Figma | ✅ documentado |
| Exportação PNG | ⏳ aguardando aprovação das telas |
| Backend/API | ⏳ próxima etapa |

O preview atual está em `http://localhost:4173` após `npm run build && npm run preview`. Para desenvolvimento, use `http://localhost:5173`.

---

## Stack

- **React 19 + TypeScript + Vite 6**
- **Tailwind CSS 3.4** com tokens próprios
- **React Router 7**
- **Lucide React** para ícones
- **Fontes variáveis** Archivo (display) e Inter (texto), via `@fontsource-variable`
- **Playwright** para a exportação futura em PNG

---

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`. Para o build de produção:

```bash
npm run build
npm run preview
```

### Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em `http://localhost:5173` |
| `npm run build` | Typecheck + build de produção em `dist/` (com `404.html` para o Pages) |
| `npm run preview` | Serve o build em `http://localhost:4173/IF-Esportes/` |
| `npm run typecheck` | Verificação de tipos |
| `npm run export:figma` | Exporta PNGs para o Figma (requer navegador do Playwright) |
| `python scripts/generate-wireframes.py` | Regenera os 8 SVGs de referência dos wireframes |

### Deploy no GitHub Pages

O build de produção usa `base: '/IF-Esportes/'` (definido em `vite.config.ts`), porque o site fica em
`https://<usuario>.github.io/IF-Esportes/`.

1. Em **Settings → Pages → Source**, selecione **GitHub Actions**.
2. Faça push na `main`: o workflow `.github/workflows/deploy-pages.yml` builda e publica `dist/`.
3. Se o repositório tiver outro nome (ou for um domínio próprio / `<usuario>.github.io`), ajuste
   `PAGES_BASE` em `vite.config.ts` — o valor precisa bater com o caminho público do site.

O script de build gera `dist/404.html` (fallback das rotas do React Router) e `dist/.nojekyll`.

---

## Telas

| # | Tela | Rota |
|---|---|---|
| 01 | Home | `/` |
| 02 | Catálogo de modalidades | `/modalidades` |
| 03 | Detalhe da modalidade | `/modalidades/natacao` |
| 04 | Solicitação de vaga | `/modalidades/natacao/inscricao` |
| 05 | Torneios | `/torneios` |
| 06 | Detalhe do torneio | `/torneios/jogos-internos-2026` |
| 07 | Notícias e editais | `/noticias` |
| 08 | Entrar / criar conta | `/entrar` |
| 09 | Verificação OTP | `/verificar` |
| 10 | Dashboard do aluno | `/app` |
| 11 | Minhas inscrições | `/app/inscricoes` |
| 12 | Passaporte esportivo | `/app/atleta` |
| 13 | Painel da atlética | `/gestao` |
| 14 | Equipes e atletas | `/gestao/equipes` |
| 15 | Gestão de torneio | `/gestao/torneios/jogos-internos-2026` |
| 16 | Painel administrativo | `/admin` |
| 17 | Modalidades e turmas | `/admin/modalidades` |
| 18 | Relatórios e auditoria | `/admin/relatorios` |

Galeria com todas as telas: `/galeria`.

---

## Documentação

- [Requisitos refinados](docs/01-requisitos.md) — RF, RNF, RN, histórias, Gherkin, matriz e roteiro de entrevistas.
- [Inspiração e design](docs/02-inspiracao-design.md) — sites para referência e decisões visuais.
- [Marca e logo](docs/03-marca-e-logo.md) — nome, posicionamento, conceito e prompts de logo.
- [Repositório e processo](docs/04-repositorio-e-processo.md) — branches, CI, issues, deploy e qualidade.
- [Guia do Figma](docs/05-guia-figma.md) — importação, estrutura, protótipo e texto para o TAP.
- [Créditos das imagens](docs/creditos-imagens.md).

---

## Estrutura

```text
src/
  components/   # UI, marca, cards, gráficos, bracket
  config/       # brand.ts
  data/         # tipos e dados de demonstração
  layouts/      # público, auth e app shell
  lib/          # utilidades
  screens/      # 18 telas
  App.tsx
  index.css
  main.tsx
design/
  tokens.json
  wireframes/
docs/
public/
scripts/
```

---

## Acessibilidade e responsividade

- Layout de 360 px a 1920 px.
- Foco visível, labels, `aria-label` e navegação por teclado.
- Contraste AA e status que não dependem só de cor.
- `prefers-reduced-motion` respeitado.
- Tabelas com scroll horizontal controlado.

---

## Próximos passos

1. Revisar as 18 telas com a equipe e a coordenação.
2. Ajustar o que for apontado na validação.
3. Exportar os PNGs e montar o arquivo do Figma.
4. Criar o repositório no GitHub e configurar o CI.
5. Modelar o MER e iniciar o backend.
6. Substituir os dados mockados pela API.
7. Testes E2E e homologação.

---

## Licença e uso

Projeto acadêmico do IFAL Campus Maceió. Código sob licença MIT (a definir com a equipe); documentação e design sob CC BY-NC-SA 4.0. A marca IFAL é institucional e seu uso oficial requer autorização. As fotos são de demonstração (Unsplash) e devem ser substituídas por imagens autorizadas do campus.
