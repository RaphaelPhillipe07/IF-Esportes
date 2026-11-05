import { useState } from 'react'
import { ArrowRight, Plus, Search, Settings2, ShieldCheck, Users } from 'lucide-react'
import { modalidades } from '@/data/mock'
import { cn } from '@/lib/cn'
import { pct } from '@/lib/format'
import {
  Badge,
  Button,
  Card,
  Input,
  PageHeader,
  Progress,
  Select,
  StatCard,
  Switch,
} from '@/components/ui'
import { SportIcon } from '@/components/Brand'
import { StatusBadge } from '@/components/cards'

export function ModalidadesAdmin() {
  const [selecionada, setSelecionada] = useState('natacao')
  const [inscricoesAbertas, setInscricoesAbertas] = useState(true)
  const modalidade = modalidades.find((item) => item.slug === selecionada) ?? modalidades[0]
  const totalVagas = modalidades.reduce((total, item) => total + item.vagas, 0)
  const totalInscritos = modalidades.reduce((total, item) => total + item.inscritos, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administração"
        title="Modalidades e turmas"
        description="Cadastre modalidades, abra e feche turmas, ajuste a capacidade de vagas e acompanhe a ocupação de cada horário."
        actions={
          <Button size="md" icon={Plus}>
            Nova modalidade
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Users} label="Modalidades ativas" value={modalidades.length} tone="green" hint="9 esportes no campus" />
        <StatCard icon={Settings2} label="Turmas abertas" value={modalidades.reduce((total, item) => total + item.turmas.length, 0)} tone="lime" hint="Inclui turmas em fila de espera" />
        <StatCard icon={Users} label="Vagas ofertadas" value={totalVagas} tone="blue" hint="Capacidade total do semestre" />
        <StatCard icon={Users} label="Ocupação média" value={`${pct(totalInscritos, totalVagas)}%`} tone="amber" hint={`${totalInscritos} inscritos`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Catálogo</p>
                <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Todas as modalidades</h2>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-ink-400" aria-hidden />
                <Input placeholder="Buscar modalidade" className="h-9 w-52 text-[12px]" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50/60 text-[10px] uppercase tracking-wider text-ink-400">
                    <th className="px-5 py-2.5 font-semibold">Modalidade</th>
                    <th className="px-3 py-2.5 font-semibold">Local</th>
                    <th className="px-3 py-2.5 text-center font-semibold">Turmas</th>
                    <th className="px-3 py-2.5 font-semibold">Ocupação</th>
                    <th className="px-3 py-2.5 font-semibold">Status</th>
                    <th className="px-5 py-2.5 text-right font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {modalidades.map((item) => {
                    const ativa = item.slug === selecionada
                    return (
                      <tr
                        key={item.slug}
                        className={cn('border-b border-ink-100 last:border-0', ativa && 'bg-brand-50/40')}
                      >
                        <td className="px-5 py-3">
                          <button type="button" onClick={() => setSelecionada(item.slug)} className="flex items-center gap-2.5 text-left">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                              <SportIcon sport={item.sport} className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="block text-[12px] font-medium text-ink-900">{item.nome}</span>
                              <span className="block text-[10px] text-ink-400">{item.categoria}</span>
                            </span>
                          </button>
                        </td>
                        <td className="px-3 py-3 text-[11px] text-ink-500">{item.local}</td>
                        <td className="px-3 py-3 text-center text-[12px] text-ink-500 tabular">{item.turmas.length}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={pct(item.inscritos, item.vagas)}
                              tone={item.status === 'lotada' ? 'red' : item.status === 'ultimas' ? 'amber' : 'brand'}
                              size="sm"
                              className="w-20"
                            />
                            <span className="text-[10px] text-ink-400 tabular">
                              {item.inscritos}/{item.vagas}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setSelecionada(item.slug)}
                            className="text-[11px] font-semibold text-brand-700 hover:text-brand-900"
                          >
                            Gerenciar
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <SportIcon sport={modalidade.sport} className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold tracking-tight text-ink-950">{modalidade.nome}</h2>
                  <p className="text-[11px] text-ink-400">
                    {modalidade.local} · {modalidade.instrutor}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={inscricoesAbertas}
                  onChange={setInscricoesAbertas}
                  label="Inscrições abertas"
                  id="inscricoes-abertas"
                />
                <Button variant="secondary" size="sm" icon={Plus}>
                  Nova turma
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {modalidade.turmas.map((turma) => (
                <div key={turma.id} className="flex flex-col gap-2 rounded-xl border border-ink-200/80 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-semibold text-ink-900">{turma.nome}</p>
                      <StatusBadge status={turma.status} />
                    </div>
                    <p className="mt-0.5 text-[11px] text-ink-400">
                      {turma.dias} · {turma.horario} · {turma.local}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:w-56">
                    <Progress
                      value={pct(turma.inscritos, turma.vagas)}
                      tone={turma.status === 'lotada' ? 'red' : turma.status === 'ultimas' ? 'amber' : 'brand'}
                      size="sm"
                      className="flex-1"
                    />
                    <span className="text-[10px] text-ink-400 tabular">
                      {turma.inscritos}/{turma.vagas}
                    </span>
                    <button type="button" className="text-[11px] font-semibold text-brand-700 hover:text-brand-900">
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Nova turma</h2>
              <Badge tone="outline">{modalidade.nome}</Badge>
            </div>
            <div className="mt-4 space-y-3">
              <Input label="Nome da turma" placeholder="Ex.: Turma D" />
              <Select label="Dia da semana">
                <option>Terça e quinta</option>
                <option>Segunda e quarta</option>
                <option>Sábado</option>
                <option>Sexta</option>
              </Select>
              <div className="grid grid-cols-2 gap-2">
                <Input label="Início" type="time" defaultValue="18:00" />
                <Input label="Término" type="time" defaultValue="19:00" />
              </div>
              <Input label="Vagas" type="number" defaultValue="20" min={1} />
              <Input label="Local" defaultValue={modalidade.local} />
              <Button size="md" className="w-full justify-center">
                Criar turma
              </Button>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Regras aplicadas</h2>
            <ul className="mt-3 space-y-2.5 text-[11px] leading-relaxed text-ink-500">
              <li>• Limite de vagas e fila de espera automática (RN-01).</li>
              <li>• Bloqueio de conflito de dia e horário (RN-02).</li>
              <li>• Atualização em tempo real após homologação (RN-06).</li>
            </ul>
          </Card>

          <div className="rounded-2xl border border-dashed border-ink-200 bg-white/60 p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-700">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-600" aria-hidden /> Auditoria de alterações
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-400">
              Mudanças de vagas e horários são registradas com usuário, data e IP. Consulte em Relatórios e auditoria.
            </p>
            <a href="/admin/relatorios#auditoria" className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:text-brand-900">
              Ver auditoria <ArrowRight className="h-3 w-3" aria-hidden />
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
