import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Globe2,
  IdCard,
  LogIn,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui'
import { Logo } from '@/components/Brand'
import { asset } from '@/lib/assets'

const grupos = [
  {
    titulo: 'Público',
    descricao: 'Descoberta de modalidades, torneios, notícias e editais.',
    icon: Globe2,
    telas: [
      { n: '01', titulo: 'Home', path: '/', desc: 'Hero, destaques, próximos torneios e notícias.', tag: 'RF-02 · RF-06' },
      { n: '02', titulo: 'Catálogo de modalidades', path: '/modalidades', desc: 'Busca, filtros por categoria, local e dia.', tag: 'RF-02 · RF-09' },
      { n: '03', titulo: 'Detalhe da modalidade', path: '/modalidades/natacao', desc: 'Horários, turmas, vagas, pré-requisitos e professor.', tag: 'RF-02 · RF-03' },
      { n: '04', titulo: 'Solicitação de vaga', path: '/modalidades/natacao/inscricao', desc: 'Stepper com turma, conflito de horário e confirmação.', tag: 'RF-03 · RN-01 · RN-02' },
      { n: '05', titulo: 'Torneios', path: '/torneios', desc: 'Lista, destaque, calendário e filtros por status.', tag: 'RF-04 · RF-09' },
      { n: '06', titulo: 'Detalhe do torneio', path: '/torneios/jogos-internos-2026', desc: 'Chaves, classificação, resultados e regulamento.', tag: 'RF-04' },
      { n: '07', titulo: 'Notícias e editais', path: '/noticias', desc: 'Destaque, filtros, editais e canais oficiais.', tag: 'RF-06' },
    ],
  },
  {
    titulo: 'Acesso',
    descricao: 'Cadastro com e-mail institucional e verificação por código.',
    icon: LogIn,
    telas: [
      { n: '08', titulo: 'Entrar e criar conta', path: '/entrar', desc: 'Login e cadastro com validação de domínio institucional.', tag: 'RF-01 · RN-04' },
      { n: '09', titulo: 'Verificação OTP', path: '/verificar', desc: 'Código de 6 dígitos, reenvio e segurança.', tag: 'RF-01 · RN-04' },
    ],
  },
  {
    titulo: 'Aluno-atleta',
    descricao: 'Acompanhamento das turmas e do passaporte esportivo.',
    icon: IdCard,
    telas: [
      { n: '10', titulo: 'Dashboard do aluno', path: '/app', desc: 'Próximo treino, modalidades ativas e avisos.', tag: 'RF-03 · RF-05' },
      { n: '11', titulo: 'Minhas inscrições', path: '/app/inscricoes', desc: 'Status, frequência, fila de espera e cancelamento.', tag: 'RF-03 · RF-05' },
      { n: '12', titulo: 'Passaporte esportivo', path: '/app/atleta', desc: 'Linha do tempo, medalhas, histórico e frequência.', tag: 'RF-05' },
    ],
  },
  {
    titulo: 'Atlética',
    descricao: 'Gestão de equipes, atletas, torneios e comunicados.',
    icon: Users,
    telas: [
      { n: '13', titulo: 'Painel da atlética', path: '/gestao', desc: 'Indicadores, homologações, equipes e próximos jogos.', tag: 'RF-04 · RN-05' },
      { n: '14', titulo: 'Equipes e atletas', path: '/gestao/equipes', desc: 'Seleção de equipe, elenco, frequência e vínculos.', tag: 'RF-05 · RN-05' },
      { n: '15', titulo: 'Gestão de torneio', path: '/gestao/torneios/jogos-internos-2026', desc: 'Chaves, lançamento de resultados, inscrições e configurações.', tag: 'RF-04 · RN-03' },
    ],
  },
  {
    titulo: 'Coordenação e administração',
    descricao: 'Visão gerencial, controle de turmas e auditoria.',
    icon: ShieldCheck,
    telas: [
      { n: '16', titulo: 'Painel administrativo', path: '/admin', desc: 'Indicadores, ocupação, homologações e saúde do sistema.', tag: 'RF-07' },
      { n: '17', titulo: 'Modalidades e turmas', path: '/admin/modalidades', desc: 'Catálogo, capacidade, abertura de turmas e ocupação.', tag: 'RF-02 · RF-03' },
      { n: '18', titulo: 'Relatórios e auditoria', path: '/admin/relatorios', desc: 'Gráficos, exportação CSV/PDF e log de ações.', tag: 'RF-07 · RF-08' },
    ],
  },
]

