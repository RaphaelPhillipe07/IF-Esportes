# Levantamento e refinamento de requisitos

**Projeto:** IF Esportes — Plataforma de Esportes e Gestão Atlética do IFAL Campus Maceió
**Disciplina:** Projeto Integrador em Sistemas de Informação
**Versão:** 1.0 · 04/11/2026
**Base:** TAP v1.1 (set/2026) + leitura do escopo + protótipo de alta fidelidade

> Este documento **não substitui o TAP**: ele refina o que já está lá, mantendo a numeração original (RF-01 a RF-09, RNF-01 a RNF-05 e RN-01 a RN-06) para preservar a rastreabilidade. Requisitos novos aparecem marcados como **sugeridos** e só entram no escopo após aprovação da equipe e do orientador.

---

## 1. Método de levantamento

1. **Análise documental** do TAP, da EAP, dos casos de uso e das regras de negócio.
2. **Entrevistas semiabertas** com três grupos: coordenação de esportes, representantes de atlética e alunos-atletas.
3. **Observação do fluxo atual**: murais, planilhas, grupos de mensagem e inscrições presenciais.
4. **Prototipação** das telas críticas para validar vocabulário, hierarquia e regras antes do código.
5. **Validação** com 5 a 8 participantes por meio de teste de usabilidade e questionário SUS.

### Atores

| Ator | Descrição | Principais interesses |
|---|---|---|
| Visitante | Comunidade acadêmica ainda sem login | Consultar modalidades, torneios, notícias e editais |
| Aluno-atleta | Discente com vínculo validado | Inscrever-se em turmas, acompanhar frequência e passaporte |
| Representante de atlética | Estudante autorizado pela coordenação | Gerenciar equipes, atletas, torneios e comunicados |
| Coordenação / Administrador | Servidor ou docente responsável | Homologar atléticas, turmas, resultados, permissões e relatórios |

---

## 2. Requisitos funcionais refinados

Legenda de prioridade (MoSCoW): **M** = Must (MVP), **S** = Should, **C** = Could, **W** = Won't neste semestre.

### RF-01 — Autenticação e perfis

| Código | Requisito | Prioridade | Critério de aceitação | Telas |
|---|---|---|---|---|
| RF-01.1 | Autocadastro com nome completo, CPF, matrícula/SIAPE, e-mail institucional e senha | M | Cadastro só é aceito com CPF único e e-mail `@aluno.ifal.edu.br` ou `@ifal.edu.br`; erros são exibidos por campo | 08 |
| RF-01.2 | Validação do e-mail por código OTP de 6 dígitos | M | Código enviado em até 1 min, válido por 10 min, com reenvio e limite de tentativas | 09 |
| RF-01.3 | Login, logout e recuperação de senha | M | Sessão protegida por token; recuperação envia link/código e invalida o anterior | 08 |
| RF-01.4 | Controle de acesso por papéis (RBAC) | M | Aluno não acessa rotas de atlética/coordenação; permissões elevadas só são atribuídas pelo Administrador | 13–18 |
| RF-01.5 | Perfil do usuário e consentimento LGPD | M | Usuário visualiza e edita dados permitidos; consentimento registrado com data e versão | 08, 12 |

**Regras associadas:** RN-04, RN-05.

### RF-02 — Catálogo de modalidades

| Código | Requisito | Prioridade | Critério de aceitação | Telas |
|---|---|---|---|---|
| RF-02.1 | Listar modalidades ativas | M | Catálogo exibe nome, categoria, local, dias, horários, instrutor e status | 01, 02 |
| RF-02.2 | Filtrar por categoria, local, dia e disponibilidade de vagas | M | Filtros combinam entre si e podem ser limpos em um clique | 02 |
| RF-02.3 | Exibir detalhe da modalidade | M | Detalhe mostra descrição, turmas, vagas, pré-requisitos, equipamentos e professor | 03 |
| RF-02.4 | Exibir locais e horários dos espaços | S | Cada turma informa local e faixa de horário; conflito de espaço é sinalizado à coordenação | 03, 17 |
| RF-02.5 | Exibir status de vagas em tempo real | M | Ao lotar, a turma muda para “lotada” e passa a oferecer fila de espera | 02, 03 |

### RF-03 — Inscrição em turmas

