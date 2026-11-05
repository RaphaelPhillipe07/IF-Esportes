# Repositório, processo e qualidade

**Projeto:** IF Esportes · **Repositório sugerido:** `if-esportes` ou `plataforma-esportes-ifal`
**Versão:** 1.0 · 04/11/2026

---

## 1. Estrutura atual do repositório

```text
if-esportes/
├─ docs/                    # requisitos, design, marca, processo e guia do Figma
├─ design/
│  ├─ tokens.json           # tokens para Tokens Studio / Figma Variables
│  ├─ wireframes/           # 8 SVGs de referência para os wireframes do Figma
│  └─ exports/              # PNGs gerados para o Figma (quando aprovado)
├─ public/
│  ├─ images/               # fotos de demonstração
│  ├─ wireframes/           # cópia dos SVGs servida pelo preview
│  ├─ logo-if-esportes.svg
│  ├─ logo-if-esportes-dark.svg
│  ├─ app-icon.svg
│  └─ favicon.svg
├─ scripts/
│  ├─ generate-wireframes.py
│  └─ export-figma.mjs
├─ src/
│  ├─ components/           # UI, marca, cards, gráficos, bracket
│  ├─ config/brand.ts       # nome, tagline e instituição
│  ├─ data/                 # tipos e dados de demonstração
│  ├─ layouts/              # público, autenticação e app shell
│  ├─ lib/                  # utilitários (cn, datas, percentuais)
│  ├─ screens/              # 18 telas
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ .github/                 # CI, PR template e issues
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ tsconfig.json
└─ vite.config.ts
```

Quando o backend entrar, a estrutura pode evoluir para monorepo:

```text
apps/
  web/        # React + Vite
  api/        # Node/TypeScript ou Spring Boot
packages/
  ui/         # componentes compartilhados
  config/     # ESLint, TS, Tailwind
infra/        # docker, migrations, seeds
```

---

## 2. Criando o repositório

```bash
git init
git add .
git commit -m "chore: estrutura inicial do protótipo IF Esportes"
git branch -M main
git remote add origin https://github.com/<usuario>/if-esportes.git
git push -u origin main
```

No GitHub:

1. Crie o repositório **privado** durante a disciplina e torne público na entrega, se o orientador permitir.
2. Adicione a descrição: “Plataforma de Esportes e Gestão Atlética do IFAL Campus Maceió — protótipo acadêmico”.
3. Ative **Issues**, **Projects** e **Discussions** (opcional).
4. Em **Settings → Branches**, proteja `main`: exija PR e status checks.
5. Em **Settings → Actions**, permita os workflows do repositório.

---

## 3. Branches e commits

| Branch | Uso |
|---|---|
| `main` | Versão estável, sempre buildando |
| `develop` | Integração contínua (opcional para equipe pequena) |
| `feat/RF-03-inscricao` | Nova funcionalidade ligada a um RF |
| `fix/fila-espera-posicao` | Correção |
| `docs/requisitos-v1` | Documentação |
| `design/tela-passaporte` | Protótipo e design |

**Conventional Commits:**

```text
feat(inscricoes): adiciona validação de conflito de horário
fix(auth): corrige expiração do código OTP
docs(requisitos): refina critérios de aceitação do RF-03
style(ui): ajusta contraste do botão secundário
refactor(api): extrai serviço de capacidade de turma
test(torneios): cobre homologação de resultado
chore(ci): adiciona build de produção
```

**Regras:**

- Um PR = uma intenção. Evite misturar refatoração, feature e formatação.
- Commits pequenos e com mensagem no imperativo.
- Sempre rebase/merge com `main` antes de abrir o PR.
- Nunca commitar `.env`, senhas, tokens ou dados reais de alunos.

---

## 4. Template de PR

```markdown
## O que muda
- ...

## Requisitos atendidos
- RF-03.1, RN-01, RN-02

## Como testar
1. `npm install`
2. `npm run dev`
3. Acessar `/modalidades/natacao/inscricao`

## Checklist
- [ ] Typecheck e build passam
- [ ] Testei em 360 px e 1440 px
- [ ] Contraste e foco conferidos
- [ ] Atualizei a documentação/Figma, se necessário
- [ ] Não incluí dados pessoais ou segredos
```

O arquivo está em `.github/pull_request_template.md`.

---

## 5. Issues, labels e milestones

**Labels sugeridas:**

`tipo: feat`, `tipo: fix`, `tipo: docs`, `tipo: design`, `tipo: teste`, `area: auth`, `area: modalidades`, `area: torneios`, `area: perfil`, `area: admin`, `prioridade: alta`, `prioridade: média`, `prioridade: baixa`, `status: bloqueado`, `bom primeireiro-issue`.

