import { Trophy } from 'lucide-react'
import type { BracketRound } from '@/data/types'
import { cn } from '@/lib/cn'
import { Badge } from './ui'

export function Bracket({ rounds, className }: { rounds: BracketRound[]; className?: string }) {
  return (
    <div className={cn('flex gap-5 overflow-x-auto pb-2 hide-scrollbar', className)}>
      {rounds.map((round, roundIndex) => (
        <div key={round.nome} className="flex min-w-[220px] flex-1 flex-col">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">{round.nome}</p>
            {roundIndex === rounds.length - 1 ? <Trophy className="h-3.5 w-3.5 text-gold" aria-hidden /> : null}
          </div>
          <div className={cn('flex flex-1 flex-col justify-around gap-3', roundIndex === 0 && 'justify-start')}>
            {round.partidas.map((match) => {
              const finished = match.status === 'homologado'
              const live = match.status === 'em-andamento'
              const winnerA = finished && (match.placarA ?? 0) > (match.placarB ?? 0)
              const winnerB = finished && (match.placarB ?? 0) > (match.placarA ?? 0)
              return (
                <div
                  key={match.id}
                  className={cn(
                    'rounded-xl border bg-white p-2.5 shadow-card',
                    live ? 'border-brand-300 ring-1 ring-brand-200' : 'border-ink-200',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn('truncate text-[12px]', winnerA ? 'font-semibold text-ink-950' : 'text-ink-600')}>
                      {match.timeA}
                    </span>
                    <span className={cn('tabular text-[12px]', winnerA ? 'font-bold text-brand-700' : 'text-ink-400')}>
                      {match.placarA ?? '—'}
                    </span>
                  </div>
                  <div className="my-1 border-t border-dashed border-ink-100" />
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn('truncate text-[12px]', winnerB ? 'font-semibold text-ink-950' : 'text-ink-600')}>
                      {match.timeB}
                    </span>
                    <span className={cn('tabular text-[12px]', winnerB ? 'font-bold text-brand-700' : 'text-ink-400')}>
                      {match.placarB ?? '—'}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-ink-400">{match.horario ?? 'A definir'}</span>
                    {live ? (
                      <Badge tone="lime" dot>
                        Ao vivo
                      </Badge>
                    ) : finished ? (
                      <Badge tone="green">Homologado</Badge>
                    ) : (
                      <Badge tone="gray">Agendado</Badge>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export function StandingsTable({
  rows,
}: {
  rows: {
    pos: number
    equipe: string
    j: number
    v: number
    e: number
    d: number
    gp: number
    gc: number
    sg: number
    pts: number
  }[]
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-200 text-[10px] uppercase tracking-wider text-ink-400">
            <th className="py-2 pl-1 pr-2 font-semibold">#</th>
            <th className="px-2 py-2 font-semibold">Equipe</th>
            <th className="px-2 py-2 text-center font-semibold">J</th>
            <th className="px-2 py-2 text-center font-semibold">V</th>
            <th className="px-2 py-2 text-center font-semibold">E</th>
            <th className="px-2 py-2 text-center font-semibold">D</th>
            <th className="px-2 py-2 text-center font-semibold">GP</th>
            <th className="px-2 py-2 text-center font-semibold">GC</th>
            <th className="px-2 py-2 text-center font-semibold">SG</th>
            <th className="px-2 py-2 text-center font-semibold">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.equipe} className="border-b border-ink-100 last:border-0">
              <td className="py-2.5 pl-1 pr-2">
                <span
                  className={cn(
                    'inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold tabular',
                    row.pos <= 2 ? 'bg-brand-100 text-brand-800' : 'bg-ink-100 text-ink-500',
                  )}
                >
                  {row.pos}
                </span>
              </td>
              <td className="px-2 py-2.5 text-[13px] font-medium text-ink-900">{row.equipe}</td>
              <td className="px-2 py-2.5 text-center text-[12px] text-ink-500 tabular">{row.j}</td>
              <td className="px-2 py-2.5 text-center text-[12px] text-ink-500 tabular">{row.v}</td>
              <td className="px-2 py-2.5 text-center text-[12px] text-ink-500 tabular">{row.e}</td>
              <td className="px-2 py-2.5 text-center text-[12px] text-ink-500 tabular">{row.d}</td>
              <td className="px-2 py-2.5 text-center text-[12px] text-ink-500 tabular">{row.gp}</td>
              <td className="px-2 py-2.5 text-center text-[12px] text-ink-500 tabular">{row.gc}</td>
              <td className={cn('px-2 py-2.5 text-center text-[12px] tabular', row.sg > 0 ? 'text-brand-700' : 'text-ink-500')}>
                {row.sg > 0 ? `+${row.sg}` : row.sg}
              </td>
              <td className="px-2 py-2.5 text-center text-[13px] font-bold text-ink-950 tabular">{row.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