| Código | Requisito | Prioridade | Critério de aceitação | Telas |
|---|---|---|---|---|
| RF-03.1 | Solicitar vaga em uma turma | M | Aluno autenticado escolhe turma, aceita o regulamento e recebe protocolo | 04 |
| RF-03.2 | Validar capacidade máxima | M | Sistema bloqueia inscrição acima da capacidade e oferece fila de espera | 03, 04 |
| RF-03.3 | Gerenciar fila de espera | M | Posição visível; promoção automática quando uma vaga é liberada, com prazo de confirmação | 10, 11 |
| RF-03.4 | Bloquear conflito de dia e horário | M | Inscrição em duas modalidades no mesmo dia/horário é impedida com mensagem explicativa | 04 |
| RF-03.5 | Cancelar solicitação/inscrição | S | Cancelamento libera a vaga e registra o motivo; prazo mínimo de 24h antes do encontro | 11 |
| RF-03.6 | Acompanhar status da solicitação | M | Estados: pendente, ativa, fila, concluída, cancelada; alteração reflete em até 5 s | 10, 11 |
| RF-03.7 | Emitir comprovante de inscrição | C | PDF/print com modalidade, turma, horário, local e protocolo | 11 |

**Regras associadas:** RN-01, RN-02, RN-06.

### RF-04 — Torneios e eventos

| Código | Requisito | Prioridade | Critério de aceitação | Telas |
|---|---|---|---|---|
| RF-04.1 | Listar torneios e eventos | M | Lista com período, local, status, número de equipes/jogos e filtros | 05 |
| RF-04.2 | Exibir detalhe com chaves, classificação e resultados | M | Abas de visão geral, chaves, classificação, resultados e regulamento | 06 |
| RF-04.3 | Criar e editar torneio (atlética/coordenação) | M | Formulário com nome, modalidade, período, local, formato e prazo de inscrição | 15 |
| RF-04.4 | Inscrever equipes e atletas | M | Representante inscreve equipe; atleta só pode estar em uma equipe por modalidade | 14, 15 |
| RF-04.5 | Lançar e homologar resultados | M | Resultado homologado não pode ser editado sem justificativa registrada em log | 15 |
| RF-04.6 | Calcular classificação automaticamente | S | Pontos, saldo e critérios de desempate atualizados após homologação | 06 |
| RF-04.7 | Publicar regulamento e documentos | S | Anexos disponíveis para download na página do torneio | 05, 06 |

**Regras associadas:** RN-03, RN-05, RN-06.

### RF-05 — Perfil do aluno-atleta (Passaporte Esportivo)

| Código | Requisito | Prioridade | Critério de aceitação | Telas |
|---|---|---|---|---|
| RF-05.1 | Exibir dados esportivos do estudante | M | Nome, matrícula, curso, modalidades ativas e desde quando pratica | 12 |
| RF-05.2 | Exibir histórico de torneios | M | Lista cronológica com torneio, modalidade, resultado e data | 12 |
| RF-05.3 | Exibir medalhas e conquistas | M | Contagem por tipo e detalhe do evento | 12 |
| RF-05.4 | Exibir frequência por modalidade | M | Percentual por turma, com alerta abaixo de 75% | 10, 11, 12 |
| RF-05.5 | Exibir estatísticas básicas | S | Treinos, provas, pódios e participação por modalidade | 12 |
| RF-05.6 | Compartilhar/exportar o passaporte | C | Link público somente leitura ou PDF com dados esportivos | 12 |

### RF-06 — Notícias e editais

| Código | Requisito | Prioridade | Critério de aceitação | Telas |
|---|---|---|---|---|
| RF-06.1 | Listar notícias, editais e comunicados | M | Ordenação por data, filtro por categoria e busca | 01, 07 |
| RF-06.2 | Exibir detalhe da publicação | M | Título, data, autor, conteúdo, anexos e links relacionados | 07 |
| RF-06.3 | Publicar conteúdo (atlética/coordenação) | M | Rascunho, publicação e destaque; autoria registrada | 07, 13 |
| RF-06.4 | Destacar publicação na home | S | No máximo 1 destaque principal por vez | 01 |
| RF-06.5 | Anexar editais em PDF | S | Download disponível e link validado | 06, 07 |

### RF-07 — Relatórios da coordenação

| Código | Requisito | Prioridade | Critério de aceitação | Telas |
|---|---|---|---|---|
| RF-07.1 | Lista de inscritos por esporte/turma | M | Filtro por modalidade, turma e período; totais conferem com a base | 16, 18 |
| RF-07.2 | Relatório de ocupação de horários | M | Percentual por faixa de horário e por espaço | 16, 18 |
| RF-07.3 | Relatório de fila de espera | S | Posição, tempo de espera e status | 18 |
| RF-07.4 | Indicadores gerais | S | Inscrições, ocupação média, atléticas ativas e pendências | 16 |

