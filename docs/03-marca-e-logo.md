# Marca, nome e logo

**Nome provisório:** IF Esportes
**Assinatura:** IF Esportes · IFAL Campus Maceió
**Versão:** 1.0 · 04/11/2026

> O nome é **provisório** e está centralizado em `src/config/brand.ts`. Para trocar, altere `brand.name` e os textos derivados; as telas, a logo e o rodapé são atualizados automaticamente.

---

## 1. Critérios de naming

Um bom nome para este projeto deve:

1. ser curto e fácil de falar em português;
2. remeter a esporte, campus ou comunidade sem ser genérico;
3. funcionar como nome de produto, de app e de perfil social;
4. não colidir com marcas existentes nem com o nome oficial de setores do IFAL;
5. permitir uma logo simples, legível a 24 px;
6. ser aprovado pela coordenação e pela instituição.

---

## 2. Shortlist

| Nome | Prós | Contras | Avaliação |
|---|---|---|---|
| **IF Esportes** (provisório) | Claro, institucional, fácil de entender e buscar; alinhado ao IFAL | Genérico; pode se confundir com o setor oficial de esportes | **Escolhido para o protótipo**; validar com a coordenação |
| **Pulso** | Curto, memorável, remete a energia e atualização em tempo real; ótimo para logo | Pode soar como app de saúde | Forte candidato para a versão final |
| **Tribuna** | Remete a arquibancada, notícia e comunidade; combina com editais e torneios | Também é nome de veículos de imprensa | Bom se o foco for comunicação |
| **Passe** | Duplo sentido: passe esportivo + passaporte; curto | Pode ser confundido com ingresso | Bom para o conceito de passaporte |
| **InterAtlética** | Explica a integração entre atléticas | Longo e descritivo | Funciona como subtítulo |
| **Fôlego** | Energia, resistência, saúde | Menos institucional | Alternativa criativa |
| **Maré** | Identidade de Maceió, movimento e ritmo | Pouco explícito sobre esporte | Alternativa poética |

**Recomendação:** manter **IF Esportes** durante a disciplina, por clareza e alinhamento institucional, e decidir o nome definitivo após a validação com a coordenação. Se a equipe quiser um nome de produto, **Pulso** é a alternativa mais forte.

**Cuidado:** “IFAL” e a marca do Instituto são institucionais. O uso acadêmico é permitido no contexto da disciplina, mas a publicação oficial exige autorização. Evite sugerir vínculo oficial que não existe.

---

## 3. Posicionamento e voz

**Posicionamento:** “O ponto único do esporte no campus — do primeiro treino ao pódio.”

**Tagline:** *O esporte do campus em um só lugar.*

**Promessa:** transparência de horários e vagas, inscrição sem burocracia e um histórico esportivo que valoriza o aluno.

**Tom de voz:**

- claro, direto e acolhedor;
- institucional sem ser formal demais;
- usa “você” e verbos de ação;
- evita jargão técnico e siglas não explicadas;
- em mensagens de erro, explica o que aconteceu e como resolver.

**Exemplos:**

- ✅ “Sua solicitação foi enviada. A coordenação confirma em até 2 dias úteis.”
- ✅ “Esta turma está lotada. Você pode entrar na fila de espera.”
- ❌ “Erro 422: capacidade excedida.”
- ❌ “Prezado discente, sua requisição foi protocolada.”

---

## 4. Conceito da logo

### 4.1 Símbolo

Um quadrado arredondado verde-profundo com o monograma **IF** em branco e um **ponto lima** no canto superior direito.

- **IF** = Instituto Federal, vínculo institucional imediato.
- **Ponto lima** = energia, bola, sinal de “online” e movimento.
- **Quadrado arredondado** = app, comunidade e acesso.
- Formas geométricas e traço uniforme para funcionar em 24 px e em bordado.

### 4.2 Assinatura

- Horizontal: símbolo + “IF Esportes” (IF em verde, Esportes em grafite).
- Vertical: símbolo acima do nome, para capas e camisetas.
- Monocromática: branco sobre verde ou verde sobre branco.
- Ícone de app: somente o símbolo, com margem de segurança.

### 4.3 Cores

