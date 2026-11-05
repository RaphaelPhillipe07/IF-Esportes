# Guia do Figma: protótipo, wireframes e validação

**Projeto:** IF Esportes · **Versão:** 1.0 · 04/11/2026

> Este guia explica como levar as 18 telas e os 8 wireframes para o Figma, organizar o arquivo, compartilhar o link e registrar tudo no TAP. Os PNGs **ainda não foram exportados**; o script está pronto para quando a equipe aprovar as telas.

---

## 1. O que já está pronto

| Item | Onde está |
|---|---|
| 18 telas de alta fidelidade | Aplicação React em `src/screens/` |
| Galeria navegável | Rota `/galeria` |
| 8 wireframes de referência (SVG) | `design/wireframes/*.svg` e `public/wireframes/*.svg` — versão final será feita no Figma |
| Tokens de design | `design/tokens.json` |
| Marca e logo | `public/logo-if-esportes.svg`, `public/app-icon.svg` |
| Script de exportação | `scripts/export-figma.mjs` (não executado) |

---

## 2. Rodando o protótipo

```bash
npm install
npm run dev
# http://localhost:5173
```

Ou com build de produção:

```bash
npm run build
npm run preview
# http://localhost:4173
```

Para esconder o atalho flutuante da galeria antes de capturar, acrescente `?capture=1` à URL. Exemplo: `http://localhost:5173/modalidades?capture=1`.

---

## 3. Rotas para importar

### Desktop (frame 1440 × 900)

| # | Tela | Rota |
|---|---|---|
| 01 | Home | `/` |
| 02 | Catálogo de modalidades | `/modalidades` |
| 03 | Detalhe da modalidade | `/modalidades/natacao` |
| 04 | Solicitação de vaga | `/modalidades/natacao/inscricao` |
| 05 | Torneios | `/torneios` |
| 06 | Detalhe do torneio | `/torneios/jogos-internos-2026` |
| 07 | Notícias e editais | `/noticias` |
| 08 | Entrar | `/entrar` |
| 08b | Criar conta | `/entrar?tab=cadastro` |
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

### Estados adicionais úteis

| Tela | Rota/estado |
|---|---|
| Torneio · Chaves | `/torneios/jogos-internos-2026` → aba “Chaves” |
| Torneio · Classificação | mesma rota → aba “Classificação” |
| Torneio · Resultados | mesma rota → aba “Resultados” |
| Inscrição · etapa 1 | `/modalidades/natacao/inscricao` → “Voltar” |
| Inscrição · confirmação | mesma rota → “Enviar solicitação” |
| Relatórios · auditoria | `/admin/relatorios#auditoria` |

### Mobile (frame 390 × 844)

Repita as rotas principais: Home, Catálogo, Detalhe, Inscrição, Login/OTP, Dashboard, Minhas inscrições, Passaporte, Painel da atlética e Painel admin. O app shell troca a sidebar pela barra inferior automaticamente.

---

## 4. Método A — plugin html.to.design (recomendado)

1. No Figma, abra **Community** e instale o plugin **html.to.design**.
2. Rode `npm run dev` (ou `npm run preview`) e confirme que a rota abre no navegador.
3. No Figma, crie um arquivo novo e uma página `03 · Protótipo Desktop`.
4. Execute o plugin → **Import from URL**.
5. Cole `http://localhost:5173/` (ou `http://localhost:4173/`).
6. Defina a largura do frame como **1440 px** e a altura como **900 px**.
7. Marque para importar fontes e imagens; aguarde o carregamento.
8. Importe cada rota da tabela em um frame separado.
9. Nomeie os frames: `01 · Home`, `02 · Catálogo` etc.
10. Para mobile, crie a página `04 · Protótipo Mobile` e repita com largura **390 px** e altura **844 px**.

**Dicas:**