### RF-08 — Exportação de dados

| Código | Requisito | Prioridade | Critério de aceitação | Telas |
|---|---|---|---|---|
| RF-08.1 | Exportar CSV | M | Arquivo com cabeçalho, separador compatível com Excel e dados do período | 18 |
| RF-08.2 | Exportar PDF | S | Relatório com título, período, totais e data de geração | 18 |
| RF-08.3 | Restringir e auditar exportações | M | Apenas coordenação/admin exporta; ação registrada em log | 18 |

### RF-09 — Busca e filtros

| Código | Requisito | Prioridade | Critério de aceitação | Telas |
|---|---|---|---|---|
| RF-09.1 | Busca textual em modalidades, torneios e notícias | M | Busca por nome, local, professor e termos parciais, sem diferenciar maiúsculas | 02, 05, 07 |
| RF-09.2 | Filtros combináveis | M | Estado dos filtros visível e limpável | 02, 05, 07 |
| RF-09.3 | Ordenação de resultados | C | Por relevância, data, nome e vagas | 02, 05 |

### Requisitos sugeridos para a próxima revisão do TAP

| Código | Requisito | Prioridade | Justificativa |
|---|---|---|---|
| RF-10 | Notificações transacionais e central de avisos | S | OTP, confirmação de inscrição, promoção da fila e resultado homologado |
| RF-11 | Registro de presença/check-in por turma | S | Sustenta a frequência exibida no passaporte e a RN de 75% |
| RF-12 | Auditoria de ações administrativas | S | Já prevista na EAP e na RN-03; precisa de tela e exportação próprias |

---

## 3. Requisitos não funcionais

| Código | Requisito | Métrica / critério | Como verificar |
|---|---|---|---|
| RNF-01 | Desempenho | p95 < 2 s em rede institucional; API < 500 ms para consultas simples | Lighthouse, logs de APM, teste de carga com k6 |
| RNF-02 | Usabilidade | Encontrar modalidade ou torneio em até 3 cliques | Teste com 5 usuários e contagem de cliques |
| RNF-03 | Segurança | Senhas com Argon2id/BCrypt, JWT, HTTPS, proteção contra SQLi/XSS/CSRF, rate limit no login | Revisão de código, OWASP ZAP, testes de autenticação |
| RNF-04 | Disponibilidade | 99,5% no horário acadêmico (07h–22h), sem travamentos críticos | Monitoramento sintético e alertas |
| RNF-05 | Backup | Diário, RPO 24h, RTO 4h, restauração testada e registrada | Simulação de restore trimestral |
| RNF-06 | Acessibilidade (sugerido) | WCAG 2.1 AA / eMAG: contraste ≥ 4,5:1, foco visível, navegação por teclado, alt text | axe DevTools, teste manual com teclado e leitor de tela |
| RNF-07 | Responsividade | 360 px a 1920 px, sem scroll horizontal | Teste em 360, 390, 768, 1024, 1440 |
| RNF-08 | Compatibilidade | Chrome, Firefox e Edge (últimas 2 versões) | Matriz de testes manuais |
| RNF-09 | Privacidade/LGPD (sugerido) | Minimização, consentimento, retenção definida, relatórios anonimizados | Revisão de dados e política de privacidade |
| RNF-10 | Observabilidade (sugerido) | Logs estruturados, correlation id, métricas de erro e alertas | Painel de logs e alertas |
| RNF-11 | Manutenibilidade (sugerido) | Cobertura ≥ 70% nas regras de negócio, lint e tipagem estrita | CI e relatório de cobertura |
| RNF-12 | SEO das páginas públicas (sugerido) | Título, descrição, Open Graph e sitemap | Lighthouse SEO |

---

## 4. Regras de negócio

