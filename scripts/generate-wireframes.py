"""Gera os 8 wireframes de baixa fidelidade do projeto IF Esportes.

Saída:
  design/wireframes/*.svg
  public/wireframes/*.svg   (para o preview da galeria)

Executar: python scripts/generate-wireframes.py
"""

from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
OUT_DIRS = [ROOT / "design" / "wireframes", ROOT / "public" / "wireframes"]

W, H = 1440, 1000
BG = "#FAFAF8"
SURFACE = "#FFFFFF"
FILL = "#F0F2EF"
FILL2 = "#E4E9E4"
LINE = "#CBD3CD"
LINE2 = "#DDE3DE"
TEXT = "#5B6B63"
DARK = "#1B2721"
MUTED = "#8A968F"
ACCENT = "#127A47"
ACCENT_SOFT = "#E6F2EB"
FONT = "Inter, Arial, sans-serif"
FONT_D = "Archivo, Inter, Arial, sans-serif"


def rect(x, y, w, h, fill=FILL, stroke=LINE, rx=10, dash=None, opacity=1):
    extra = f' stroke-dasharray="{dash}"' if dash else ""
    return (
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" '
        f'fill="{fill}" stroke="{stroke}" opacity="{opacity}"{extra}/>'
    )


def line(x1, y1, x2, y2, color=LINE, width=1, dash=None):
    extra = f' stroke-dasharray="{dash}"' if dash else ""
    return (
        f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" '
        f'stroke="{color}" stroke-width="{width}"{extra}/>'
    )


def text(x, y, value, size=13, fill=TEXT, weight=400, anchor="start", family=FONT, opacity=1):
    return (
        f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" '
        f'font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" opacity="{opacity}">'
        f"{escape(str(value))}</text>"
    )


def lines(x, y, w, n=3, h=7, gap=14, last=0.65, fill=LINE2):
    out = []
    for i in range(n):
        width = w * last if i == n - 1 and n > 1 else w
        out.append(rect(x, y + i * gap, width, h, fill, "none", 4))
    return "".join(out)


def image_box(x, y, w, h, label="imagem", rx=14):
    out = [rect(x, y, w, h, FILL2, LINE, rx)]
    out.append(line(x + 10, y + 10, x + w - 10, y + h - 10, LINE, 1))
    out.append(line(x + w - 10, y + 10, x + 10, y + h - 10, LINE, 1))
    out.append(rect(x + 14, y + 14, min(120, w - 28), 24, SURFACE, "none", 6, opacity=0.9))
    out.append(text(x + 24, y + 30, label, 10, MUTED, 600))
    return "".join(out)


def button(x, y, w, h, label, primary=False):
    fill = ACCENT if primary else SURFACE
    stroke = "none" if primary else LINE
    color = "#FFFFFF" if primary else TEXT
    return rect(x, y, w, h, fill, stroke, 8) + text(
        x + w / 2, y + h / 2 + 4, label, 12, color, 600, anchor="middle"
    )


def pill(x, y, w, h, label, active=False):
    fill = ACCENT_SOFT if active else SURFACE
    stroke = ACCENT if active else LINE
    color = ACCENT if active else TEXT
    return rect(x, y, w, h, fill, stroke, h / 2) + text(
        x + w / 2, y + h / 2 + 3.5, label, 10, color, 600, anchor="middle"
    )


def num(x, y, n):
    return (
        f'<circle cx="{x}" cy="{y}" r="12" fill="{ACCENT}"/>'
        + text(x, y + 4, n, 11, "#FFFFFF", 700, anchor="middle")
    )


def card(x, y, w, h, title=None, subtitle=None, body_lines=0, rx=12, fill=SURFACE):
    out = [rect(x, y, w, h, fill, LINE, rx)]
    if title:
        out.append(text(x + 16, y + 26, title, 12, DARK, 600))
    if subtitle:
        out.append(text(x + 16, y + 44, subtitle, 9, MUTED))
    if body_lines:
        out.append(lines(x + 16, y + 58, w - 32, body_lines, 7, 14, 0.7))
    return "".join(out)


def public_header(active="Início"):
    out = [
        rect(0, 56, W, 84, SURFACE, "none", 0),
        line(0, 140, W, 140),
        rect(80, 76, 44, 44, DARK, "none", 10),
        text(102, 104, "IF", 13, "#FFFFFF", 800, anchor="middle", family=FONT_D),
        text(136, 104, "IF Esportes", 17, DARK, 700, family=FONT_D),
    ]
    x = 390
    for item in ["Início", "Modalidades", "Torneios", "Notícias"]:
        out.append(text(x, 102, item, 12, ACCENT if item == active else TEXT, 600 if item == active else 400))
        x += 112
    out.append(rect(1118, 84, 32, 32, SURFACE, LINE, 8))
    out.append(text(1134, 104, "⌕", 16, TEXT, 500, anchor="middle"))
    out.append(button(1164, 84, 74, 32, "Entrar"))
    out.append(button(1248, 84, 112, 32, "Criar conta", True))
    return "".join(out)


def page_title(y, eyebrow, title, subtitle=None, action=None):
    out = [text(80, y, eyebrow.upper(), 10, ACCENT, 700)]
    out.append(text(80, y + 34, title, 28, DARK, 700, family=FONT_D))
    if subtitle:
        out.append(text(80, y + 58, subtitle, 12, TEXT))
    if action:
        out.append(button(1160, y + 2, 200, 40, action))
    return "".join(out)


