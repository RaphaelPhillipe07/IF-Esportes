import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock, Info, MapPin, Search, Ticket, XCircle } from 'lucide-react'
import { inscricoes } from '@/data/mock'
import {
  Alert,
  Badge,
  Button,
  ButtonLink,
  Card,
  EmptyState,
  PageHeader,
  Progress,
  Tabs,
} from '@/components/ui'
import { SportIcon } from '@/components/Brand'
import { StatusBadge } from '@/components/cards'

const abas = [
  { value: 'ativas', label: 'Ativas', count: 2 },
  { value: 'fila', label: 'Fila de espera', count: 1 },
  { value: 'historico', label: 'Histórico', count: 1 },
]

export function MinhasInscricoes() {
  const [aba, setAba] = useState('ativas')
  const lista = inscricoes.filter((inscricao) =>
    aba === 'ativas' ? inscricao.status === 'ativa' : aba === 'fila' ? inscricao.status === 'fila' : ['concluida', 'cancelada'].includes(inscricao.status),
  )

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="2026.2"
        title="Minhas inscrições"
        description="Acompanhe o status das suas solicitações, a frequência em cada turma e a posição na fila de espera."
        actions={
          <ButtonLink to="/modalidades" size="md" icon={Search}>
            Nova inscrição
          </ButtonLink>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: 'Inscrições ativas', value: '2', hint: 'Natação e Voleibol' },
          { label: 'Fila de espera', value: '1', hint: 'Handebol · posição 2' },
          { label: 'Frequência média', value: '92%', hint: 'Acima do mínimo de 75%' },
          { label: 'Concluídas', value: '1', hint: 'Judô · 2025.2' },
        ].map((item) => (
          <Card key={item.label} className="p-4">
            <p className="text-[11px] font-medium text-ink-400">{item.label}</p>
            <p className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-950 tabular">{item.value}</p>
            <p className="mt-0.5 text-[10px] text-ink-400">{item.hint}</p>
          </Card>
        ))}
      </div>

      <Tabs items={abas} value={aba} onChange={setAba} />

      {aba === 'fila' ? (
        <Alert tone="warning" icon={Info} title="Você está na fila de espera">
          Quando uma vaga abrir em <strong>Handebol · Turma única</strong>, você será avisada por e-mail e terá 24 horas
          para confirmar a matrícula. Sua posição atual é <strong>2º</strong>.
        </Alert>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {lista.length ? (
            lista.map((inscricao) => (
              <Card key={inscricao.id} className="p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <SportIcon sport={inscricao.sport} className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-[17px] font-bold tracking-tight text-ink-950">{inscricao.modalidade}</h2>
                        <StatusBadge status={inscricao.status} />
                      </div>
                      <p className="mt-0.5 text-[12px] text-ink-500">
                        {inscricao.turma} · {inscricao.local}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink-400">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" aria-hidden /> {inscricao.horario.split(' · ')[0]}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden /> {inscricao.horario.split(' · ')[1]}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" aria-hidden /> {inscricao.local}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:items-end">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/modalidades/${inscricao.sport === 'handebol' ? 'handebol' : inscricao.sport === 'natacao' ? 'natacao' : 'voleibol'}`}
                        className="inline-flex h-9 items-center gap-1 rounded-lg border border-ink-200 px-3 text-[11px] font-semibold text-ink-700 hover:border-brand-300 hover:bg-brand-50/50"
                      >
                        Ver modalidade <ArrowRight className="h-3 w-3" aria-hidden />
                      </Link>
                      {inscricao.status === 'ativa' ? (
                        <button
                          type="button"
                          className="inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-[11px] font-medium text-ink-400 hover:bg-red-50 hover:text-danger"
                        >
                          <XCircle className="h-3.5 w-3.5" aria-hidden /> Cancelar
                        </button>
                      ) : null}
                    </div>
                    {inscricao.status === 'fila' ? (
                      <Badge tone="amber">Posição {inscricao.posicao} na fila</Badge>
                    ) : null}
                  </div>
                </div>

                {inscricao.status === 'ativa' ? (
                  <div className="mt-4 grid gap-3 border-t border-ink-100 pt-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <Progress
                      value={inscricao.frequencia}
                      label="Frequência no semestre"
                      tone={inscricao.frequencia >= 85 ? 'brand' : 'amber'}
                    />
                    <p className="text-[11px] text-ink-400">
                      {inscricao.frequencia >= 85
                        ? 'Você está acima da frequência mínima de 75%.'
                        : 'Atenção: abaixo da frequência mínima de 75%.'}
                    </p>
                  </div>
                ) : null}
              </Card>
            ))
          ) : (
            <EmptyState
              icon={Ticket}
              title="Nenhuma inscrição nesta categoria"
              description="Explore as modalidades disponíveis e solicite sua vaga."
              action={<ButtonLink to="/modalidades">Ver modalidades</ButtonLink>}
            />
          )}
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Regras de inscrição</h2>
            <ul className="mt-3 space-y-2.5 text-[11px] leading-relaxed text-ink-500">
              <li>• A vaga é confirmada após homologação da coordenação.</li>
              <li>• O sistema bloqueia duas modalidades no mesmo dia e horário (RN-02).</li>
              <li>• Turmas lotadas geram fila de espera automática (RN-01).</li>
              <li>• Cancelamentos devem ser feitos com até 24h de antecedência.</li>
            </ul>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Precisa cancelar?</h2>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-500">
              Se não puder continuar em uma turma, cancele para liberar a vaga para outro aluno da fila.
            </p>
            <Button variant="secondary" size="sm" className="mt-3 w-full justify-center">
              Falar com a coordenação
            </Button>
          </Card>

          <div className="rounded-2xl border border-dashed border-ink-200 bg-white/60 p-4">
            <p className="text-[11px] font-semibold text-ink-700">Frequência mínima</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-400">
              Para receber o certificado e permanecer na turma, é necessário comparecer a pelo menos 75% dos encontros.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