const wireframes = [
  { n: '01', titulo: 'Home', arquivo: '01-home.svg' },
  { n: '02', titulo: 'Catálogo de modalidades', arquivo: '02-catalogo.svg' },
  { n: '03', titulo: 'Detalhe da modalidade', arquivo: '03-modalidade.svg' },
  { n: '04', titulo: 'Solicitação de vaga', arquivo: '04-inscricao.svg' },
  { n: '05', titulo: 'Login e OTP', arquivo: '05-acesso.svg' },
  { n: '06', titulo: 'Dashboard do aluno', arquivo: '06-dashboard-aluno.svg' },
  { n: '07', titulo: 'Passaporte esportivo', arquivo: '07-passaporte.svg' },
  { n: '08', titulo: 'Painel administrativo', arquivo: '08-painel-admin.svg' },
]

export function Galeria() {
  const totalTelas = grupos.reduce((total, grupo) => total + grupo.telas.length, 0)

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink-200/80 bg-white">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-2">
            <Badge tone="green">{totalTelas} telas</Badge>
            <Badge tone="outline">{wireframes.length} wireframes</Badge>
            <Link
              to="/"
              className="ml-2 inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-500 hover:text-brand-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Voltar ao site
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-ink-200/60 bg-white">
        <div className="container-page py-10 md:py-14">
          <p className="eyebrow">Atividade 2 · Protótipo e wireframe</p>
          <h1 className="mt-2 max-w-3xl text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-950 md:text-5xl">
            Galeria do protótipo
          </h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-500">
            Navegue pelas {totalTelas} telas de alta fidelidade e pelos {wireframes.length} wireframes de baixa
            fidelidade. Cada tela cobre um ou mais requisitos funcionais do TAP e foi construída para validação com a
            coordenação, as atléticas e os alunos-atletas.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-ink-500">
            <span className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1">Desktop e mobile responsivos</span>
            <span className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1">WCAG 2.1 AA</span>
            <span className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1">Design tokens</span>
            <span className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1">Pronto para importar no Figma</span>
          </div>
        </div>
      </section>

      <main className="container-page space-y-12 py-10">
        {grupos.map((grupo) => (
          <section key={grupo.titulo}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <grupo.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink-950">{grupo.titulo}</h2>
                <p className="text-[12px] text-ink-400">{grupo.descricao}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {grupo.telas.map((tela) => (
                <Link
                  key={tela.n}
                  to={tela.path}
                  className="group flex flex-col rounded-2xl border border-ink-200/80 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-display text-2xl font-extrabold text-ink-100 tabular">{tela.n}</span>
                    <Badge tone="outline" className="text-[9px]">
                      {tela.tag}
                    </Badge>
                  </div>
                  <h3 className="mt-2 font-display text-[15px] font-bold leading-snug tracking-tight text-ink-950 group-hover:text-brand-800">
                    {tela.titulo}
                  </h3>
                  <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-relaxed text-ink-500">{tela.desc}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-2.5">
                    <code className="max-w-[70%] truncate text-[10px] text-ink-400">{tela.path}</code>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-brand-700">
                      Abrir <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-ink-600">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink-950">Wireframes de baixa fidelidade</h2>
              <p className="text-[12px] text-ink-400">
                Estrutura, hierarquia e navegação das 8 telas principais, em SVG prontos para importar no Figma.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {wireframes.map((wireframe) => (
              <a
                key={wireframe.n}
                href={asset(`/wireframes/${wireframe.arquivo}`)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-xl border border-ink-200/80 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-extrabold text-ink-200 tabular">{wireframe.n}</span>
                  <span className="text-[12px] font-semibold text-ink-900 group-hover:text-brand-800">{wireframe.titulo}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-300 group-hover:text-brand-700" aria-hidden />
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-ink-200 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="eyebrow">Como revisar</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">
                Percorra os fluxos do aluno, da atlética e da coordenação. Use a galeria para abrir cada tela e o menu
                lateral para navegar entre as áreas.
              </p>
            </div>
            <div>
              <p className="eyebrow">Para o Figma</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">
                Importe as telas com o plugin <strong>html.to.design</strong> ou use os SVGs dos wireframes. O guia
                completo está em <code className="text-[11px]">docs/05-guia-figma.md</code>.
              </p>
            </div>
            <div>
              <p className="eyebrow">Modo captura</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">
                Adicione <code className="rounded bg-ink-100 px-1 text-[11px]">?capture=1</code> à URL para esconder o
                atalho da galeria antes de gerar screenshots.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-200/70 bg-white">
        <div className="container-page flex flex-col gap-2 py-6 text-[11px] text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>IF Esportes · Protótipo acadêmico do Projeto Integrador em Sistemas de Informação · IFAL Campus Maceió.</p>
          <p>18 telas · 8 wireframes · 2026.2</p>
        </div>
      </footer>
    </div>
  )
}