| Elemento | Cor |
|---|---|
| Fundo do símbolo | `#0A4B2C` (brand-800) |
| Monograma | `#FFFFFF` |
| Ponto | `#C6F135` (lime-400) |
| Nome “IF” | `#0A4B2C` |
| Nome “Esportes” | `#0B1210` (ink-950) |

### 4.4 Construção e uso

- Área de respiro: no mínimo a altura do ponto lima em todos os lados.
- Tamanho mínimo digital: 24 px de altura para o símbolo; 96 px de largura para a assinatura horizontal.
- Não distorcer, girar, aplicar sombra, gradiente ou contorno.
- Não trocar as cores fora das variações previstas.
- Não usar a logo sobre foto sem uma área de contraste (faixa ou overlay).

### 4.5 Arquivos

- `src/components/Brand.tsx` — componente React da marca.
- `public/logo-if-esportes.svg` — assinatura horizontal.
- `public/logo-if-esportes-dark.svg` — versão para fundo escuro.
- `public/app-icon.svg` — ícone quadrado.
- `public/favicon.svg` — favicon.

---

## 5. Prompts para gerar a logo com IA

Use **Ideogram** ou **Recraft** quando precisar do texto correto; **Midjourney** para exploração de símbolo; **Figma** para finalizar o lettering. Gere 4–6 variações, escolha uma e vetorize.

### 5.1 Prompt principal (PT-BR)

> Logo vetorial minimalista para “IF Esportes”, plataforma de esportes do IFAL Campus Maceió. Monograma “IF” geométrico em branco dentro de um quadrado arredondado verde-profundo (#0A4B2C), com um ponto circular verde-limão (#C6F135) no canto superior direito. Estilo flat, sem gradientes, sem sombras, traço uniforme, alto contraste, legível a 24 px, símbolo de app esportivo moderno, fundo transparente, vetor, apresentação em grade com variações.

### 5.2 Prompt principal (EN)

> Minimalist vector logo for “IF Esportes”, a university sports platform. A geometric white “IF” monogram inside a deep green (#0A4B2C) rounded square, with a lime green (#C6F135) circular dot at the top right. Flat design, no gradients, no shadows, uniform stroke, high contrast, legible at 24 px, modern sports app icon, transparent background, vector style, logo grid presentation with variations.

### 5.3 Negative prompt

> 3D, realistic, glossy, gradient, drop shadow, bevel, complex detail, thin hairlines, illegible text, mockup, photo, watermark, extra letters, distorted perspective, clip art, soccer ball clipart, Olympic rings, generic shield.

### 5.4 Variações a pedir

1. Símbolo isolado em fundo transparente.
2. Assinatura horizontal com o texto “IF Esportes”.
3. Versão monocromática branca para fundo verde.
4. Ícone de app com cantos arredondados.
5. Aplicação em camiseta e em post social (para testar leitura).
6. Versão com “IFAL Campus Maceió” como assinatura secundária.

### 5.5 Ferramentas

| Ferramenta | Uso |
|---|---|
| Midjourney | Exploração de símbolo e estilo |
| Ideogram | Texto e lettering com melhor legibilidade |
| Recraft | Vetores e ícones editáveis |
| Figma AI / Figma | Finalização, grid, variações e arquivo final |
| Vectorizer.ai / Illustrator | Vetorização e limpeza de traços |
| Looka | Referência de combinações de marca (não usar como entrega final) |

---

## 6. Como trocar o nome

1. Edite `src/config/brand.ts`:

```ts
export const brand = {
  name: 'IF Esportes',
  institution: 'IFAL · Campus Maceió',
  tagline: 'O esporte do campus em um só lugar.',
  // ...
}
```

2. Atualize a logo em `public/` e o componente `src/components/Brand.tsx` se o monograma mudar.
3. Ajuste `index.html` (título e descrição) e o `README.md`.
4. Rode `npm run typecheck` e `npm run build`.

---

## 7. Checklist de marca

- [ ] Nome aprovado pela coordenação e pelo orientador.
- [ ] Logo legível em 24 px, 48 px e 512 px.
- [ ] Versões horizontal, vertical, monocromática e ícone.
- [ ] Contraste do ponto lima sobre o verde conferido.
- [ ] Arquivos SVG e PNG exportados com fundo transparente.
- [ ] Uso da marca do IFAL autorizado no contexto acadêmico.
- [ ] Nome e logo consistentes no TAP, no Figma, no GitHub e no protótipo.
