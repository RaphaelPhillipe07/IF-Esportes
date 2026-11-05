import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Download,
  Flame,
  IdCard,
  MapPin,
  Medal,
  Share2,
  ShieldCheck,
  Star,
  Trophy,
} from 'lucide-react'
import { atleta, inscricoes } from '@/data/mock'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'
import { Badge, Button, ButtonLink, Card, PageHeader, Progress } from '@/components/ui'
import { SportIcon } from '@/components/Brand'

type TipoMedalha = 'ouro' | 'prata' | 'bronze' | 'inicio'

const medalhaInfo: Record<TipoMedalha, { label: string; className: string; icon: typeof Medal }> = {
  ouro: { label: 'Ouro', className: 'bg-amber-100 text-amber-800', icon: Medal },
  prata: { label: 'Prata', className: 'bg-slate-100 text-slate-700', icon: Medal },
  bronze: { label: 'Bronze', className: 'bg-orange-100 text-orange-800', icon: Medal },
  inicio: { label: 'Início', className: 'bg-brand-100 text-brand-800', icon: Star },
}

const linhaDoTempo: { data: string; titulo: string; descricao: string; tipo: TipoMedalha; local: string }[] = [
  {
    data: 'Nov 2026',
    titulo: 'Jogos Internos IFAL 2026',
    descricao: 'Ouro no revezamento 4x100 m livre e prata com a equipe de voleibol feminino.',
    tipo: 'ouro',
    local: 'Piscina e Quadra Coberta',
  },
  {
    data: 'Nov 2026',
    titulo: 'Torneio de Natação · Etapa Maceió',
    descricao: 'Bronze nos 100 m livre com índice para a etapa estadual.',
    tipo: 'bronze',
    local: 'Piscina do Campus',
  },
  {
    data: 'Dez 2025',
    titulo: 'Copa das Atléticas',
    descricao: 'Prata com a equipe Águia Vôlei na final da competição.',
    tipo: 'prata',
    local: 'Ginásio Poliesportivo',
  },
  {
    data: 'Nov 2025',
    titulo: 'Jogos Internos IFAL 2025',
    descricao: 'Prata no revezamento 4x50 m livre e 4º lugar nos 50 m livre.',
    tipo: 'prata',
    local: 'Piscina do Campus',
  },
  {
    data: 'Ago 2023',
    titulo: 'Primeira turma de natação',
    descricao: 'Início da trajetória esportiva no campus e criação do passaporte.',
    tipo: 'inicio',
    local: 'Piscina do Campus',
  },
]

const historico = [
  { torneio: 'Jogos Internos IFAL 2026', modalidade: 'Natação', resultado: 'Ouro · 4x100 m livre', data: 'Nov 2026' },
  { torneio: 'Jogos Internos IFAL 2026', modalidade: 'Voleibol', resultado: 'Prata · equipe feminina', data: 'Nov 2026' },
  { torneio: 'Torneio de Natação Maceió', modalidade: 'Natação', resultado: 'Bronze · 100 m livre', data: 'Nov 2026' },
  { torneio: 'Copa das Atléticas 2025', modalidade: 'Voleibol', resultado: 'Prata · equipe feminina', data: 'Dez 2025' },
  { torneio: 'Jogos Internos IFAL 2025', modalidade: 'Natação', resultado: 'Prata · 4x50 m livre', data: 'Nov 2025' },
]

const medalhas = [
  { titulo: 'Ouro · 4x100 m livre', evento: 'Jogos Internos 2026', tipo: 'ouro' as TipoMedalha },
  { titulo: 'Ouro · 100 m livre', evento: 'Torneio de Natação 2025', tipo: 'ouro' as TipoMedalha },
  { titulo: 'Prata · Voleibol feminino', evento: 'Copa das Atléticas 2025', tipo: 'prata' as TipoMedalha },
  { titulo: 'Prata · Revezamento 4x50 m', evento: 'Jogos Internos 2025', tipo: 'prata' as TipoMedalha },
  { titulo: 'Prata · Voleibol feminino', evento: 'Jogos Internos 2026', tipo: 'prata' as TipoMedalha },
  { titulo: 'Bronze · 100 m livre', evento: 'Torneio de Natação 2026', tipo: 'bronze' as TipoMedalha },
]

