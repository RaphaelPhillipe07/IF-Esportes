import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import type { Modalidade, Noticia, Torneio } from '@/data/types'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/format'
import { Badge } from './ui'
import { SportArt, SportIcon } from './Brand'

type Tone = 'green' | 'lime' | 'gray' | 'amber' | 'red' | 'blue' | 'dark' | 'outline'

const statusLabels: Record<string, { label: string; tone: Tone }> = {
  aberta: { label: 'Inscrições abertas', tone: 'green' },
  ultimas: { label: 'Últimas vagas', tone: 'lime' },
  lotada: { label: 'Turma lotada', tone: 'red' },
  abertas: { label: 'Inscrições abertas', tone: 'green' },
  andamento: { label: 'Em andamento', tone: 'lime' },
  encerrado: { label: 'Encerrado', tone: 'gray' },
  ativa: { label: 'Ativa', tone: 'green' },
  fila: { label: 'Fila de espera', tone: 'amber' },
  concluida: { label: 'Concluída', tone: 'gray' },
  cancelada: { label: 'Cancelada', tone: 'red' },
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const info = statusLabels[status] ?? { label: status, tone: 'gray' as Tone }
  return (
    <Badge tone={info.tone} className={className} dot={status === 'andamento' || status === 'ativa'}>
      {info.label}
    </Badge>
  )
}

export function ModalidadeCard({ modalidade, className }: { modalidade: Modalidade; className?: string }) {
  const restantes = modalidade.vagas - modalidade.inscritos
  return (
    <Link
      to={`/modalidades/${modalidade.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift',
        className,
      )}
    >
      <SportArt sport={modalidade.sport} image={modalidade.imagem} className="h-36">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex items-start justify-between gap-2">
            <Badge tone="dark" className="bg-ink-950/55 text-white backdrop-blur">
              {modalidade.categoria}
            </Badge>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur">
              <SportIcon sport={modalidade.sport} className="h-4 w-4" />
            </span>
          </div>
          <h3 className="font-display text-xl font-bold tracking-tight text-white">{modalidade.nome}</h3>
        </div>
      </SportArt>

      <div className="flex flex-1 flex-col p-4">
        <p className="line-clamp-2 text-[12px] leading-relaxed text-ink-500">{modalidade.resumo}</p>
        <div className="mt-3 space-y-1.5 text-[11px] text-ink-500">
          <p className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-ink-300" aria-hidden /> {modalidade.local}
          </p>
          <p className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-ink-300" aria-hidden /> {modalidade.dias.join(' e ')} · {modalidade.horarios[0]}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-ink-100 pt-3">
          <StatusBadge status={modalidade.status} />
          <span className="text-[11px] font-semibold text-brand-700">
            {restantes > 0 ? `${restantes} vagas` : 'Fila de espera'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export function TorneioCard({ torneio, className }: { torneio: Torneio; className?: string }) {
  return (
    <Link
      to={`/torneios/${torneio.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift',
        className,
      )}
    >
      <SportArt sport={torneio.sport} image={torneio.imagem} className="h-32">
        <div className="flex h-full flex-col justify-between p-4">
          <StatusBadge status={torneio.status} className="w-fit" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-lime-300">{torneio.modalidade}</p>
            <h3 className="mt-0.5 font-display text-lg font-bold leading-tight tracking-tight text-white">{torneio.nome}</h3>
          </div>
        </div>
      </SportArt>
      <div className="flex flex-1 flex-col p-4">
        <p className="flex items-center gap-1.5 text-[12px] text-ink-500">
          <CalendarDays className="h-3.5 w-3.5 text-ink-300" aria-hidden />
          {torneio.periodo}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-ink-500">
          <MapPin className="h-3.5 w-3.5 text-ink-300" aria-hidden />
          {torneio.local}
        </p>
        <div className="mt-3 flex items-center gap-4 text-[11px] text-ink-400">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden /> {torneio.equipes || torneio.atletas}{' '}
            {torneio.equipes ? 'equipes' : 'atletas'}
          </span>
          <span>{torneio.jogos} jogos</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
          <span className="text-[11px] text-ink-400">
            {torneio.status === 'encerrado' ? 'Competição encerrada' : `Inscrições até ${formatDate(torneio.inscricoesAte, { day: '2-digit', month: 'short' })}`}
          </span>
          <ArrowRight className="h-4 w-4 text-brand-700 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </div>
      </div>
    </Link>
  )
}

export function NoticiaCard({ noticia, featured = false }: { noticia: Noticia; featured?: boolean }) {
  if (featured) {
    return (
      <Link
        to={`/noticias#${noticia.slug}`}
        className="group relative col-span-full block overflow-hidden rounded-3xl border border-ink-200/80 bg-brand-950 shadow-card"
      >
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          <div className="relative min-h-[260px] overflow-hidden">
            <img
              src={asset(noticia.imagem)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/20 to-brand-950/60 md:bg-gradient-to-r md:from-transparent md:to-brand-950/80" />
          </div>
          <div className="relative flex flex-col justify-center p-6 md:p-8">
            <div className="flex items-center gap-2">
              <Badge tone="lime" className="bg-lime-300 text-brand-950 ring-lime-300/40">
                {noticia.categoria}
              </Badge>
              <span className="text-[11px] text-white/70">{formatDate(noticia.data)}</span>
            </div>
            <h3 className="mt-4 text-balance font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
              {noticia.titulo}
            </h3>
            <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-white/65">{noticia.resumo}</p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-lime-300">
              Ler matéria <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/noticias#${noticia.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={asset(noticia.imagem)}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute left-3 top-3">
          <Badge tone="dark" className="bg-ink-950/60 text-white backdrop-blur">
            {noticia.categoria}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-medium uppercase tracking-wider text-ink-400">{formatDate(noticia.data)}</p>
        <h3 className="mt-2 line-clamp-2 font-display text-[15px] font-bold leading-snug tracking-tight text-ink-950 group-hover:text-brand-800">
          {noticia.titulo}
        </h3>
        <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-ink-500">{noticia.resumo}</p>
        <p className="mt-auto pt-4 text-[11px] font-medium text-ink-400">{noticia.leitura}</p>
      </div>
    </Link>
  )
}
