import { Link } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  Database,
  Download,
  ShieldCheck,
  TrendingUp,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import { inscricoesRecentes, inscritosPorModalidade, ocupacaoSemana, torneios } from '@/data/mock'
import { BarChart, Donut, Heatmap } from '@/components/charts'
import { Badge, Button, ButtonLink, Card, PageHeader, StatCard, Td, Th } from '@/components/ui'

const colunas = ['06h', '07h', '08h', '17h', '18h', '19h', '20h', '21h']

export function PainelAdmin() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Coordenação de Esportes"
        title="Visão geral da plataforma"
        description="Acompanhe inscrições, ocupação das turmas, homologações e a saúde operacional do sistema."
        actions={
          <>
            <Button variant="secondary" size="md" icon={Download}>
              Exportar relatório
            </Button>
            <ButtonLink to="/admin/relatorios" size="md" icon={BarChart3}>
              Relatórios
            </ButtonLink>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={ClipboardCheck} label="Inscrições no semestre" value="428" delta="+12%" tone="green" hint="Comparado a 2026.1" />
        <StatCard icon={TrendingUp} label="Ocupação média" value="78%" delta="+5%" tone="lime" hint="Média das 14 turmas ativas" />
        <StatCard icon={Users} label="Atléticas ativas" value="3" hint="2 aguardando homologação" tone="blue" />
        <StatCard icon={AlertTriangle} label="Homologações pendentes" value="14" delta="+3" deltaTone="up" tone="amber" hint="SLA de 2 dias úteis" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Demanda</p>
                <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Inscrições por modalidade</h2>
              </div>
              <Badge tone="outline">2026.2</Badge>
            </div>
            <BarChart data={inscritosPorModalidade} className="mt-5" height={200} highlightIndex={0} />
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Espaços</p>
                <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Ocupação por dia e horário</h2>
              </div>
              <Badge tone="green">Tempo real</Badge>
            </div>
            <Heatmap
              rows={ocupacaoSemana.map((dia) => dia.dia)}
              columns={colunas}
              values={ocupacaoSemana.map((dia) => dia.valores)}
              className="mt-5"
            />
            <p className="mt-3 text-[10px] text-ink-400">
              Percentual de ocupação dos espaços esportivos por faixa de horário. Dados consolidados das turmas e
              reservas aprovadas.
            </p>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Ocupação geral</h2>
            <Donut value={78} label="78%" sublabel="das vagas" className="mt-4" />
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-brand-50 p-2">
                <p className="font-display text-base font-bold text-brand-800 tabular">336</p>
                <p className="text-[9px] text-brand-700/60">vagas ocupadas</p>
              </div>
              <div className="rounded-lg bg-ink-50 p-2">
                <p className="font-display text-base font-bold text-ink-800 tabular">92</p>
                <p className="text-[9px] text-ink-400">vagas livres</p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Status do sistema</h2>
            <div className="mt-3 space-y-2.5 text-[11px]">
              {[
                { label: 'API e banco de dados', status: 'Operacional', icon: Database, tone: 'green' as const },
                { label: 'Backup diário', status: 'Concluído 03h00', icon: ShieldCheck, tone: 'green' as const },
                { label: 'Fila de e-mails', status: '12 na fila', icon: Activity, tone: 'amber' as const },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-ink-600">
                    <item.icon className="h-3.5 w-3.5 text-ink-400" aria-hidden /> {item.label}
                  </span>
                  <Badge tone={item.tone}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Ações rápidas</h2>
            <div className="mt-2 space-y-1">
              {[
                { label: 'Homologar inscrições', to: '/admin', icon: ClipboardCheck },
                { label: 'Gerenciar modalidades', to: '/admin/modalidades', icon: Trophy },
                { label: 'Ver auditoria', to: '/admin/relatorios#auditoria', icon: ShieldCheck },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-[11px] font-medium text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                >
                  <item.icon className="h-3.5 w-3.5 text-ink-400" aria-hidden />
                  <span className="flex-1">{item.label}</span>
                  <ArrowRight className="h-3 w-3 text-ink-300" aria-hidden />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 p-5">
          <div>
            <p className="eyebrow">Homologação</p>
            <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Solicitações pendentes</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="amber">14 pendentes</Badge>
            <Button variant="ghost" size="sm" iconRight={ArrowRight}>
              Ver todas
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50/60">
                <Th>Atleta</Th>
                <Th>Modalidade</Th>
                <Th>Turma</Th>
                <Th>Data</Th>
                <Th>Status</Th>
                <Th className="text-right">Ações</Th>
              </tr>
            </thead>
            <tbody>
              {inscricoesRecentes.map((inscricao) => (
                <tr key={`${inscricao.atleta}-${inscricao.modalidade}`} className="border-b border-ink-100 last:border-0">
                  <Td className="font-medium text-ink-900">{inscricao.atleta}</Td>
                  <Td>{inscricao.modalidade}</Td>
                  <Td>{inscricao.turma}</Td>
                  <Td className="text-ink-400">{inscricao.data}</Td>
                  <Td>
                    <Badge tone="amber">{inscricao.status}</Badge>
                  </Td>
                  <Td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`Aprovar ${inscricao.atleta}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100"
                      >
                        <Check className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        aria-label={`Recusar ${inscricao.atleta}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-red-50 hover:text-danger"
                      >
                        <X className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Atléticas</h2>
            <Link to="/admin" className="text-[11px] font-semibold text-brand-700 hover:text-brand-900">
              Gerenciar
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {[
              { nome: 'Atlética Águia', status: 'Ativa', atletas: 54 },
              { nome: 'Atlética Falcão', status: 'Ativa', atletas: 41 },
              { nome: 'Atlética Coruja', status: 'Em homologação', atletas: 0 },
            ].map((atletica) => (
              <div key={atletica.nome} className="flex items-center justify-between gap-2 rounded-xl border border-ink-200/80 p-3">
                <div>
                  <p className="text-[12px] font-medium text-ink-900">{atletica.nome}</p>
                  <p className="text-[10px] text-ink-400">{atletica.atletas} atletas vinculados</p>
                </div>
                <Badge tone={atletica.status === 'Ativa' ? 'green' : 'amber'}>{atletica.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Torneios em andamento</h2>
            <Link to="/torneios" className="text-[11px] font-semibold text-brand-700 hover:text-brand-900">
              Ver todos
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {torneios
              .filter((torneio) => torneio.status !== 'encerrado')
              .slice(0, 3)
              .map((torneio) => (
                <Link
                  key={torneio.slug}
                  to={`/torneios/${torneio.slug}`}
                  className="flex items-center justify-between gap-2 rounded-xl border border-ink-200/80 p-3 hover:border-brand-300 hover:bg-brand-50/30"
                >
                  <div>
                    <p className="text-[12px] font-medium text-ink-900">{torneio.nome}</p>
                    <p className="text-[10px] text-ink-400">
                      {torneio.periodo} · {torneio.equipes || torneio.atletas} {torneio.equipes ? 'equipes' : 'atletas'}
                    </p>
                  </div>
                  <Badge tone={torneio.status === 'andamento' ? 'lime' : 'green'}>
                    {torneio.status === 'andamento' ? 'Em andamento' : 'Inscrições'}
                  </Badge>
                </Link>
              ))}
          </div>
        </Card>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-ink-200 bg-white px-4 py-3 text-[11px] text-ink-400">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
        Dados pessoais são tratados conforme a LGPD. Relatórios públicos usam dados agregados e anonimizados. Acesso às
        rotas administrativas protegido por RBAC e JWT.
      </div>
    </div>
  )
}