| Código | Regra | Exemplos e casos-limite |
|---|---|---|
| RN-01 | Limite de vagas e fila de espera | Turma com 20 vagas e 20 inscritos → nova solicitação entra na fila com posição; ao cancelar, o primeiro da fila é promovido e tem 24h para confirmar |
| RN-02 | Conflito de horário | Aluno em Voleibol (seg/qua 17h) não pode entrar em Natação (seg/qua 17h); o sistema compara dia + faixa de horário |
| RN-03 | Resultado homologado é imutável sem justificativa | Edição exige perfil autorizado, justificativa e gera log com antes/depois |
| RN-04 | Unicidade documental e vínculo acadêmico | CPF único; e-mail institucional validado por OTP; matrícula/SIAPE obrigatória; permissões elevadas separadas |
| RN-05 | Criação de atlética e permissões | Atlética só é criada/aprovada por Administrador/Coordenação; representantes são associados depois |
| RN-06 | Disponibilidade dos dados | Alterações homologadas refletem em até 5 s nas telas de modalidades, torneios e perfil |
| RN-07 (sugerida) | Frequência mínima | 75% de presença para certificado e permanência na turma; abaixo disso, alerta e revisão da coordenação |
| RN-08 (sugerida) | Vínculo esportivo único | Um atleta por equipe e por modalidade em cada torneio; limite de 8 a 14 atletas por equipe |

---

## 5. Histórias de usuário

- **US-01** — Como aluno-atleta, quero encontrar uma modalidade e solicitar vaga para começar a treinar sem ir até a coordenação.
- **US-02** — Como aluno-atleta, quero ver minha frequência e meu histórico para comprovar minha participação esportiva.
- **US-03** — Como representante de atlética, quero homologar inscrições e vincular atletas para montar minhas equipes.
- **US-04** — Como coordenação, quero criar um torneio e publicar as chaves para centralizar a comunicação.
- **US-05** — Como atlética, quero lançar e homologar resultados para manter a classificação atualizada.
- **US-06** — Como coordenação, quero exportar a lista de inscritos para prestar contas e planejar turmas.
- **US-07** — Como visitante, quero ler o edital e conferir os horários antes de me cadastrar.
- **US-08** — Como administrador, quero atribuir o perfil de atlética para delegar a gestão com segurança.

### Critérios de aceitação em Gherkin

**Fluxo de inscrição (RF-03 + RN-01 + RN-02)**

```gherkin
Cenário: aluno solicita vaga em turma com disponibilidade
  Dado que estou autenticado com e-mail institucional validado
  E a turma "Natação A" possui vagas disponíveis
  Quando seleciono a turma e aceito o regulamento
  Então o sistema registra a solicitação com status "pendente"
  E exibe o protocolo e a previsão de homologação

Cenário: turma lotada gera fila de espera
  Dado que a turma "Futsal única" está com 24 de 24 vagas
  Quando solicito vaga
  Então o sistema me posiciona na fila de espera
  E informa minha posição e o prazo de confirmação

Cenário: conflito de horário bloqueia inscrição
  Dado que já estou inscrito em Voleibol às segundas e quartas, 17h
  Quando tento entrar em uma turma de Natação no mesmo dia e horário
  Então o sistema bloqueia a solicitação
  E explica o conflito com o nome da outra modalidade
```

**Torneio e resultado (RF-04 + RN-03)**

```gherkin
Cenário: homologação de resultado
  Dado que sou representante da atlética responsável pelo torneio
  Quando lanço o placar de uma partida e marco "homologar"
  Então o resultado fica visível na chave e na classificação
  E uma edição posterior exige justificativa e gera log de auditoria
```

**Cadastro e verificação (RF-01 + RN-04)**

```gherkin
Cenário: cadastro com e-mail institucional
  Dado que informo CPF ainda não cadastrado
  E uso um e-mail terminado em @aluno.ifal.edu.br
  Quando envio o cadastro
  Então recebo um código de 6 dígitos
  E só consigo acessar a área do aluno após validar o código
```

---

## 6. Priorização e MVP

**Must (MVP até a entrega):** RF-01.1–01.4, RF-02.1–02.3, RF-03.1–03.4, RF-04.1–04.5, RF-05.1–05.4, RF-06.1–06.3, RF-07.1–07.2, RF-08.1, RF-09.1–09.2.

**Should:** RF-01.5, RF-02.4–02.5, RF-03.5–03.6, RF-04.6–04.7, RF-05.5, RF-06.4–06.5, RF-07.3–07.4, RF-08.2–08.3, RF-09.3, RF-10, RF-11.

**Could:** RF-03.7, RF-05.6, RF-12.

**Won't neste semestre:** venda de ingressos, transmissão ao vivo, aplicativo nativo, integração com catraca física.

---

## 7. Matriz de rastreabilidade

