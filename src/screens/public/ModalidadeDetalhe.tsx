import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  MapPin,
  Share2,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react'
import { modalidades } from '@/data/mock'
import { cn } from '@/lib/cn'
import { pct } from '@/lib/format'
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  ButtonLink,
  Card,
  Progress,
  SectionHeading,
} from '@/components/ui'
import { SportArt, SportIcon } from '@/components/Brand'
import { StatusBadge } from '@/components/cards'
import { NotFound } from '../NotFound'

export function ModalidadeDetalhe() {
  const { slug } = useParams()
  const modalidade = modalidades.find((item) => item.slug === slug)

  if (!modalidade) return <NotFound />

  const restantes = modalidade.vagas - modalidade.inscritos
  const ocupacao = pct(modalidade.inscritos, modalidade.vagas)
  const lotada = restantes <= 0

  return (
    <div className="container-page py-6 md:py-10">
      <Breadcrumb
        items={[
          { label: 'Início', to: '/' },
          { label: 'Modalidades', to: '/modalidades' },
          { label: modalidade.nome },
        ]}
      />

      <div className="mt-4 overflow-hidden rounded-3xl border border-ink-200/80 bg-brand-950 shadow-card">
        <SportArt sport={modalidade.sport} image={modalidade.imagem} className="min-h-[280px] md:min-h-[340px]">
          <div className="flex h-full flex-col justify-end p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="lime">{modalidade.categoria}</Badge>
              <Badge tone="dark" className="bg-white/10 text-white backdrop-blur">
                {modalidade.nivel}
              </Badge>
              <StatusBadge status={modalidade.status} />
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  {modalidade.nome}
                </h1>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-white/70">{modalidade.resumo}</p>
              </div>
              <span className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-lime-300 backdrop-blur md:flex">
                <SportIcon sport={modalidade.sport} className="h-7 w-7" />
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/65">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-lime-300" aria-hidden /> {modalidade.local}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-lime-300" aria-hidden /> {modalidade.dias.join(' e ')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-lime-300" aria-hidden /> {modalidade.instrutor}
              </span>
            </div>
          </div>
        </SportArt>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="p-6">
            <SectionHeading eyebrow="Sobre a modalidade" title="Como são os treinos" />
            <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{modalidade.descricao}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Nível', value: modalidade.nivel },
                { label: 'Vagas por turma', value: `${modalidade.vagas} alunos` },
                { label: 'Duração', value: 'Encontros de 1h a 2h' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-ink-50 p-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">{item.label}</p>
                  <p className="mt-1 text-[13px] font-semibold text-ink-900">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <SectionHeading eyebrow="Horários" title="Turmas disponíveis" />
              <Badge tone="outline">{modalidade.turmas.length} turmas</Badge>
            </div>
            <div className="mt-5 divide-y divide-ink-100">
              {modalidade.turmas.map((turma) => {
                const turmaRestantes = turma.vagas - turma.inscritos
                return (
                  <div key={turma.id} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-semibold text-ink-900">{turma.nome}</p>
                        <StatusBadge status={turma.status} />
                      </div>
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-500">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-ink-300" aria-hidden /> {turma.dias}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-ink-300" aria-hidden /> {turma.horario}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4 sm:text-right">
                      <div className="w-32">
                        <p className="text-[11px] text-ink-400">
                          {turmaRestantes > 0 ? `${turmaRestantes} vagas livres` : 'Sem vagas'}
                        </p>
                        <Progress
                          value={pct(turma.inscritos, turma.vagas)}
                          tone={turma.status === 'lotada' ? 'red' : turma.status === 'ultimas' ? 'amber' : 'brand'}
                          size="sm"
                          className="mt-1"
                        />
                      </div>
                      <Link
                        to={`/modalidades/${modalidade.slug}/inscricao?turma=${turma.id}`}
                        className={cn(
                          'inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-[11px] font-semibold transition-colors',
                          turmaRestantes > 0
                            ? 'border-brand-200 bg-brand-50 text-brand-800 hover:bg-brand-100'
                            : 'cursor-not-allowed border-ink-200 bg-ink-50 text-ink-400',
                        )}
                        aria-disabled={turmaRestantes <= 0}
                        onClick={(event) => {
                          if (turmaRestantes <= 0) event.preventDefault()
                        }}
                      >
                        {turmaRestantes > 0 ? 'Selecionar' : 'Fila de espera'}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <SectionHeading eyebrow="Pré-requisitos" title="Antes de começar" />
              <ul className="mt-4 space-y-2.5">
                {modalidade.prerequisitos.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-ink-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <SectionHeading eyebrow="Equipamentos" title="O que levar" />
              <ul className="mt-4 space-y-2.5">
                {modalidade.equipamentos.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-ink-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-ink-100 p-5">
              <SectionHeading eyebrow="Local" title={modalidade.local} />
              <Badge tone="green">Campus Maceió</Badge>
            </div>
            <div className="bg-grid relative h-44 bg-brand-50">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-white shadow-lift ring-4 ring-white">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <span className="mt-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-ink-700 shadow-sm">
                  {modalidade.local}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-5 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold text-ink-900">Inscrição 2026.2</p>
              <StatusBadge status={modalidade.status} />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="font-display text-3xl font-bold tracking-tight text-ink-950 tabular">
                  {Math.max(0, restantes)}
                  <span className="ml-1 text-sm font-medium text-ink-400">/ {modalidade.vagas} vagas</span>
                </p>
                <p className="mt-1 text-[11px] text-ink-400">{modalidade.inscritos} alunos já inscritos</p>
              </div>
              <span className="text-[11px] font-semibold text-brand-700 tabular">{ocupacao}%</span>
            </div>
            <Progress
              value={ocupacao}
              tone={lotada ? 'red' : restantes <= 4 ? 'amber' : 'brand'}
              className="mt-3"
            />

            <ButtonLink
              to={lotada ? '/modalidades' : `/modalidades/${modalidade.slug}/inscricao`}
              size="lg"
              className="mt-5 w-full justify-center"
              iconRight={lotada ? undefined : ArrowRight}
            >
              {lotada ? 'Entrar na fila de espera' : 'Solicitar vaga'}
            </ButtonLink>
            <Button variant="secondary" size="md" className="mt-2 w-full justify-center" icon={Share2}>
              Compartilhar modalidade
            </Button>

            <div className="mt-5 space-y-2.5 border-t border-ink-100 pt-4 text-[11px] text-ink-500">
              <p className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden />
                Inscrição gratuita e sujeita à homologação da coordenação.
              </p>
              <p className="flex items-start gap-2">
                <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden />
                Ao lotar, a turma gera fila de espera automática (RN-01).
              </p>
              <p className="flex items-start gap-2">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden />
                O sistema bloqueia conflitos de dia e horário (RN-02).
              </p>
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">Professor responsável</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                <User className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ink-900">{modalidade.instrutor}</p>
                <p className="text-[11px] text-ink-400">Coordenação de Esportes</p>
              </div>
            </div>
            <a
              href="mailto:esportes@ifal.edu.br"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:text-brand-900"
            >
              Enviar dúvida <ArrowRight className="h-3 w-3" aria-hidden />
            </a>
          </Card>

          <Alert tone="warning" icon={Clock} title="Conflito de horário">
            Você não pode se matricular em duas modalidades no mesmo dia e horário. O sistema valida isso antes de
            confirmar a solicitação.
          </Alert>

          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">Documentos</p>
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              className="mt-3 flex items-center justify-between rounded-xl border border-ink-200 px-3 py-2.5 text-[12px] font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50/50"
            >
              Regulamento das turmas 2026.2
              <Download className="h-4 w-4 text-ink-400" aria-hidden />
            </a>
          </Card>
        </aside>
      </div>
    </div>
  )
}