export function Passaporte() {
  const modalidadesAtivas = inscricoes.filter((inscricao) => inscricao.status === 'ativa')

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Passaporte esportivo"
        title="Minha trajetória no esporte"
        description="Um registro completo das suas modalidades, competições, medalhas e frequência no IFAL Campus Maceió."
        actions={
          <>
            <Button variant="secondary" size="md" icon={Share2}>
              Compartilhar
            </Button>
            <Button variant="secondary" size="md" icon={Download}>
              Baixar PDF
            </Button>
          </>
        }
      />

      <Card className="overflow-hidden">
        <div className="relative bg-brand-950 p-6 text-white md:p-8">
          <div className="bg-dots absolute inset-0 opacity-30" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img
                src={asset('/images/atleta.jpg')}
                alt={atleta.nome}
                className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/10"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-2xl font-bold tracking-tight">{atleta.nome}</h2>
                  <Badge tone="lime">Atleta ativa</Badge>
                </div>
                <p className="mt-1 text-[12px] text-white/60">
                  {atleta.matricula} · {atleta.curso}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/45">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" aria-hidden /> Desde {atleta.desde}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden /> IFAL Campus Maceió
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-lime-300" aria-hidden /> Vínculo verificado
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {atleta.modalidades.map((modalidade) => (
                <span key={modalidade} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] text-white/70">
                  {modalidade}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-ink-100 md:grid-cols-4">
          {[
            { label: 'Modalidades', value: atleta.modalidades.length, icon: Trophy },
            { label: 'Torneios', value: atleta.torneios, icon: CalendarDays },
            { label: 'Medalhas', value: 6, icon: Medal },
            { label: 'Frequência', value: `${atleta.frequencia}%`, icon: Flame },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <item.icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="font-display text-xl font-bold leading-none text-ink-950 tabular">{item.value}</p>
                <p className="mt-0.5 text-[10px] text-ink-400">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Histórico</p>
                <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink-950">Linha do tempo esportiva</h2>
              </div>
              <Badge tone="outline">5 marcos</Badge>
            </div>

            <ol className="mt-6 space-y-0">
              {linhaDoTempo.map((item, index) => {
                const info = medalhaInfo[item.tipo]
                const Icon = info.icon
                return (
                  <li key={`${item.titulo}-${item.data}`} className="relative flex gap-4 pb-6 last:pb-0">
                    {index < linhaDoTempo.length - 1 ? (
                      <span className="absolute left-[19px] top-10 h-[calc(100%-24px)] w-px bg-ink-200" />
                    ) : null}
                    <span className={cn('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full', info.className)}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[13px] font-semibold text-ink-900">{item.titulo}</p>
                        <Badge tone={item.tipo === 'ouro' ? 'amber' : item.tipo === 'prata' ? 'gray' : item.tipo === 'bronze' ? 'outline' : 'green'}>
                          {info.label}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-[11px] text-ink-400">
                        {item.data} · {item.local}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-500">{item.descricao}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Competições</p>
                <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink-950">Histórico de participações</h2>
              </div>
              <Button variant="ghost" size="sm" iconRight={ArrowRight}>
                Ver tudo
              </Button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 text-[10px] uppercase tracking-wider text-ink-400">
                    <th className="py-2 pr-3 font-semibold">Torneio</th>
                    <th className="px-3 py-2 font-semibold">Modalidade</th>
                    <th className="px-3 py-2 font-semibold">Resultado</th>
                    <th className="px-3 py-2 text-right font-semibold">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map((item) => (
                    <tr key={`${item.torneio}-${item.modalidade}-${item.data}`} className="border-b border-ink-100 last:border-0">
                      <td className="py-3 pr-3 text-[12px] font-medium text-ink-900">{item.torneio}</td>
                      <td className="px-3 py-3 text-[12px] text-ink-500">{item.modalidade}</td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-700">
                          <Medal className="h-3.5 w-3.5 text-gold" aria-hidden /> {item.resultado}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right text-[11px] text-ink-400">{item.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Desempenho</p>
                <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink-950">Frequência por modalidade</h2>
              </div>
              <Badge tone="green">Acima de 75%</Badge>
            </div>
            <div className="mt-5 space-y-4">
              {[
                { modalidade: 'Natação', valor: 96, sport: 'natacao' as const },
                { modalidade: 'Atletismo', valor: 91, sport: 'atletismo' as const },
                { modalidade: 'Voleibol', valor: 88, sport: 'volei' as const },
              ].map((item) => (
                <div key={item.modalidade} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <SportIcon sport={item.sport} className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-ink-700">{item.modalidade}</span>
                      <span className="font-semibold text-ink-800 tabular">{item.valor}%</span>
                    </div>
                    <Progress value={item.valor} tone="brand" size="sm" className="mt-1" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-ink-100 pt-4">
              {[
                { label: 'Treinos no semestre', value: '42' },
                { label: 'Provas disputadas', value: '14' },
                { label: 'Pódios', value: '6' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-display text-lg font-bold text-ink-950 tabular">{item.value}</p>
                  <p className="text-[10px] text-ink-400">{item.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Medalhas</h2>
              <Award className="h-4 w-4 text-gold" aria-hidden />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(['ouro', 'prata', 'bronze'] as TipoMedalha[]).map((tipo) => {
                const info = medalhaInfo[tipo]
                const Icon = info.icon
                const total = medalhas.filter((medalha) => medalha.tipo === tipo).length
                return (
                  <div key={tipo} className={cn('rounded-xl p-3 text-center', info.className)}>
                    <Icon className="mx-auto h-5 w-5" aria-hidden />
                    <p className="mt-1 font-display text-xl font-bold tabular">{total}</p>
                    <p className="text-[9px] font-semibold uppercase tracking-wider">{info.label}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 space-y-2.5">
              {medalhas.slice(0, 4).map((medalha) => {
                const info = medalhaInfo[medalha.tipo]
                return (
                  <div key={medalha.titulo} className="flex items-start gap-2.5">
                    <span className={cn('mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full', info.className)}>
                      <Medal className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold leading-snug text-ink-800">{medalha.titulo}</p>
                      <p className="text-[10px] text-ink-400">{medalha.evento}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Modalidades ativas</h2>
            <div className="mt-3 space-y-2">
              {modalidadesAtivas.map((inscricao) => (
                <div key={inscricao.id} className="flex items-center gap-2.5 rounded-xl border border-ink-200/80 p-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <SportIcon sport={inscricao.sport} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-ink-800">{inscricao.modalidade}</p>
                    <p className="text-[10px] text-ink-400">{inscricao.turma}</p>
                  </div>
                  <Link to="/app/inscricoes" aria-label={`Ver ${inscricao.modalidade}`} className="text-ink-400 hover:text-brand-700">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Conquistas</h2>
            <div className="mt-3 space-y-2">
              {[
                { titulo: 'Frequência exemplar', descricao: 'Acima de 90% em 2026.2', icon: Flame },
                { titulo: 'Atleta destaque', descricao: 'Jogos Internos 2025', icon: Star },
                { titulo: 'Pódio em três modalidades', descricao: 'Natação, atletismo e voleibol', icon: Trophy },
              ].map((item) => (
                <div key={item.titulo} className="flex items-start gap-2.5 rounded-xl bg-ink-50/70 p-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
                    <item.icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold text-ink-800">{item.titulo}</p>
                    <p className="text-[10px] text-ink-400">{item.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="rounded-2xl border border-dashed border-ink-200 bg-white/60 p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-700">
              <IdCard className="h-3.5 w-3.5 text-brand-600" aria-hidden /> Passaporte verificado
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-400">
              Dados validados pela coordenação de esportes. Compartilhe o link público para enviar seu histórico a
              treinadores e organizadores.
            </p>
            <ButtonLink to="/entrar" variant="secondary" size="sm" className="mt-3 w-full justify-center">
              Gerar link público
            </ButtonLink>
          </div>
        </aside>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-3 text-[11px] text-ink-400">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
        Histórico atualizado em 04/11/2026. Medalhas e frequência são sincronizadas após a homologação dos resultados.
      </div>
    </div>
  )
}