def public_footer(y=900):
    out = [line(80, y, 1360, y)]
    out.append(text(80, y + 28, "IF Esportes · IFAL Campus Maceió · 2026.2", 10, MUTED))
    out.append(text(1360, y + 28, "Rodapé institucional", 10, MUTED, anchor="end"))
    return "".join(out)


def legend(items):
    out = [line(0, 940, W, 940), text(80, 974, "ANOTAÇÕES", 10, MUTED, 700)]
    start = 210
    step = 232
    for i, label in enumerate(items, 1):
        x = start + (i - 1) * step
        out.append(num(x, 968, i))
        out.append(text(x + 20, 973, label, 10, TEXT))
    return "".join(out)


def frame(title, subtitle, body, legend_items):
    top = [
        rect(0, 0, W, 56, SURFACE, "none", 0),
        line(0, 56, W, 56),
        rect(80, 14, 28, 28, ACCENT, "none", 8),
        text(94, 33, "IF", 10, "#FFFFFF", 800, anchor="middle", family=FONT_D),
        text(120, 35, title, 17, DARK, 700, family=FONT_D),
        text(1360, 34, subtitle, 9, MUTED, 600, anchor="end"),
        rect(0, 56, W, 884, BG, "none", 0),
    ]
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
        + "".join(top)
        + body
        + legend(legend_items)
        + f'<rect x="0.5" y="0.5" width="{W - 1}" height="{H - 1}" fill="none" stroke="{LINE2}"/>'
        + "</svg>"
    )


def app_shell(active="Visão geral", role="Aluno-atleta"):
    out = [
        rect(0, 56, 240, 884, SURFACE, LINE, 0),
        rect(20, 76, 40, 40, DARK, "none", 10),
        text(40, 102, "IF", 12, "#FFFFFF", 800, anchor="middle", family=FONT_D),
        text(72, 102, "IF Esportes", 15, DARK, 700, family=FONT_D),
        rect(16, 140, 208, 56, FILL, "none", 12),
        text(30, 164, role, 10, DARK, 600),
        text(30, 182, "2023110405 · 5º período", 8, MUTED),
        rect(240, 56, 1200, 64, SURFACE, "none", 0),
        line(240, 120, W, 120),
        text(280, 92, "Área", 9, MUTED),
        text(312, 92, "/", 9, LINE),
        text(326, 92, active, 11, DARK, 600),
        rect(1178, 72, 28, 28, SURFACE, LINE, 8),
        rect(1216, 72, 28, 28, SURFACE, LINE, 8),
        rect(1264, 68, 146, 36, SURFACE, LINE, 10),
        rect(1276, 76, 20, 20, ACCENT, "none", 10),
        text(1302, 90, "Nome do usuário", 9, DARK, 600),
    ]
    nav = ["Visão geral", "Modalidades", "Minhas inscrições", "Passaporte", "Notícias"]
    y = 236
    for item in nav:
        is_active = item == active
        if is_active:
            out.append(rect(12, y - 15, 216, 34, ACCENT_SOFT, "none", 10))
        out.append(rect(26, y - 7, 14, 14, ACCENT if is_active else LINE2, "none", 4))
        out.append(text(50, y + 4, item, 10, ACCENT if is_active else TEXT, 600 if is_active else 400))
        y += 42
    out.append(rect(16, 824, 208, 92, FILL, "none", 12))
    out.append(text(30, 848, "Precisa de ajuda?", 9, DARK, 600))
    out.append(lines(30, 860, 170, 2, 5, 12, 0.75))
    out.append(rect(16, 876, 100, 26, SURFACE, LINE, 8))
    out.append(text(66, 893, "Enviar e-mail", 8, ACCENT, 600, anchor="middle"))
    return "".join(out)


def stat_card(x, y, w, h, label, value, delta=None):
    out = [rect(x, y, w, h, SURFACE, LINE, 12)]
    out.append(text(x + 14, y + 22, label, 8, MUTED, 600))
    out.append(text(x + 14, y + 52, value, 22, DARK, 700, family=FONT_D))
    if delta:
        out.append(pill(x + w - 60, y + 12, 46, 20, delta))
    out.append(lines(x + 14, y + 66, w - 28, 1, 5, 12, 0.55))
    return "".join(out)


def bars(x, y, w, h, values):
    out = [line(x, y + h, x + w, y + h)]
    n = len(values)
    gap = 10
    bw = (w - gap * (n - 1)) / n
    top = max(values)
    for i, value in enumerate(values):
        bh = max(8, (value / top) * h)
        out.append(rect(x + i * (bw + gap), y + h - bh, bw, bh, ACCENT if i == 0 else LINE2, "none", 4))
    return "".join(out)


def heatmap(x, y, cell_w, cell_h, rows, cols, values):
    out = []
    for r in range(rows):
        for c in range(cols):
            value = values[r][c]
            opacity = 0.12 + (value / 100) * 0.7 if value else 0
            fill = ACCENT if value else FILL
            out.append(rect(x + c * (cell_w + 3), y + r * (cell_h + 3), cell_w, cell_h, fill, "none", 3, opacity=opacity if value else 1))
    return "".join(out)


