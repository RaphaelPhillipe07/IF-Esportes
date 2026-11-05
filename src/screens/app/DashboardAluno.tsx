import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Flame,
  IdCard,
  MapPin,
  Medal,
  Ticket,
  Trophy,
  Users,
} from 'lucide-react'
import { atleta, inscricoes, noticiasDestaque, proximosJogos } from '@/data/mock'
import { asset } from '@/lib/assets'
import { firstName, formatDate } from '@/lib/format'
import { Badge, ButtonLink, Card, Progress, StatCard } from '@/components/ui'
import { SportIcon } from '@/components/Brand'

export function DashboardAluno() {
  const ativas = inscricoes.filter((inscricao) => inscricao.status === 'ativa')
  const fila = inscricoes.find((inscricao) => inscricao.status === 'fila')

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
            Quarta-feira, 4 de novembro
          </p>
          <h1 className="mt-1 font-display text-[30px] font-bold leading-tight tracking-tight text-ink-950 md:text-[34px]">
            Bom dia, {firstName(atleta.nome)}.
          </h1>
          <p className="mt-1.5 text-[13px] text-ink-500">
            Você tem {ativas.length} modalidades ativas e um treino hoje às 18h.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ButtonLink to="/modalidades" variant="secondary" size="md">
            Explorar modalidades
          </ButtonLink>
          <ButtonLink to="/app/atleta" size="md" icon={IdCard}>
            Meu passaporte
          </ButtonLink>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Ticket} label="Inscrições ativas" value={ativas.length} hint="2 modalidades em 2026.2" tone="green" />
        <StatCard icon={Flame} label="Frequência" value={`${atleta.frequencia}%`} delta="+4%" tone="lime" hint="Média das modalidades ativas" />
        <StatCard icon={Trophy} label="Torneios disputados" value={atleta.torneios} hint="Desde 2023.2" tone="amber" />
        <StatCard icon={Medal} label="Medalhas" value={6} hint="2 ouros · 3 pratas · 1 bronze" tone="blue" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl bg-brand-950 p-6 text-white shadow-card">
            <div className="bg-dots absolute inset-0 opacity-30" />
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime-400/20 blur-2xl" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <Badge tone="lime" dot>
                  Próximo treino · hoje
                </Badge>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">
                  {atleta.proximoTreino.modalidade} · {atleta.proximoTreino.turma}
                </h2>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/65">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-lime-300" aria-hidden /> {atleta.proximoTreino.horario}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-lime-300" aria-hidden /> {atleta.proximoTreino.local}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-lime-300" aria-hidden /> {atleta.proximoTreino.instrutor}
                  </span>
                </div>
                <p className="mt-4 flex items-center gap-1.5 text-[11px] text-white/45">
                  <CheckCircle2 className="h-3.5 w-3.5 text-lime-300" aria-hidden />
                  Check-in liberado a partir das 17h30 na piscina.
                </p>
              </div>
              <ButtonLink to="/app/inscricoes" variant="lime" size="md" iconRight={ArrowRight} className="shrink-0">
                Ver inscrição
              </ButtonLink>
            </div>
          </div>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">2026.2</p>
                <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Minhas modalidades</h2>
              </div>
              <Link to="/app/inscricoes" className="text-[12px] font-semibold text-brand-700 hover:text-brand-900">
                Ver todas →
              </Link>
            </div>

            <div className="mt-4 space-y-2.5">
              {ativas.map((inscricao) => (
                <div
                  key={inscricao.id}
                  className="flex flex-col gap-3 rounded-xl border border-ink-200/80 p-3.5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <SportIcon sport={inscricao.sport} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-ink-900">{inscricao.modalidade}</p>
                      <p className="text-[11px] text-ink-400">
                        {inscricao.turma} · {inscricao.horario}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:w-52">
                    <Progress
                      value={inscricao.frequencia}
                      label="Frequência"
                      tone={inscricao.frequencia >= 85 ? 'brand' : 'amber'}
                      size="sm"
                      className="flex-1"
                    />
                    <Link
                      to="/app/inscricoes"
                      aria-label={`Ver detalhes de ${inscricao.modalidade}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700"
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {fila ? (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-3">
                <p className="text-[11px] text-amber-900">
                  <strong className="font-semibold">{fila.modalidade}:</strong> você está na posição {fila.posicao} da
                  fila de espera.
                </p>
                <Link to="/app/inscricoes" className="shrink-0 text-[11px] font-semibold text-amber-800 hover:text-amber-950">
                  Acompanhar →
                </Link>
              </div>
            ) : null}
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Agenda</p>
                <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Próximos jogos</h2>
              </div>
              <Link to="/torneios" className="text-[12px] font-semibold text-brand-700 hover:text-brand-900">
                Ver torneios →
              </Link>
            </div>

            <div className="mt-4 divide-y divide-ink-100">
              {proximosJogos.map((jogo) => (
                <div key={`${jogo.timeA}-${jogo.timeB}`} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 flex-col items-center justify-center rounded-lg bg-ink-50 text-ink-700">
                      <span className="font-display text-[12px] font-bold leading-none">{jogo.data.split(' ')[0]}</span>
                      <span className="text-[8px] font-semibold uppercase tracking-wider">{jogo.data.split(' ')[1]}</span>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-ink-900">
                        {jogo.timeA} <span className="text-ink-300">x</span> {jogo.timeB}
                      </p>
                      <p className="text-[10px] text-ink-400">
                        {jogo.modalidade} · {jogo.fase} · {jogo.local}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] text-ink-500">{jogo.hora}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative bg-brand-950 p-5 text-white">
              <div className="bg-dots absolute inset-0 opacity-25" />
              <div className="relative flex items-center gap-3">
                <img
                  src={asset('/images/atleta.jpg')}
                  alt={atleta.nome}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-white/20"
                />
                <div>
                  <p className="font-display text-base font-bold">{atleta.nome}</p>
                  <p className="text-[10px] text-white/50">
                    {atleta.matricula} · {atleta.periodo}
                  </p>
                </div>
              </div>
              <div className="relative mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'Torneios', value: atleta.torneios },
                  { label: 'Medalhas', value: 6 },
                  { label: 'Frequência', value: `${atleta.frequencia}%` },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-white/10 p-2">
                    <p className="font-display text-lg font-bold tabular">{item.value}</p>
                    <p className="text-[9px] text-white/50">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4">
              <ButtonLink to="/app/atleta" variant="secondary" size="sm" className="w-full justify-center" icon={IdCard}>
                Abrir passaporte
              </ButtonLink>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Avisos da coordenação</h2>
              <Link to="/noticias" className="text-[11px] font-semibold text-brand-700 hover:text-brand-900">
                Ver
              </Link>
            </div>
            <div className="mt-3 space-y-3">
              {noticiasDestaque.slice(0, 2).map((noticia) => (
                <Link key={noticia.slug} to={`/noticias#${noticia.slug}`} className="block group">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-700">{noticia.categoria}</p>
                  <p className="mt-0.5 line-clamp-2 text-[12px] font-medium leading-snug text-ink-800 group-hover:text-brand-800">
                    {noticia.titulo}
                  </p>
                  <p className="mt-1 text-[10px] text-ink-400">{formatDate(noticia.data)}</p>
                </Link>
              ))}
            </div>
          </Card>

          <div className="rounded-2xl border border-dashed border-ink-200 bg-white/60 p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-700">
              <CalendarDays className="h-3.5 w-3.5 text-brand-600" aria-hidden /> Semana esportiva
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-400">
              Jogos Internos até 22/11. Confira a agenda completa e venha torcer pelas equipes do campus.
            </p>
            <Link to="/torneios/jogos-internos-2026" className="mt-2 inline-block text-[11px] font-semibold text-brand-700 hover:text-brand-900">
              Ver calendário →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