| Requisito | Telas | Casos de uso | Regras |
|---|---|---|---|
| RF-01 | 08, 09 | Cadastrar-se / autenticar-se | RN-04, RN-05 |
| RF-02 | 01, 02, 03, 17 | Consultar catálogo / gerenciar modalidades | RN-06 |
| RF-03 | 03, 04, 10, 11 | Solicitar vaga / cancelar inscrição | RN-01, RN-02, RN-06 |
| RF-04 | 05, 06, 13, 15 | Criar torneio / gerenciar chaves e resultados | RN-03, RN-05, RN-06 |
| RF-05 | 10, 11, 12, 14 | Consultar perfil do atleta | RN-07 (sugerida) |
| RF-06 | 01, 07 | Publicar notícia/edital | — |
| RF-07 | 16, 18 | Emitir relatórios | RN-06 |
| RF-08 | 18 | Exportar dados | RN-03 |
| RF-09 | 02, 05, 07 | Buscar e filtrar | — |

---

## 8. Roteiro de entrevistas

### Coordenação de Esportes (30–40 min)

1. Quais modalidades, turmas, horários e espaços estão ativos hoje?
2. Como as vagas são controladas e o que acontece quando lotam?
3. Quais documentos e regras o aluno precisa cumprir para se matricular?
4. Como a frequência é registrada e cobrada?
5. Quem pode criar turmas, homologar resultados e exportar relatórios?
6. Como os torneios são organizados e divulgados?
7. Quais relatórios a coordenação precisa emitir e com que frequência?
8. Quais dados são sensíveis e como devem aparecer em relatórios públicos?
9. O que não pode faltar no primeiro semestre de uso?
10. Que indicador faria você considerar o projeto um sucesso?

### Representantes de atlética (25–30 min)

1. Como a atlética se organiza e quem são os representantes?
2. Como vocês cadastram equipes e vinculam atletas hoje?
3. Quais informações são mais difíceis de manter atualizadas?
4. Como funcionam as inscrições e a comunicação dos torneios?
5. Quem pode lançar e homologar resultados?
6. Que permissões a atlética precisa ter — e o que não deve poder fazer?
7. O que ajudaria a reduzir o retrabalho com planilhas e mensagens?
8. Como vocês divulgam notícias e editais para os alunos?

### Alunos-atletas (15–20 min)

1. Como você descobre modalidades, horários e vagas hoje?
2. O que mais te impede de se inscrever?
3. O que você gostaria de ver no seu histórico esportivo?
4. Como prefere ser avisado sobre vagas, fila e resultados?
5. O que tornaria o uso do celular confortável no dia a dia?
6. Que informação você nunca deixaria pública no seu perfil?

### Dados a coletar

- Lista de modalidades, turmas, locais, horários e capacidade.
- Calendário de torneios e regulamentos.
- Regras de matrícula, cancelamento e frequência.
- Estrutura das atléticas e responsáveis.
- Modelos de relatórios e editais existentes.

---

## 9. Plano de validação do protótipo

**Participantes:** 5 a 8 pessoas (3 alunos, 2 atlética, 1 coordenação, 1 professor convidado).

| # | Tarefa | Critério de sucesso | Métrica |
|---|---|---|---|
| 1 | Encontrar a modalidade Natação e conferir os horários | Chega ao detalhe em ≤ 3 cliques | Sucesso, cliques, tempo |
| 2 | Solicitar vaga na turma com disponibilidade | Conclui a solicitação e entende o status | Sucesso, erros |
| 3 | Consultar a posição na fila de espera | Localiza a informação em ≤ 2 cliques | Sucesso, tempo |
| 4 | Consultar o passaporte e identificar a frequência | Encontra frequência e medalhas | Sucesso |
| 5 | Como atlética, localizar e homologar uma inscrição | Conclui a ação sem ajuda | Sucesso, erros |

**Métricas globais:** sucesso ≥ 80%, tempo médio por tarefa, erros por tarefa, SUS ≥ 70 ou satisfação ≥ 4/5. Registrar falas e sugestões em `docs/validacao/`.

**Consentimento:** explicar que o teste avalia o protótipo, não a pessoa; pedir autorização para gravação e anonimizar os dados.

---

## 10. Perguntas em aberto

- A coordenação já possui uma base de dados oficial de modalidades e horários?
- O login será apenas por e-mail institucional ou também por gov.br?
- A frequência será registrada pelo professor, pela atlética ou por check-in do aluno?
- Quem homologa resultados: atlética organizadora, coordenação ou ambos?
- Haverá cobrança de mensalidade ou taxa de inscrição em alguma modalidade? (o TAP assume gratuito)
- Qual o prazo de retenção de logs e dados de atletas?
- O passaporte pode ser público por padrão ou apenas por link compartilhado?
- Existe restrição de uso da marca IFAL/IF Esportes que exija aprovação institucional?
