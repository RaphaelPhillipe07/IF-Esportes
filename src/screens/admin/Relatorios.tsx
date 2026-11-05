import {
  AlertTriangle,
  ClipboardCheck,
  Download,
  FileSpreadsheet,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'
import { inscritosPorModalidade, logsAuditoria, ocupacaoPorHorario, ocupacaoSemana } from '@/data/mock'
import { BarChart, Heatmap, LineChart } from '@/components/charts'
import {
  Alert,
  Badge,
  Button,
  Card,
  PageHeader,
  Select,
  StatCard,
  TableWrap,
  Td,
  Th,
} from '@/components/ui'

const colunas = ['06h', '07h', '08h', '17h', '18h', '19h', '20h', '21h']

const evolucao = [
  { label: 'Ago', value: 210 },
  { label: 'Set', value: 268 },
  { label: 'Out', value: 342 },
  { label: 'Nov', value: 428 },
]

export function Relatorios() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administração · dados"
        title="Relatórios e auditoria"
        description="Consulte indicadores de inscrição, ocupação dos espaços e o histórico de ações administrativas da plataforma."
        actions={
          <>
            <Select aria-label="Período do relatório" defaultValue="2026-2" className="h-10 w-[150px] text-[12px]">
              <option value="2026-2">2026.2</option>
              <option value="2026-1">2026.1</option>
              <option value="2025-2">2025.2</option>
            </Select>
            <Button variant="secondary" size="md" icon={FileSpreadsheet}>
              Exportar CSV
            </Button>
            <Button size="md" icon={Download}>
              Exportar PDF
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={ClipboardCheck} label="Inscrições no período" value="428" delta="+12%" tone="green" hint="Todas as modalidades" />
        <StatCard icon={TrendingUp} label="Ocupação média" value="78%" delta="+5%" tone="lime" hint="14 turmas ativas" />
        <StatCard icon={AlertTriangle} label="Turmas lotadas" value="5" hint="Com fila de espera ativa" tone="amber" />
        <StatCard icon={Users} label="Fila de espera" value="23" hint="Pessoas aguardando vaga" tone="blue" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Demanda</p>
              <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Inscritos por modalidade</h2>
            </div>
            <Badge tone="outline">2026.2</Badge>
          </div>
          <BarChart data={inscritosPorModalidade} className="mt-5" height={200} />
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Evolução</p>
              <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Inscrições ao longo do semestre</h2>
            </div>
            <Badge tone="green">+104% no período</Badge>
          </div>
          <LineChart data={evolucao} className="mt-6" />
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-ink-100 pt-3 text-center">
            {[
              { label: 'Agosto', value: '210' },
              { label: 'Outubro', value: '342' },
              { label: 'Novembro', value: '428' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-display text-base font-bold text-ink-950 tabular">{item.value}</p>
                <p className="text-[10px] text-ink-400">{item.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Espaços esportivos</p>
            <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Mapa de ocupação por dia e horário</h2>
          </div>
          <Badge tone="green">Atualizado hoje</Badge>
        </div>
        <Heatmap
          rows={ocupacaoSemana.map((dia) => dia.dia)}
          columns={colunas}
          values={ocupacaoSemana.map((dia) => dia.valores)}
          className="mt-5"
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Horários</p>
              <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Ocupação por faixa</h2>
            </div>
            <Badge tone="outline">Média do semestre</Badge>
          </div>
          <div className="mt-4 space-y-3">
            {ocupacaoPorHorario.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-9 text-[11px] font-semibold text-ink-500 tabular">{item.label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className={item.value >= 90 ? 'h-full rounded-full bg-danger' : item.value >= 75 ? 'h-full rounded-full bg-lime-500' : 'h-full rounded-full bg-brand-600'}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[11px] font-medium text-ink-600 tabular">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-display text-lg font-bold tracking-tight text-ink-950">Resumo executivo</h2>
          <div className="mt-4 space-y-3 text-[12px]">
            {[
              { label: 'Modalidade mais procurada', value: 'Futsal · 120 inscritos' },
              { label: 'Maior ocupação', value: '19h · 96% dos espaços' },
              { label: 'Turmas com fila', value: 'Futsal, Natação B, Handebol' },
              { label: 'Tempo médio de resposta', value: '1,4 s · dentro do RNF-01' },
              { label: 'Backup mais recente', value: '04/11/2026 · 03h00' },
            ].map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-3 border-b border-ink-100 pb-2.5 last:border-0 last:pb-0">
                <span className="text-ink-400">{item.label}</span>
                <span className="text-right font-medium text-ink-800">{item.value}</span>
              </div>
            ))}
          </div>
          <Alert tone="info" className="mt-4" title="Relatórios exportáveis">
            A exportação gera arquivos CSV e PDF com os dados do período selecionado. O acesso é restrito à coordenação
            e fica registrado na auditoria (RF-08).
          </Alert>
        </Card>
      </div>

      <div id="auditoria">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 p-5">
            <div>
              <p className="eyebrow">Auditoria</p>
              <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Log de ações administrativas</h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone="outline">Últimas 24h</Badge>
              <Button variant="ghost" size="sm" iconRight={Download}>
                Exportar log
              </Button>
            </div>
          </div>
          <TableWrap className="rounded-none border-0 shadow-none">
            <thead>
              <tr>
                <Th>Data</Th>
                <Th>Usuário</Th>
                <Th>Perfil</Th>
                <Th>Ação</Th>
                <Th>Entidade</Th>
                <Th>IP</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {logsAuditoria.map((log) => (
                <tr key={log.id} className="border-b border-ink-100 last:border-0">
                  <Td className="whitespace-nowrap text-[11px] text-ink-400">{log.data}</Td>
                  <Td className="font-medium text-ink-900">{log.usuario}</Td>
                  <Td>{log.perfil}</Td>
                  <Td>{log.acao}</Td>
                  <Td className="text-ink-500">{log.entidade}</Td>
                  <Td className="text-[11px] text-ink-400 tabular">{log.ip}</Td>
                  <Td>
                    <Badge tone={log.status === 'Sucesso' ? 'green' : 'amber'}>{log.status}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Card>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-ink-200 bg-white px-4 py-3 text-[11px] text-ink-400">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
        Dados pessoais são tratados conforme a LGPD. Relatórios de uso externo devem ser anonimizados. Logs são
        mantidos por 12 meses e acessíveis apenas a perfis autorizados.
      </div>
    </div>
  )
}