# ---------------------------------------------------------------- 01 Home
def wf_home():
    b = [public_header("Início")]
    b.append(pill(80, 170, 190, 26, "2026.2 · inscrições abertas", True))
    b.append(text(80, 240, "O esporte do campus", 36, DARK, 700, family=FONT_D))
    b.append(text(80, 284, "em um só lugar.", 36, ACCENT, 700, family=FONT_D))
    b.append(lines(80, 312, 520, 2, 7, 15, 0.85))
    b.append(button(80, 360, 210, 46, "Explorar modalidades", True))
    b.append(button(304, 360, 170, 46, "Ver torneios"))
    b.append(text(80, 444, "9 modalidades   ·   320+ atletas   ·   4 espaços", 10, MUTED))
    b.append(image_box(800, 160, 560, 390, "imagem de destaque / pista"))
    b.append(rect(824, 470, 512, 58, SURFACE, LINE, 10))
    b.append(text(840, 492, "Jogos Internos 2026", 11, DARK, 600))
    b.append(text(840, 510, "34 jogos · 12 equipes", 9, MUTED))
    b.append(rect(80, 566, 1280, 80, SURFACE, LINE, 12))
    for i, (label, value) in enumerate(
        [("Modalidades", "9"), ("Atletas", "320+"), ("Torneios", "12"), ("Espaços", "4")]
    ):
        x = 100 + i * 320
        b.append(text(x, 596, value, 20, DARK, 700, family=FONT_D))
        b.append(text(x, 614, label, 9, MUTED))
        if i:
            b.append(line(x - 24, 582, x - 24, 630, LINE2))
    b.append(text(80, 700, "MODALIDADES", 10, ACCENT, 700))
    b.append(text(80, 728, "Encontre o esporte que combina com você", 24, DARK, 700, family=FONT_D))
    b.append(text(1160, 728, "Ver todas →", 10, ACCENT, 600))
    for i, label in enumerate(["Natação", "Voleibol", "Futsal", "Xadrez"]):
        x = 80 + i * 322
        b.append(image_box(x, 752, 306, 88, label))
        b.append(rect(x, 840, 306, 48, SURFACE, LINE, 0))
        b.append(text(x + 12, 858, label, 10, DARK, 600))
        b.append(text(x + 12, 874, "local · horário", 8, MUTED))
        b.append(pill(x + 206, 850, 86, 20, "vagas"))
    b.append(num(56, 110, 1))
    b.append(num(762, 236, 2))
    b.append(num(56, 386, 3))
    b.append(num(56, 780, 4))
    b.append(num(1380, 190, 5))
    return frame(
        "01 · Home pública",
        "Wireframe de baixa fidelidade · 1440 × 1000",
        "".join(b),
        ["Cabeçalho e navegação", "Proposta de valor", "CTAs principais", "Destaques de modalidades", "Card de torneio"],
    )