- Use `?capture=1` para esconder o botão “Galeria de telas”.
- Se o plugin não acessar `localhost`, faça deploy do build (Vercel/Netlify) ou use `npx serve dist` e um túnel (ngrok/Cloudflare Tunnel).
- Importe uma rota por vez; páginas muito grandes podem perder camadas.
- Confira se as imagens de `/images` carregaram; aguarde a rede antes de importar.

---

## 5. Método B — wireframes no Figma

Os 8 wireframes de baixa fidelidade serão produzidos **no próprio Figma**, na página `02 · Wireframes`. Os SVGs em `design/wireframes/` servem como referência de conteúdo e estrutura, não como entrega final.

1. No Figma, crie a página `02 · Wireframes`.
2. Desenhe um frame de 1440 × 1000 para cada tela: Home, Catálogo, Detalhe, Inscrição, Acesso, Dashboard, Passaporte e Painel admin.
3. Use os SVGs de `design/wireframes/` como referência de hierarquia, anotações e legendas — ou importe um SVG como base e edite as camadas.
4. Nomeie os frames `WF 01 · Home` … `WF 08 · Painel admin`.
5. Aplique os tokens de `design/tokens.json` para manter a baixa fidelidade coerente com o protótipo.

Os SVGs também estão em `public/wireframes/` e podem ser abertos direto no navegador para consulta.

---

## 6. Método C — exportação em PNG (quando aprovado)

O script já existe, mas **não foi executado** para respeitar a etapa de revisão.

```bash
npx playwright install chromium
npm run export:figma
```

- Saída: `design/exports/desktop/` (1440 × 900) e `design/exports/mobile/` (390 × 844).
- O script usa `?capture=1`, espera as fontes e salva um PNG por rota.
- No Figma, arraste os PNGs para a página correspondente ou use **File → Place image**.
- Para manter camadas editáveis, prefira o método A.

---

## 7. Estrutura recomendada do arquivo no Figma

| Página | Conteúdo |
|---|---|
| `00 · Capa` | Nome, equipe, disciplina, versão, links e data |
| `01 · Visão e requisitos` | Resumo dos RF/RNF, atores e mapa de telas |
| `02 · Wireframes` | 8 frames de baixa fidelidade desenhados no Figma |
| `03 · Design System` | Cores, tipografia, espaçamento, componentes e variantes |
| `04 · Protótipo Desktop` | 18 frames de 1440 × 900 |
| `05 · Protótipo Mobile` | Fluxos principais em 390 × 844 |
| `06 · Fluxos e validação` | Diagramas de fluxo, roteiro de teste e resultados |

**Nomes de camadas:** use o mesmo vocabulário do código (`Header`, `Hero`, `CardModalidade`, `Sidebar`, `TabelaInscricoes`). Isso facilita a ponte com o React.

---

## 8. Tokens e design system no Figma

1. Instale o plugin **Tokens Studio for Figma**.
2. Importe `design/tokens.json`.
3. Aplique os tokens em **Figma Variables** (cores, tipografia, espaçamento, raio e sombra).
4. Crie os componentes base:
   - `Button` (variantes: primary, secondary, ghost, dark, lime, outlineLight, danger; tamanhos sm/md/lg; com/sem ícone; disabled).
   - `Badge` (green, lime, gray, amber, red, blue, dark, outline).
   - `Input`, `Select`, `Field` (default, focus, error, disabled).
   - `Card`, `StatCard`, `Progress`, `Tabs`, `Table`, `Alert`, `EmptyState`.
   - `Header`, `Sidebar`, `BottomNav`, `Footer`.
5. Use **Auto Layout** em todos os componentes e frames.
6. Crie variantes de estado para os componentes interativos.

**Tipografia:** Archivo (display) e Inter (texto). Se o plugin não carregar as fontes locais, instale-as no sistema ou use as versões do Google Fonts.

---

## 9. Protótipo navegável

Conecte os fluxos principais em **Prototype**:

1. **Visitante:** Home → Catálogo → Detalhe → Solicitar vaga → Login → OTP → Confirmação.
2. **Aluno:** Dashboard → Minhas inscrições → Passaporte.
3. **Atlética:** Painel → Equipes → Gestão de torneio → Lançar resultado.
4. **Coordenação:** Admin → Modalidades e turmas → Relatórios → Auditoria.

Em cada conexão, defina a interação (On click), a animação (Instant/Smart Animate) e o overflow (Vertical scrolling). Teste o fluxo em **Present**.

---

## 10. Compartilhamento e TAP

1. No Figma, clique em **Share**.
2. Selecione **Anyone with the link can view** (para o professor e a equipe).
3. Copie o link do arquivo e, se quiser, o link de cada página/frame.
4. Cole no TAP na seção **6.8 GitHub** ou crie a seção **6.9 Protótipo e wireframe**.

**Bloco pronto para o TAP:**

```markdown
## 6.9 Protótipo e wireframe

- **Protótipo de alta fidelidade (Figma):** [inserir link]
- **Wireframe de baixa fidelidade (Figma):** [inserir link]
- **Protótipo navegável (preview):** [inserir link do deploy ou instruções de execução]
- **Repositório GitHub:** [inserir link]
- **Design system e tokens:** [inserir link da página no Figma]

O arquivo do Figma contém as páginas Capa, Wireframes, Design System, Protótipo Desktop,
Protótipo Mobile e Fluxos. As telas foram construídas em React + Vite + Tailwind e importadas
para o Figma com o plugin html.to.design; os wireframes de baixa fidelidade foram desenhados
diretamente no Figma. A validação com usuários está registrada na página Fluxos e validação.
```

Se preferir um único link, use o link do arquivo e indique as páginas:

- Wireframe: página `02 · Wireframes`.
- Protótipo: página `04 · Protótipo Desktop`.

---

## 11. Validação com usuários

**Roteiro de 5 tarefas (15–20 min por pessoa):**

1. Encontre a modalidade Natação e confira os horários.
2. Solicite vaga na turma com disponibilidade.
3. Consulte sua posição na fila de espera.
4. Abra o passaporte e identifique sua frequência.
5. Como atlética, localize e homologue uma inscrição.

**Registre:** sucesso/falha, tempo, cliques, dúvidas e falas. Aplique SUS ou uma escala de satisfação de 1 a 5. Consolide em `docs/validacao/` e atualize o protótipo antes da entrega.

**Métricas de aceite:** sucesso ≥ 80%, SUS ≥ 70, nenhum erro crítico de navegação.

---

## 12. Checklist antes de entregar

- [ ] 18 frames desktop (1440 × 900) e mobile dos fluxos principais (390 × 844).
- [ ] 8 wireframes desenhados e nomeados no Figma.
- [ ] Design system com cores, tipografia, componentes e variantes.
- [ ] Links do Figma no TAP e no README.
- [ ] Compartilhamento “anyone with the link can view”.
- [ ] Protótipo navegável testado em Present.
- [ ] Imagens e fontes carregadas.
- [ ] Textos revisados em português.
- [ ] Contraste e foco conferidos.
- [ ] PNGs exportados somente após a aprovação das telas.
- [ ] Dados de demonstração, sem informações reais de alunos.

---

## 13. Solução de problemas

| Problema | Solução |
|---|---|
| Plugin não abre `localhost` | Faça deploy do build ou use túnel; confira se o servidor está rodando |
| Fontes substituídas | Instale Archivo/Inter no sistema ou use Google Fonts |
| Imagens faltando | Aguarde o carregamento e confira `/images/...`; importe novamente |
| Página cortada | Ajuste o frame para 1440 × 900 e desative “full page” |
| Cores diferentes | Importe `design/tokens.json` e use os mesmos hexadecimais |
| Rotas dinâmicas | Use os slugs concretos da tabela (`natacao`, `jogos-internos-2026`) |
| Camadas demais | Importe uma rota por vez e agrupe por tela |
| SVGs sem texto editável | Desagrupe ou use a versão do Figma com o plugin de SVG |