**Milestones:**

- `Sprint 0 — Descoberta e protótipo` (set/out)
- `Sprint 1 — Modalidades e vagas` (out)
- `Sprint 2 — Torneios e tabelas` (nov)
- `Sprint 3 — Perfil do atleta` (nov)
- `Sprint 4 — QA, homologação e apresentação` (dez)

**GitHub Projects (Kanban):** `Backlog → To Do → In Progress → Review → Done`. Cada card deve citar o RF/RN e a tela correspondente.

---

## 6. CI/CD

Workflow em `.github/workflows/ci.yml`:

- instala dependências com `npm ci`;
- roda `npm run typecheck`;
- roda `npm run build`;
- publica o `dist` como artefato.

Quando o backend existir, acrescente:

- `npm test` (Vitest/Jest) e cobertura;
- `npx playwright test` para E2E;
- lint (ESLint) e formatação (Prettier);
- análise de segurança (CodeQL) e Dependabot.

**Deploy gratuito sugerido:**

| Camada | Opção |
|---|---|
| Frontend | Vercel, Netlify ou Cloudflare Pages |
| API | Render, Fly.io ou Railway |
| Banco | Neon, Supabase ou Railway Postgres |
| Monitoramento | UptimeRobot + logs do provedor |
| Preview de PR | Deploy automático do provedor |

Configure `VITE_API_URL` no ambiente de preview e produção.

---

## 7. Variáveis de ambiente

Crie `.env.example` (nunca o `.env` real):

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=development
```

No backend:

```env
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=troque-por-um-segredo-forte
SMTP_HOST=smtp.exemplo.com
SMTP_USER=no-reply@ifal.edu.br
SMTP_PASS=troque
```

---

## 8. Testes e qualidade

| Camada | Ferramenta sugerida | O que cobrir |
|---|---|---|
| Regras de negócio | Vitest (ou JUnit, se Java) | Capacidade, fila, conflito, unicidade, homologação |
| Componentes | Testing Library | Formulários, estados, acessibilidade |
| E2E | Playwright | Inscrição, login/OTP, torneio, relatório |
| API | Supertest / Postman | Contratos, erros, permissões |
| Carga | k6 | Consultas < 2 s e pico de inscrições |
| Acessibilidade | axe-core | Contraste, labels, foco |

**Meta inicial:** 70% de cobertura nas regras de negócio e 100% dos fluxos críticos em E2E.

**Definition of Done:**

- [ ] Requisito e critério de aceitação atendidos.
- [ ] Typecheck, build e testes passando.
- [ ] Responsivo em 360 px e 1440 px.
- [ ] Acessibilidade básica conferida.
- [ ] Documentação/Figma atualizados.
- [ ] PR revisado por outro integrante.
- [ ] Sem dados reais ou segredos no commit.

---

## 9. Segurança e LGPD

- Senhas com Argon2id ou BCrypt; nunca armazenar texto puro.
- JWT com expiração curta e refresh token; rotas administrativas protegidas por papel.
- Validação e sanitização no backend; nunca confiar apenas no frontend.
- Rate limit em login, OTP e recuperação de senha.
- HTTPS obrigatório em produção.
- Dados pessoais mínimos; relatórios públicos agregados/anonimizados.
- Logs sem CPF, e-mail completo ou senha.
- Backup criptografado e restore testado.
- Política de privacidade e termo de uso acessíveis.

---

## 10. Roadmap sugerido (2026.2)

| Período | Entrega |
|---|---|
| Set | TAP, escopo, requisitos iniciais |
| Out | Protótipo e wireframes; setup do repositório; modelagem do banco |
| Out–Nov | Sprint 1: modalidades, turmas, inscrição e fila |
| Nov | Sprint 2: torneios, chaves, resultados e classificação |
| Nov | Sprint 3: passaporte, frequência e relatórios |
| Dez | QA, testes de carga, homologação, manuais e apresentação |

---

## 11. Licença e créditos

- Código: **MIT** (ou outra licença aprovada pela equipe).
- Documentação e design: **CC BY-NC-SA 4.0** para uso acadêmico.
- Imagens de demonstração: Unsplash — ver [`docs/creditos-imagens.md`](./creditos-imagens.md).
- Marca IFAL: uso acadêmico; publicação oficial requer autorização institucional.

---

## 12. Próximos passos técnicos

1. Criar o repositório e subir este protótipo.
2. Adicionar ESLint + Prettier + Vitest.
3. Modelar o MER e criar as migrations.
4. Implementar autenticação com OTP e RBAC.
5. Trocar os dados mockados por uma API real.
6. Adicionar testes E2E dos fluxos críticos.
7. Configurar deploy de preview e backup.
