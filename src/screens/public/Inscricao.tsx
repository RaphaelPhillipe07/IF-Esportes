import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Info,
  Lock,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { atleta, modalidades } from '@/data/mock'
import { cn } from '@/lib/cn'
import { pct } from '@/lib/format'
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  ButtonLink,
  Card,
  PageHeader,
  Progress,
} from '@/components/ui'
import { SportArt } from '@/components/Brand'
import { StatusBadge } from '@/components/cards'
import { NotFound } from '../NotFound'

const passos = ['Identificação', 'Turma e horário', 'Confirmação']

export function Inscricao() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const modalidade = modalidades.find((item) => item.slug === slug)

  if (!modalidade) return <NotFound />

  const turmaInicial = searchParams.get('turma') ?? modalidade.turmas[0]?.id ?? ''
  const [step, setStep] = useState(2)
  const [turmaId, setTurmaId] = useState(turmaInicial)
  const [aceite, setAceite] = useState(true)

  const turma = modalidade.turmas.find((item) => item.id === turmaId) ?? modalidade.turmas[0]
  const restantes = turma ? turma.vagas - turma.inscritos : 0

  return (
    <div className="container-page py-6 md:py-10">
      <Breadcrumb
        items={[
          { label: 'Início', to: '/' },
          { label: 'Modalidades', to: '/modalidades' },
          { label: modalidade.nome, to: `/modalidades/${modalidade.slug}` },
          { label: 'Inscrição' },
        ]}
      />

      <PageHeader
        className="mt-4"
        eyebrow="Solicitação de vaga"
        title="Inscreva-se em poucos passos"
        description="Confirme seus dados, escolha a turma e envie a solicitação. A coordenação valida a inscrição e você recebe a confirmação por e-mail."
        actions={<Badge tone="green">2026.2</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-5 md:p-7">
          <ol className="flex items-center gap-1.5 sm:gap-3">
            {passos.map((passo, index) => {
              const numero = index + 1
              const atual = numero === step
              const concluido = numero < step
              return (
                <li key={passo} className="flex flex-1 items-center gap-1.5 sm:gap-2">
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                      concluido
                        ? 'bg-brand-700 text-white'
                        : atual
                          ? 'bg-brand-100 text-brand-800 ring-2 ring-brand-600'
                          : 'bg-ink-100 text-ink-400',
                    )}
                  >
                    {concluido ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> : numero}
                  </span>
                  <span
                    className={cn(
                      'hidden text-[11px] font-medium sm:block',
                      atual ? 'text-ink-900' : concluido ? 'text-brand-700' : 'text-ink-400',
                    )}
                  >
                    {passo}
                  </span>
                  {index < passos.length - 1 ? (
                    <span className={cn('h-px flex-1', concluido ? 'bg-brand-300' : 'bg-ink-200')} />
                  ) : null}
                </li>
              )
            })}
          </ol>

          <div className="mt-7 border-t border-ink-100 pt-6">
            {step === 1 ? (
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink-950">Confirme seus dados</h2>
                <p className="mt-1 text-[13px] text-ink-500">
                  As informações abaixo vêm do seu cadastro institucional e não podem ser alteradas aqui.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <ReadonlyField label="Nome completo" value={atleta.nome} />
                  <ReadonlyField label="Matrícula" value={atleta.matricula} />
                  <ReadonlyField label="E-mail institucional" value={atleta.email} className="sm:col-span-2" />
                  <ReadonlyField label="Curso" value={atleta.curso} className="sm:col-span-2" />
                </div>
                <Alert tone="success" icon={ShieldCheck} className="mt-5" title="Vínculo institucional confirmado">
                  Seu e-mail foi validado no cadastro. Você pode se inscrever em qualquer modalidade disponível para
                  alunos.
                </Alert>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink-950">Escolha sua turma</h2>
                <p className="mt-1 text-[13px] text-ink-500">
                  Selecione o horário que melhor se encaixa na sua grade. O sistema valida conflitos automaticamente.
                </p>

                <div className="mt-5 space-y-2.5">
                  {modalidade.turmas.map((item) => {
                    const selected = item.id === turmaId
                    const itemRestantes = item.vagas - item.inscritos
                    return (
                      <label
                        key={item.id}
                        className={cn(
                          'flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors',
                          selected
                            ? 'border-brand-600 bg-brand-50/60 ring-1 ring-brand-600'
                            : 'border-ink-200 bg-white hover:border-ink-300',
                          itemRestantes <= 0 && 'opacity-70',
                        )}
                      >
                        <input
                          type="radio"
                          name="turma"
                          value={item.id}
                          checked={selected}
                          onChange={() => setTurmaId(item.id)}
                          className="mt-1 h-4 w-4 border-ink-300 text-brand-700 focus:ring-brand-500"
                        />
                        <span className="flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-[13px] font-semibold text-ink-900">{item.nome}</span>
                            <StatusBadge status={item.status} />
                          </span>
                          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-500">
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays className="h-3 w-3 text-ink-300" aria-hidden /> {item.dias}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3 text-ink-300" aria-hidden /> {item.horario}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-ink-300" aria-hidden /> {item.local}
                            </span>
                          </span>
                          <span className="mt-2 flex items-center gap-2">
                            <Progress
                              value={pct(item.inscritos, item.vagas)}
                              tone={itemRestantes <= 0 ? 'red' : itemRestantes <= 3 ? 'amber' : 'brand'}
                              size="sm"
                              className="w-36"
                            />
                            <span className="text-[10px] font-medium text-ink-400">
                              {itemRestantes > 0 ? `${itemRestantes} de ${item.vagas} vagas livres` : 'Turma lotada — fila de espera'}
                            </span>
                          </span>
                        </span>
                      </label>
                    )
                  })}
                </div>

                <Alert tone="success" icon={CheckCircle2} className="mt-4" title="Nenhum conflito de horário identificado">
                  Sua turma atual de Voleibol acontece às segundas e quartas, 17h. A turma selecionada não colide com
                  esse horário (RN-02).
                </Alert>

                <label className="mt-4 flex items-start gap-2.5 text-[12px] leading-relaxed text-ink-500">
                  <input
                    type="checkbox"
                    checked={aceite}
                    onChange={(event) => setAceite(event.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-700 focus:ring-brand-500"
                  />
                  Declaro que li o regulamento da modalidade e estou ciente de que a vaga depende de homologação da
                  coordenação de esportes.
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                  <CheckCircle2 className="h-7 w-7" aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-950">
                  Solicitação enviada!
                </h2>
                <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-ink-500">
                  Seu pedido de vaga em <strong className="text-ink-800">{modalidade.nome}</strong> foi registrado com o
                  protocolo <strong className="text-ink-800">2026.2-{modalidade.nome.slice(0, 3).toUpperCase()}-0142</strong>.
                </p>
                <div className="mx-auto mt-6 max-w-sm rounded-xl border border-ink-200 bg-ink-50/60 p-4 text-left">
                  <div className="space-y-2 text-[12px]">
                    <SummaryRow label="Turma" value={`${turma?.nome} · ${turma?.dias}`} />
                    <SummaryRow label="Horário" value={turma?.horario ?? ''} />
                    <SummaryRow label="Local" value={turma?.local ?? ''} />
                  </div>
                </div>
                <Alert tone="info" className="mx-auto mt-4 max-w-sm text-left" title="Próximos passos">
                  A coordenação homologa a inscrição em até 2 dias úteis. Você receberá um e-mail de confirmação e o
                  status também aparece em “Minhas inscrições”.
                </Alert>
                <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                  <ButtonLink to="/app/inscricoes" size="md" iconRight={ArrowRight}>
                    Ver minhas inscrições
                  </ButtonLink>
                  <ButtonLink to="/modalidades" variant="secondary" size="md">
                    Explorar outras modalidades
                  </ButtonLink>
                </div>
              </div>
            ) : null}
          </div>

          {step < 3 ? (
            <div className="mt-7 flex items-center justify-between border-t border-ink-100 pt-5">
              <Button
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                onClick={() => setStep((current) => Math.max(1, current - 1))}
                disabled={step === 1}
              >
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <span className="hidden text-[11px] text-ink-400 sm:block">Etapa {step} de 2</span>
                {step === 2 ? (
                  <Button
                    size="md"
                    iconRight={ArrowRight}
                    disabled={!aceite || !turma}
                    onClick={() => setStep(3)}
                  >
                    Enviar solicitação
                  </Button>
                ) : (
                  <Button size="md" iconRight={ArrowRight} onClick={() => setStep(2)}>
                    Continuar
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </Card>

        <aside className="space-y-4">
          <Card className="overflow-hidden lg:sticky lg:top-24">
            <SportArt sport={modalidade.sport} image={modalidade.imagem} className="h-32">
              <div className="flex h-full flex-col justify-end p-4">
                <div className="flex items-center gap-2">
                  <Badge tone="dark" className="bg-ink-950/45 text-white backdrop-blur">
                    {modalidade.categoria}
                  </Badge>
                  <StatusBadge status={modalidade.status} />
                </div>
                <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white">{modalidade.nome}</h2>
              </div>
            </SportArt>
            <div className="space-y-3 p-5">
              <SummaryRow label="Turma" value={turma ? `${turma.nome} · ${turma.dias}` : 'Selecione'} />
              <SummaryRow label="Horário" value={turma?.horario ?? '—'} />
              <SummaryRow label="Local" value={turma?.local ?? '—'} />
              <SummaryRow label="Professor" value={modalidade.instrutor} />
              <SummaryRow label="Investimento" value="Gratuito" />
              <div className="border-t border-ink-100 pt-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-ink-400">Vagas restantes</span>
                  <span className="font-semibold text-ink-800 tabular">{Math.max(0, restantes)}</span>
                </div>
                <Progress
                  value={turma ? pct(turma.inscritos, turma.vagas) : 0}
                  tone={restantes <= 0 ? 'red' : restantes <= 3 ? 'amber' : 'brand'}
                  size="sm"
                  className="mt-1.5"
                />
              </div>
            </div>
          </Card>

          <Alert tone="info" icon={Info} title="Como funciona a homologação">
            A solicitação garante seu lugar na fila. A coordenação confirma a matrícula após validar pré-requisitos e
            conflitos de horário.
          </Alert>

          <Card className="p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-800">
              <Lock className="h-3.5 w-3.5 text-brand-600" aria-hidden /> Seus dados estão protegidos
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-400">
              Usamos apenas as informações necessárias para a inscrição, conforme a LGPD. Nenhum dado é compartilhado
              com terceiros.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function ReadonlyField({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold text-ink-500">{label}</p>
      <div className="mt-1 flex h-11 items-center justify-between rounded-xl border border-ink-200 bg-ink-50/60 px-3.5 text-[13px] text-ink-700">
        <span className="truncate">{value}</span>
        <Lock className="h-3.5 w-3.5 shrink-0 text-ink-300" aria-hidden />
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[11px] text-ink-400">{label}</span>
      <span className="text-right text-[12px] font-medium text-ink-800">{value}</span>
    </div>
  )
}
