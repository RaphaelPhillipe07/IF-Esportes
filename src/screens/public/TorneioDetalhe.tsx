import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  Download,
  FileText,
  MapPin,
  Share2,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react'
import { chaveFutsal, classificacaoFutsal, proximosJogos, torneios } from '@/data/mock'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/format'
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  ButtonLink,
  Card,
  PageHeader,
  StatCard,
  Tabs,
} from '@/components/ui'
import { Bracket, StandingsTable } from '@/components/Bracket'
import { StatusBadge } from '@/components/cards'
import { NotFound } from '../NotFound'

const abas = [
  { value: 'visao', label: 'Visão geral' },
  { value: 'chaves', label: 'Chaves' },
  { value: 'classificacao', label: 'Classificação' },
  { value: 'resultados', label: 'Resultados' },
  { value: 'regulamento', label: 'Regulamento' },
]

export function TorneioDetalhe() {
  const { slug } = useParams()
  const [aba, setAba] = useState('visao')
  const torneio = torneios.find((item) => item.slug === slug)

  if (!torneio) return <NotFound />

  return (
    <div className="container-page py-6 md:py-10">
      <Breadcrumb
        items={[
          { label: 'Início', to: '/' },
          { label: 'Torneios', to: '/torneios' },
          { label: torneio.nome },
        ]}
      />

      <div className="mt-4 overflow-hidden rounded-3xl border border-ink-200/80 bg-brand-950 shadow-card">
        <div className="relative min-h-[260px]">
          <img src={asset(torneio.imagem)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/55 to-brand-950/15" />
          <div className="relative flex h-full flex-col justify-end p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="lime" className="bg-lime-300 text-brand-950 ring-lime-300/40">
                {torneio.modalidade}
              </Badge>
              <StatusBadge status={torneio.status} />
              <Badge tone="dark" className="bg-white/10 text-white backdrop-blur">
                {torneio.formato}
              </Badge>
            </div>
            <h1 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {torneio.nome}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-lime-300" aria-hidden /> {torneio.periodo}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-lime-300" aria-hidden /> {torneio.local}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-lime-300" aria-hidden /> {torneio.organizador}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <ButtonLink
                to={torneio.status === 'abertas' ? '/gestao/torneios/jogos-internos-2026' : '#chaves'}
                variant="lime"
                size="md"
                iconRight={ArrowRight}
              >
                {torneio.status === 'abertas' ? 'Inscrever equipe' : 'Acompanhar competição'}
              </ButtonLink>
              <Button variant="outlineLight" size="md" icon={Share2}>
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Tabs items={abas} value={aba} onChange={setAba} />
      </div>

      {aba === 'visao' ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatCard icon={Users} label="Equipes" value={torneio.equipes || '—'} tone="green" />
              <StatCard icon={Trophy} label="Jogos" value={torneio.jogos} tone="lime" />
              <StatCard icon={Users} label="Atletas" value={torneio.atletas} tone="gray" />
              <StatCard icon={CalendarDays} label="Dias" value="12" tone="amber" />
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Agenda</p>
                  <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink-950">Próximos jogos</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setAba('chaves')}
                  className="text-[12px] font-semibold text-brand-700 hover:text-brand-900"
                >
                  Ver todos →
                </button>
              </div>
              <div className="mt-4 divide-y divide-ink-100">
                {proximosJogos.map((jogo) => (
                  <div key={`${jogo.timeA}-${jogo.timeB}`} className="flex flex-col gap-2 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <Trophy className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold text-ink-900">
                          {jogo.timeA} <span className="font-normal text-ink-400">x</span> {jogo.timeB}
                        </p>
                        <p className="text-[11px] text-ink-400">
                          {jogo.modalidade} · {jogo.fase} · {jogo.local}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pl-13 sm:pl-0">
                      <span className="text-[11px] text-ink-500">
                        {jogo.data} · {jogo.hora}
                      </span>
                      <Badge tone="outline">Agendado</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Futsal · eliminatórias</p>
                  <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink-950">Chave da competição</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setAba('chaves')}
                  className="text-[12px] font-semibold text-brand-700 hover:text-brand-900"
                >
                  Ampliar →
                </button>
              </div>
              <Bracket rounds={chaveFutsal.slice(0, 2)} className="mt-4" />
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Futsal · grupo A</p>
                  <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink-950">Classificação</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setAba('classificacao')}
                  className="text-[12px] font-semibold text-brand-700 hover:text-brand-900"
                >
                  Ver tabela completa →
                </button>
              </div>
              <div className="mt-4">
                <StandingsTable rows={classificacaoFutsal.slice(0, 4)} />
              </div>
            </Card>
          </div>

          <aside className="space-y-4">
            <Card className="p-5">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Informações do torneio</h2>
              <dl className="mt-4 space-y-3 text-[12px]">
                <InfoRow label="Período" value={torneio.periodo} />
                <InfoRow label="Local" value={torneio.local} />
                <InfoRow label="Formato" value={torneio.formato} />
                <InfoRow label="Organização" value={torneio.organizador} />
                <InfoRow
                  label="Inscrições"
                  value={
                    torneio.status === 'encerrado'
                      ? 'Encerradas'
                      : `Até ${formatDate(torneio.inscricoesAte, { day: '2-digit', month: 'long' })}`
                  }
                />
              </dl>
            </Card>

            <Card className="p-5">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Documentos</h2>
              <div className="mt-3 space-y-2">
                {['Regulamento geral', 'Tabela de jogos', 'Termo de inscrição'].map((documento) => (
                  <a
                    key={documento}
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    className="flex items-center justify-between rounded-xl border border-ink-200 px-3 py-2.5 text-[12px] font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50/50"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FileText className="h-4 w-4 text-ink-400" aria-hidden /> {documento}
                    </span>
                    <Download className="h-3.5 w-3.5 text-ink-400" aria-hidden />
                  </a>
                ))}
              </div>
            </Card>

            <Alert tone="info" title="Resultados homologados">
              Resultados publicados pela comissão organizadora não podem ser alterados sem justificativa registrada no
              log de auditoria (RN-03).
            </Alert>
          </aside>
        </div>
      ) : null}

      {aba === 'chaves' ? (
        <Card className="mt-6 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Futsal · eliminatórias</p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-950">Chave completa</h2>
            </div>
            <Badge tone="green">Resultados homologados até as semifinais</Badge>
          </div>
          <Bracket rounds={chaveFutsal} className="mt-6" />
          <p className="mt-4 text-[11px] text-ink-400">
            Toque em uma partida para ver detalhes, escalações e súmula. A final está prevista para 22 de novembro, às
            19h, no Ginásio Poliesportivo.
          </p>
        </Card>
      ) : null}

      {aba === 'classificacao' ? (
        <Card className="mt-6 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Futsal · grupo A</p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-950">Tabela de classificação</h2>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-600" /> Classificados
              </span>
              <span>J = jogos · V = vitórias · E = empates · D = derrotas</span>
            </div>
          </div>
          <div className="mt-5">
            <StandingsTable rows={classificacaoFutsal} />
          </div>
        </Card>
      ) : null}

      {aba === 'resultados' ? (
        <Card className="mt-6 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Futsal · eliminatórias</p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-950">Resultados das partidas</h2>
            </div>
            <Badge tone="outline">Atualizado em 04/11 · 09h42</Badge>
          </div>
          <div className="mt-5 divide-y divide-ink-100">
            {chaveFutsal.flatMap((round) =>
              round.partidas.map((match) => (
                <div key={match.id} className="flex flex-col gap-2 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-24 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                      {round.nome}
                    </span>
                    <p className="text-[13px] font-medium text-ink-900">
                      {match.timeA} <span className="mx-1 font-display font-bold text-brand-700">{match.placarA ?? '—'}</span>
                      <span className="text-ink-300">x</span>
                      <span className="mx-1 font-display font-bold text-brand-700">{match.placarB ?? '—'}</span>{' '}
                      {match.timeB}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pl-[108px] sm:pl-0">
                    <span className="text-[11px] text-ink-400">{match.horario}</span>
                    <StatusBadge status={match.status === 'homologado' ? 'encerrado' : match.status === 'em-andamento' ? 'andamento' : 'aberta'} />
                  </div>
                </div>
              )),
            )}
          </div>
        </Card>
      ) : null}

      {aba === 'regulamento' ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card className="p-6 md:p-8">
            <PageHeader
              eyebrow="Documento oficial"
              title="Regulamento do torneio"
              description="Regras de inscrição, formato de disputa, critérios de desempate e conduta dos atletas."
              className="mb-6"
            />
            <div className="prose-sm max-w-none space-y-5 text-[13px] leading-relaxed text-ink-600">
              <RegulationSection title="1. Inscrições">
                As equipes devem ser inscritas pelo representante da atlética até a data limite. Cada atleta pode
                representar apenas uma equipe por modalidade e precisa ter o vínculo institucional validado.
              </RegulationSection>
              <RegulationSection title="2. Formato de disputa">
                A competição é disputada em fase de grupos seguida de eliminatórias simples. Os dois primeiros de cada
                grupo avançam para as semifinais.
              </RegulationSection>
              <RegulationSection title="3. Critérios de desempate">
                Em caso de empate na pontuação, serão considerados: confronto direto, saldo de gols, gols pró e, por
                fim, sorteio realizado pela comissão organizadora.
              </RegulationSection>
              <RegulationSection title="4. Resultados e recursos">
                Os resultados são lançados pela mesa e homologados pela comissão. Após a homologação, alterações exigem
                justificativa formal e ficam registradas no log de auditoria.
              </RegulationSection>
              <RegulationSection title="5. Conduta">
                Estão vedadas práticas antidesportivas. Cartões vermelhos e incidentes são analisados pela comissão
                disciplinar, com direito a defesa em até 24 horas.
              </RegulationSection>
            </div>
          </Card>
          <aside className="space-y-4">
            <Card className="p-5">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Baixar documento</h2>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">
                Versão oficial em PDF, publicada em {formatDate('2026-10-28')}.
              </p>
              <Button variant="secondary" size="md" icon={Download} className="mt-4 w-full justify-center">
                Baixar regulamento
              </Button>
            </Card>
            <Alert tone="info" title="Dúvidas sobre o regulamento?">
              Fale com a comissão organizadora pelo e-mail esportes@ifal.edu.br.
            </Alert>
          </aside>
        </div>
      ) : null}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-ink-400">{label}</dt>
      <dd className="text-right font-medium text-ink-800">{value}</dd>
    </div>
  )
}

function RegulationSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className={cn('font-display text-[15px] font-bold text-ink-950')}>{title}</h3>
      <p className="mt-1.5">{children}</p>
    </section>
  )
}