# ---------------------------------------------------------------- 02 Catálogo
def wf_catalogo():
    b = [public_header("Modalidades")]
    b.append(page_title(186, "Catálogo", "Modalidades esportivas", "Encontre turmas por esporte, local ou dia da semana."))
    b.append(rect(80, 262, 430, 44, SURFACE, LINE, 10))
    b.append(text(100, 289, "Buscar por nome, local ou professor", 11, MUTED))
    b.append(rect(80, 326, 250, 540, SURFACE, LINE, 12))
    b.append(text(96, 352, "FILTROS", 9, MUTED, 700))
    b.append(text(96, 382, "Categoria", 10, DARK, 600))
    for i, label in enumerate(["Todas", "Coletiva", "Individual", "Aquática", "Combate", "Mental"]):
        b.append(pill(96 + (i % 2) * 112, 396 + (i // 2) * 34, 104, 26, label, i == 0))
    b.append(text(96, 510, "Local", 10, DARK, 600))
    b.append(rect(96, 522, 218, 36, SURFACE, LINE, 8))
    b.append(text(110, 545, "Todos os locais", 10, MUTED))
    b.append(text(96, 584, "Dia da semana", 10, DARK, 600))
    b.append(rect(96, 596, 218, 36, SURFACE, LINE, 8))
    b.append(text(110, 619, "Todos os dias", 10, MUTED))
    b.append(rect(96, 654, 18, 18, SURFACE, LINE, 4))
    b.append(text(122, 668, "Somente com vagas", 9, TEXT))
    b.append(rect(96, 700, 218, 54, ACCENT_SOFT, "none", 10))
    b.append(lines(108, 714, 190, 2, 5, 11, 0.8))
    b.append(text(360, 283, "9 modalidades encontradas", 10, MUTED))
    b.append(rect(1160, 264, 200, 38, SURFACE, LINE, 8))
    b.append(text(1176, 288, "Mais vagas disponíveis", 9, TEXT))
    for row in range(2):
        for col in range(3):
            x = 360 + col * 330
            y = 326 + row * 272
            b.append(image_box(x, y, 306, 120, "foto da modalidade"))
            b.append(rect(x, y + 120, 306, 128, SURFACE, LINE, 0))
            b.append(text(x + 12, y + 144, ["Natação", "Voleibol", "Futsal", "Basquete", "Atletismo", "Xadrez"][row * 3 + col], 11, DARK, 600))
            b.append(text(x + 12, y + 160, "local · dias · horário", 8, MUTED))
            b.append(lines(x + 12, y + 174, 270, 2, 5, 10, 0.9))
            b.append(pill(x + 12, y + 214, 96, 22, "inscrições"))
            b.append(text(x + 240, y + 230, "8 vagas", 8, ACCENT, 600))
    b.append(num(56, 286, 1))
    b.append(num(56, 420, 2))
    b.append(num(1180, 250, 3))
    b.append(num(340, 470, 4))
    b.append(num(340, 620, 5))
    return frame(
        "02 · Catálogo de modalidades",
        "Wireframe de baixa fidelidade · 1440 × 1000",
        "".join(b),
        ["Busca textual", "Filtros laterais", "Contagem e ordenação", "Cards de modalidade", "Status e vagas"],
    )


# ---------------------------------------------------------------- 03 Detalhe
def wf_modalidade():
    b = [public_header("Modalidades")]
    b.append(text(80, 174, "Início  /  Modalidades  /  Natação", 10, MUTED))
    b.append(image_box(80, 192, 1280, 250, "foto / piscina do campus", 16))
    b.append(rect(80, 400, 1280, 42, ACCENT_SOFT, "none", 0))
    b.append(text(104, 426, "NATAÇÃO  ·  AQUÁTICA  ·  INICIANTE AO AVANÇADO", 10, ACCENT, 700))
    b.append(text(80, 480, "Sobre a modalidade", 15, DARK, 700, family=FONT_D))
    b.append(lines(80, 500, 760, 3, 7, 15, 0.85))
    b.append(text(80, 570, "HORÁRIOS E TURMAS", 9, MUTED, 700))
    for i, (turno, horario) in enumerate([("Turma A", "Ter e Qui · 07h00"), ("Turma B", "Seg e Qua · 18h00"), ("Turma C", "Sábado · 09h00")]):
        y = 590 + i * 62
        b.append(rect(80, y, 820, 52, SURFACE, LINE, 10))
        b.append(text(96, y + 21, turno, 10, DARK, 600))
        b.append(text(96, y + 37, horario, 8, MUTED))
        b.append(pill(640, y + 14, 86, 22, "8 vagas"))
        b.append(button(742, y + 12, 140, 28, "Selecionar"))
    b.append(text(80, 790, "PRÉ-REQUISITOS E EQUIPAMENTOS", 9, MUTED, 700))
    b.append(rect(80, 806, 400, 92, SURFACE, LINE, 10))
    b.append(lines(96, 826, 368, 3, 6, 14, 0.8))
    b.append(rect(500, 806, 400, 92, SURFACE, LINE, 10))
    b.append(lines(516, 826, 368, 3, 6, 14, 0.8))
    b.append(rect(930, 480, 430, 300, SURFACE, LINE, 14))
    b.append(text(950, 510, "Inscrição 2026.2", 11, DARK, 600))
    b.append(pill(1230, 494, 110, 24, "aberta", True))
    b.append(text(950, 558, "8 / 20 vagas", 24, DARK, 700, family=FONT_D))
    b.append(text(950, 578, "12 alunos inscritos", 8, MUTED))
    b.append(rect(950, 594, 390, 10, FILL, "none", 5))
    b.append(rect(950, 594, 234, 10, ACCENT, "none", 5))
    b.append(button(950, 626, 390, 44, "Solicitar vaga", True))
    b.append(button(950, 682, 390, 38, "Compartilhar modalidade"))
    b.append(lines(950, 736, 390, 2, 6, 14, 0.85))
    b.append(num(56, 210, 1))
    b.append(num(56, 500, 2))
    b.append(num(56, 610, 3))
    b.append(num(908, 510, 4))
    b.append(num(908, 650, 5))
    return frame(
        "03 · Detalhe da modalidade",
        "Wireframe de baixa fidelidade · 1440 × 1000",
        "".join(b),
        ["Hero e identificação", "Descrição e horários", "Turmas e vagas", "Card de inscrição", "CTA principal"],
    )


# ---------------------------------------------------------------- 04 Inscrição
def wf_inscricao():
    b = [public_header("Modalidades")]
    b.append(text(80, 174, "Início  /  Modalidades  /  Natação  /  Inscrição", 10, MUTED))
    b.append(page_title(204, "Solicitação de vaga", "Inscreva-se em poucos passos", "Confirme seus dados, escolha a turma e envie a solicitação."))
    steps = ["Identificação", "Turma e horário", "Confirmação"]
    for i, label in enumerate(steps):
        x = 80 + i * 300
        b.append(f'<circle cx="{x + 14}" cy="286" r="13" fill="{ACCENT if i < 2 else FILL}" stroke="{ACCENT if i < 2 else LINE}"/>')
        b.append(text(x + 14, 290, str(i + 1), 10, "#FFFFFF" if i < 2 else MUTED, 700, anchor="middle"))
        b.append(text(x + 36, 291, label, 10, DARK if i == 1 else MUTED, 600 if i == 1 else 400))
        if i < 2:
            b.append(line(x + 32, 286, x + 288, 286, ACCENT if i == 0 else LINE2, 2))
    b.append(rect(80, 322, 860, 534, SURFACE, LINE, 14))
    b.append(text(100, 354, "Escolha sua turma", 15, DARK, 700, family=FONT_D))
    b.append(text(100, 374, "O sistema valida conflitos de dia e horário automaticamente.", 9, MUTED))
    for i, (name, horario, vagas) in enumerate([("Turma A", "Ter e Qui · 07h00", "8 vagas"), ("Turma B", "Seg e Qua · 18h00", "2 vagas"), ("Turma C", "Sábado · 09h00", "8 vagas")]):
        y = 396 + i * 82
        selected = i == 1
        b.append(rect(100, y, 820, 68, ACCENT_SOFT if selected else SURFACE, ACCENT if selected else LINE, 10))
        b.append(f'<circle cx="120" cy="{y + 34}" r="8" fill="{SURFACE}" stroke="{ACCENT if selected else LINE}" stroke-width="2"/>')
        if selected:
            b.append(f'<circle cx="120" cy="{y + 34}" r="4" fill="{ACCENT}"/>')
        b.append(text(140, y + 28, name, 10, DARK, 600))
        b.append(text(140, y + 46, horario, 8, MUTED))
        b.append(pill(650, y + 12, 88, 22, vagas, selected))
        b.append(rect(752, y + 22, 140, 6, FILL, "none", 3))
        b.append(rect(752, y + 22, 96, 6, ACCENT, "none", 3))
    b.append(rect(100, 650, 18, 18, SURFACE, LINE, 4))
    b.append(text(126, 664, "Declaro que li o regulamento e estou ciente da homologação.", 8, TEXT))
    b.append(line(100, 700, 920, 700, LINE2))
    b.append(button(100, 722, 120, 38, "Voltar"))
    b.append(button(700, 722, 220, 38, "Enviar solicitação", True))
    b.append(rect(970, 322, 390, 360, SURFACE, LINE, 14))
    b.append(image_box(970, 322, 390, 100, "foto da modalidade", 14))
    b.append(text(990, 452, "Natação · Turma B", 13, DARK, 700, family=FONT_D))
    for i, (label, value) in enumerate([("Horário", "Seg e Qua · 18h00"), ("Local", "Piscina do Campus"), ("Professor", "Profa. Marina Souza"), ("Investimento", "Gratuito")]):
        b.append(text(990, 478 + i * 28, label, 8, MUTED))
        b.append(text(1260, 478 + i * 28, value, 8, DARK, 500, anchor="end"))
    b.append(rect(990, 600, 350, 6, FILL, "none", 3))
    b.append(rect(990, 600, 280, 6, ACCENT, "none", 3))
    b.append(text(990, 626, "2 vagas restantes", 8, ACCENT, 600))
    b.append(rect(970, 700, 390, 80, ACCENT_SOFT, "none", 12))
    b.append(lines(988, 718, 350, 2, 5, 13, 0.9))
    b.append(num(56, 354, 1))
    b.append(num(56, 430, 2))
    b.append(num(56, 750, 3))
    b.append(num(946, 452, 4))
    b.append(num(946, 720, 5))
    return frame(
        "04 · Solicitação de vaga",
        "Wireframe de baixa fidelidade · 1440 × 1000",
        "".join(b),
        ["Stepper do fluxo", "Seleção de turma", "Aceite e envio", "Resumo da inscrição", "Aviso de homologação"],
    )


# ---------------------------------------------------------------- 05 Acesso
def wf_acesso():
    b = [rect(0, 56, 620, 884, DARK, "none", 0)]
    b.append(rect(80, 100, 44, 44, SURFACE, "none", 10))
    b.append(text(102, 128, "IF", 13, ACCENT, 800, anchor="middle", family=FONT_D))
    b.append(text(136, 128, "IF Esportes", 17, "#FFFFFF", 700, family=FONT_D))
    b.append(text(80, 300, "PASSAPORTE ESPORTIVO", 10, "#C6F135", 700))
    b.append(text(80, 350, "Seu histórico esportivo,", 26, "#FFFFFF", 700, family=FONT_D))
    b.append(text(80, 386, "do primeiro treino ao pódio.", 26, "#FFFFFF", 700, family=FONT_D))
    b.append(lines(80, 416, 440, 3, 7, 16, 0.85, fill="#3C5545"))
    for i, label in enumerate(["Catálogo de modalidades", "Inscrição com vagas", "Passaporte do atleta"]):
        b.append(f'<circle cx="88" cy="{498 + i * 34}" r="6" fill="#C6F135"/>')
        b.append(text(104, 502 + i * 34, label, 11, "#DDE7DF"))
    b.append(text(80, 880, "IFAL · Campus Maceió · 2026.2", 9, "#7F9688"))
    b.append(rect(620, 56, 820, 884, BG, "none", 0))
    b.append(rect(700, 150, 660, 680, SURFACE, LINE, 16))
    b.append(pill(724, 178, 92, 22, "Área do aluno", True))
    b.append(text(724, 238, "Bem-vindo de volta", 24, DARK, 700, family=FONT_D))
    b.append(text(724, 260, "Acesse com seu e-mail institucional.", 10, MUTED))
    b.append(rect(724, 282, 612, 40, FILL, "none", 8))
    b.append(rect(728, 286, 300, 32, SURFACE, "none", 6))
    b.append(text(778, 307, "Entrar", 9, DARK, 600, anchor="middle"))
    b.append(text(1010, 307, "Criar conta", 9, MUTED, 500, anchor="middle"))
    b.append(text(724, 356, "E-mail institucional", 9, DARK, 600))
    b.append(rect(724, 366, 612, 44, SURFACE, LINE, 8))
    b.append(text(740, 393, "seu.nome@aluno.ifal.edu.br", 10, MUTED))
    b.append(text(724, 438, "Senha", 9, DARK, 600))
    b.append(rect(724, 448, 612, 44, SURFACE, LINE, 8))
    b.append(text(740, 475, "••••••••••", 10, MUTED))
    b.append(rect(724, 508, 18, 18, SURFACE, LINE, 4))
    b.append(text(750, 522, "Lembrar de mim", 8, TEXT))
    b.append(text(1336, 522, "Esqueci minha senha", 8, ACCENT, 600, anchor="end"))
    b.append(button(724, 552, 612, 44, "Entrar na plataforma", True))
    b.append(line(724, 620, 1336, 620, LINE2))
    b.append(text(1030, 624, "ou", 8, MUTED, anchor="middle"))
    b.append(button(724, 640, 612, 40, "Acessar com gov.br"))
    b.append(rect(724, 704, 612, 78, ACCENT_SOFT, "none", 10))
    b.append(text(740, 726, "Verificação em duas etapas", 10, DARK, 600))
    b.append(text(740, 744, "Enviaremos um código de 6 dígitos para o e-mail institucional.", 8, TEXT))
    for i in range(6):
        b.append(rect(740 + i * 42, 754, 34, 18, SURFACE, LINE, 4))
    b.append(num(660, 356, 1))
    b.append(num(660, 460, 2))
    b.append(num(660, 570, 3))
    b.append(num(660, 730, 4))
    b.append(num(660, 300, 5))
    return frame(
        "05 · Login e verificação OTP",
        "Wireframe de baixa fidelidade · 1440 × 1000",
        "".join(b),
        ["E-mail institucional", "Senha e recuperação", "CTA de login", "Verificação por código", "Alternância de cadastro"],
    )


# ---------------------------------------------------------------- 06 Dashboard aluno
def wf_dashboard_aluno():
    b = [app_shell("Visão geral", "Aluno-atleta")]
    b.append(text(280, 162, "QUARTA-FEIRA, 4 DE NOVEMBRO", 9, ACCENT, 700))
    b.append(text(280, 198, "Bom dia, Marina.", 28, DARK, 700, family=FONT_D))
    b.append(text(280, 220, "Você tem 2 modalidades ativas e um treino hoje às 18h.", 10, MUTED))
    b.append(button(1110, 170, 110, 36, "Explorar"))
    b.append(button(1230, 170, 130, 36, "Passaporte", True))
    for i, (label, value) in enumerate([("Inscrições ativas", "2"), ("Frequência", "92%"), ("Torneios", "6"), ("Medalhas", "6")]):
        b.append(stat_card(280 + i * 286, 248, 268, 96, label, value, "+4%" if i == 1 else None))
    b.append(rect(280, 370, 820, 170, DARK, "none", 14, opacity=1))
    b.append(pill(300, 388, 150, 22, "Próximo treino · hoje"))
    b.append(text(300, 442, "Natação · Turma A", 20, "#FFFFFF", 700, family=FONT_D))
    b.append(text(300, 466, "18h00 – 19h00  ·  Piscina do Campus  ·  Profa. Marina Souza", 8, "#C9D6CC"))
    b.append(button(960, 448, 120, 36, "Ver inscrição", True))
    b.append(card(280, 566, 520, 190, "Minhas modalidades"))
    for i, label in enumerate(["Natação", "Voleibol"]):
        y = 606 + i * 64
        b.append(rect(296, y, 488, 52, SURFACE, LINE, 8))
        b.append(rect(306, y + 12, 28, 28, ACCENT_SOFT, "none", 6))
        b.append(text(346, y + 23, label, 9, DARK, 600))
        b.append(text(346, y + 38, "Turma A · horário", 7, MUTED))
        b.append(rect(660, y + 20, 80, 6, FILL, "none", 3))
        b.append(rect(660, y + 20, 70, 6, ACCENT, "none", 3))
    b.append(card(280, 772, 820, 140, "Próximos jogos"))
    for i, label in enumerate(["Futsal · 16 nov · 19h00", "Voleibol · 17 nov · 18h00", "Basquete · 18 nov · 19h30"]):
        b.append(text(296, 818 + i * 28, label, 8, TEXT))
        b.append(text(1060, 818 + i * 28, "Ver →", 8, ACCENT, 600, anchor="end"))
    b.append(rect(1124, 370, 236, 240, SURFACE, LINE, 14))
    b.append(rect(1140, 386, 60, 60, ACCENT_SOFT, "none", 30))
    b.append(text(1170, 424, "MC", 14, ACCENT, 700, anchor="middle"))
    b.append(text(1212, 410, "Marina Cavalcante", 9, DARK, 600))
    b.append(text(1212, 426, "2023110405 · 5º período", 7, MUTED))
    for i, (label, value) in enumerate([("Torneios", "6"), ("Medalhas", "6"), ("Frequência", "92%")]):
        b.append(rect(1140 + i * 72, 462, 64, 52, FILL, "none", 8))
        b.append(text(1172 + i * 72, 486, value, 14, DARK, 700, anchor="middle", family=FONT_D))
        b.append(text(1172 + i * 72, 502, label, 6, MUTED, anchor="middle"))
    b.append(button(1140, 536, 204, 34, "Abrir passaporte", True))
    b.append(rect(1124, 626, 236, 140, SURFACE, LINE, 14))
    b.append(text(1140, 650, "Avisos", 10, DARK, 600))
    b.append(lines(1140, 666, 200, 3, 6, 16, 0.9))
    b.append(rect(1124, 782, 236, 130, ACCENT_SOFT, "none", 14))
    b.append(text(1140, 806, "Semana esportiva", 10, DARK, 600))
    b.append(lines(1140, 822, 200, 3, 5, 14, 0.9))
    b.append(num(258, 190, 1))
    b.append(num(258, 270, 2))
    b.append(num(258, 400, 3))
    b.append(num(258, 592, 4))
    b.append(num(1100, 400, 5))
    return frame(
        "06 · Dashboard do aluno",
        "Wireframe de baixa fidelidade · 1440 × 1000",
        "".join(b),
        ["Saudação e atalhos", "Indicadores do atleta", "Próximo treino", "Modalidades ativas", "Passaporte e avisos"],
    )


# ---------------------------------------------------------------- 07 Passaporte
def wf_passaporte():
    b = [app_shell("Passaporte", "Aluno-atleta")]
    b.append(text(280, 162, "PASSAPORTE ESPORTIVO", 9, ACCENT, 700))
    b.append(text(280, 198, "Minha trajetória no esporte", 28, DARK, 700, family=FONT_D))
    b.append(text(280, 220, "Modalidades, competições, medalhas e frequência.", 10, MUTED))
    b.append(button(1160, 170, 200, 36, "Baixar PDF"))
    b.append(rect(280, 248, 1080, 190, DARK, "none", 14))
    b.append(rect(304, 272, 80, 80, ACCENT_SOFT, "none", 16))
    b.append(text(344, 320, "MC", 18, ACCENT, 700, anchor="middle", family=FONT_D))
    b.append(text(404, 300, "Marina Cavalcante", 20, "#FFFFFF", 700, family=FONT_D))
    b.append(text(404, 322, "2023110405 · Bacharelado em Sistemas de Informação", 8, "#C9D6CC"))
    b.append(text(404, 344, "Desde 2023.2  ·  IFAL Campus Maceió", 8, "#C9D6CC"))
    b.append(pill(1180, 274, 150, 26, "Atleta ativa", True))
    for i, (label, value) in enumerate([("Modalidades", "3"), ("Torneios", "6"), ("Medalhas", "6"), ("Frequência", "92%")]):
        b.append(rect(304 + i * 256, 382, 240, 38, SURFACE, "none", 8))
        b.append(text(320 + i * 256, 400, value, 14, DARK, 700, family=FONT_D))
        b.append(text(320 + i * 256, 414, label, 7, MUTED))
    b.append(rect(280, 462, 700, 450, SURFACE, LINE, 14))
    b.append(text(300, 490, "Linha do tempo esportiva", 12, DARK, 600))
    for i, label in enumerate(["Jogos Internos 2026 · Ouro", "Torneio de Natação · Bronze", "Copa das Atléticas 2025 · Prata", "Jogos Internos 2025 · Prata", "Primeira turma de natação"]):
        y = 520 + i * 72
        b.append(f'<circle cx="310" cy="{y}" r="12" fill="{ACCENT_SOFT}" stroke="{ACCENT}"/>')
        b.append(text(310, y + 4, "★", 9, ACCENT, 700, anchor="middle"))
        if i < 4:
            b.append(line(310, y + 14, 310, y + 58, LINE2))
        b.append(text(336, y - 2, label, 9, DARK, 600))
        b.append(text(336, y + 14, "data · local · descrição do resultado", 7, MUTED))
        b.append(rect(336, y + 24, 600, 10, FILL, "none", 4))
    b.append(rect(1000, 462, 360, 240, SURFACE, LINE, 14))
    b.append(text(1020, 490, "Medalhas", 12, DARK, 600))
    for i, label in enumerate(["Ouro", "Prata", "Bronze"]):
        b.append(rect(1020 + i * 110, 506, 100, 70, FILL, "none", 10))
        b.append(text(1070 + i * 110, 536, "★", 16, ACCENT, 700, anchor="middle"))
        b.append(text(1070 + i * 110, 558, ["2", "3", "1"][i], 14, DARK, 700, anchor="middle", family=FONT_D))
        b.append(text(1070 + i * 110, 570, label, 7, MUTED, anchor="middle"))
    b.append(lines(1020, 596, 320, 4, 6, 16, 0.9))
    b.append(rect(1000, 722, 360, 190, SURFACE, LINE, 14))
    b.append(text(1020, 750, "Modalidades ativas", 12, DARK, 600))
    for i, label in enumerate(["Natação", "Voleibol", "Atletismo"]):
        b.append(rect(1020, 768 + i * 40, 320, 32, FILL, "none", 8))
        b.append(text(1032, 789 + i * 40, label, 8, DARK, 500))
        b.append(text(1320, 789 + i * 40, "→", 10, ACCENT, 600, anchor="end"))
    b.append(num(258, 190, 1))
    b.append(num(258, 280, 2))
    b.append(num(258, 480, 3))
    b.append(num(980, 490, 4))
    b.append(num(980, 750, 5))
    return frame(
        "07 · Passaporte esportivo",
        "Wireframe de baixa fidelidade · 1440 × 1000",
        "".join(b),
        ["Cabeçalho do atleta", "Indicadores", "Linha do tempo", "Medalhas", "Modalidades ativas"],
    )


# ---------------------------------------------------------------- 08 Painel admin
def wf_painel_admin():
    b = [app_shell("Visão geral", "Coordenação")]
    b.append(text(280, 162, "COORDENAÇÃO DE ESPORTES", 9, ACCENT, 700))
    b.append(text(280, 198, "Visão geral da plataforma", 28, DARK, 700, family=FONT_D))
    b.append(text(280, 220, "Inscrições, ocupação, homologações e saúde do sistema.", 10, MUTED))
    b.append(button(1110, 170, 130, 36, "Exportar"))
    b.append(button(1250, 170, 110, 36, "Relatórios", True))
    for i, (label, value, delta) in enumerate([
        ("Inscrições", "428", "+12%"),
        ("Ocupação média", "78%", "+5%"),
        ("Atléticas ativas", "3", None),
        ("Pendentes", "14", "+3"),
    ]):
        b.append(stat_card(280 + i * 270, 248, 252, 96, label, value, delta))
    b.append(rect(280, 370, 690, 250, SURFACE, LINE, 14))
    b.append(text(300, 398, "Inscrições por modalidade", 12, DARK, 600))
    b.append(bars(300, 430, 650, 150, [120, 96, 88, 74, 62, 54, 41, 36, 28]))
    for i, label in enumerate(["Futsal", "Natação", "Voleibol", "Atletismo", "Basquete", "Handebol", "Judô", "Praia", "Xadrez"]):
        b.append(text(316 + i * 70, 600, label, 6, MUTED, anchor="middle"))
    b.append(rect(990, 370, 370, 250, SURFACE, LINE, 14))
    b.append(text(1010, 398, "Ocupação geral", 12, DARK, 600))
    b.append(f'<circle cx="1175" cy="490" r="62" fill="none" stroke="{FILL}" stroke-width="16"/>')
    b.append(f'<circle cx="1175" cy="490" r="62" fill="none" stroke="{ACCENT}" stroke-width="16" stroke-dasharray="304 390" transform="rotate(-90 1175 490)"/>')
    b.append(text(1175, 496, "78%", 24, DARK, 700, anchor="middle", family=FONT_D))
    b.append(text(1175, 514, "das vagas", 8, MUTED, anchor="middle"))
    b.append(rect(280, 644, 1080, 180, SURFACE, LINE, 14))
    b.append(text(300, 672, "Ocupação por dia e horário", 12, DARK, 600))
    b.append(heatmap(300, 690, 86, 16, 6, 8, [
        [0, 0, 0, 72, 94, 88, 61, 0],
        [64, 86, 32, 0, 78, 96, 70, 0],
        [0, 0, 0, 68, 92, 90, 58, 0],
        [61, 84, 29, 0, 74, 93, 66, 0],
        [0, 0, 0, 56, 88, 94, 42, 0],
        [38, 26, 12, 0, 0, 0, 0, 0],
    ]))
    for i, label in enumerate(["06h", "07h", "08h", "17h", "18h", "19h", "20h", "21h"]):
        b.append(text(322 + i * 89, 684, label, 6, MUTED, anchor="middle"))
    b.append(rect(280, 848, 1080, 64, SURFACE, LINE, 14))
    b.append(text(300, 874, "Fila de homologação", 10, DARK, 600))
    b.append(text(300, 894, "5 solicitações aguardando revisão · SLA de 2 dias úteis", 8, MUTED))
    b.append(button(1180, 866, 160, 30, "Revisar agora", True))
    b.append(num(258, 190, 1))
    b.append(num(258, 270, 2))
    b.append(num(258, 390, 3))
    b.append(num(968, 390, 4))
    b.append(num(258, 666, 5))
    return frame(
        "08 · Painel administrativo",
        "Wireframe de baixa fidelidade · 1440 × 1000",
        "".join(b),
        ["Título e exportação", "Indicadores gerais", "Demanda por modalidade", "Ocupação geral", "Mapa de ocupação e fila"],
    )


def main():
    for directory in OUT_DIRS:
        directory.mkdir(parents=True, exist_ok=True)

    wireframes = {
        "01-home.svg": wf_home(),
        "02-catalogo.svg": wf_catalogo(),
        "03-modalidade.svg": wf_modalidade(),
        "04-inscricao.svg": wf_inscricao(),
        "05-acesso.svg": wf_acesso(),
        "06-dashboard-aluno.svg": wf_dashboard_aluno(),
        "07-passaporte.svg": wf_passaporte(),
        "08-painel-admin.svg": wf_painel_admin(),
    }

    for name, content in wireframes.items():
        for directory in OUT_DIRS:
            (directory / name).write_text(content, encoding="utf-8")
        print(f"gerado {name} ({len(content)} bytes)")


if __name__ == "__main__":
    main()
