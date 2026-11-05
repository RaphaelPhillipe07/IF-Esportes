import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Download, MapPin, Search, Trophy, Users } from 'lucide-react'
import { torneios } from '@/data/mock'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/format'
import {
  Badge,
  ButtonLink,
  Card,
  EmptyState,
  PageHeader,
  SearchInput,
  Tabs,
} from '@/components/ui'
import { SportArt } from '@/components/Brand'
import { StatusBadge, TorneioCard } from '@/components/cards'

const abas = [
  { value: 'todos', label: 'Todos' },
  { value: 'abertas', label: 'Inscrições abertas' },
  { value: 'andamento', label: 'Em andamento' },
  { value: 'encerrado', label: 'Encerrados' },
]

const calendario = [
  { dia: '10', mes: 'NOV', titulo: 'Início dos Jogos Internos', local: 'Ginásio e quadras' },
  { dia: '20', mes: 'NOV', titulo: 'Fim das inscrições · Copa das Atléticas', local: 'On-line' },
  { dia: '28', mes: 'NOV', titulo: 'Torneio de Natação · Etapa Maceió', local: 'Piscina do Campus' },
  { dia: '06', mes: 'DEZ', titulo: 'Circuito de Corrida do Campus', local: 'Pista do Campus' },
]

export function Torneios() {
  const [aba, setAba] = useState('todos')
  const [busca, setBusca] = useState('')

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return torneios.filter((torneio) => {
      const matchAba = aba === 'todos' || torneio.status === aba
      const matchBusca =
        !termo ||
        torneio.nome.toLowerCase().includes(termo) ||
        torneio.modalidade.toLowerCase().includes(termo) ||
        torneio.local.toLowerCase().includes(termo)
      return matchAba && matchBusca
    })
  }, [aba, busca])

  const destaque = torneios.find((torneio) => torneio.slug === 'jogos-internos-2026')
  const lista = filtrados.filter((torneio) => torneio.slug !== destaque?.slug)

  return (
    <div className="container-page py-8 md:py-10">
      <PageHeader
        eyebrow="Torneios e eventos"
        title="Competições do campus"
        description="Acompanhe inscrições, chaves, tabelas de classificação e resultados dos torneios organizados pela coordenação e pelas atléticas."
        actions={
          <ButtonLink to="/noticias" variant="secondary" size="md" icon={Download}>
            Editais e regulamentos
          </ButtonLink>
        }
      />

      {destaque ? (
        <Link
          to={`/torneios/${destaque.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-ink-200/80 bg-brand-950 shadow-card transition-shadow hover:shadow-lift lg:grid-cols-[1.1fr_1fr]"
        >
          <SportArt sport={destaque.sport} image={destaque.imagem} className="min-h-[260px]">
            <div className="flex h-full flex-col justify-between p-6 md:p-8">
              <div className="flex items-center gap-2">
                <Badge tone="lime">{destaque.modalidade}</Badge>
                <StatusBadge status={destaque.status} />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lime-300">Destaque do semestre</p>
                <h2 className="mt-1 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  {destaque.nome}
                </h2>
                <p className="mt-2 flex items-center gap-1.5 text-[12px] text-white/65">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden /> {destaque.periodo}
                </p>
              </div>
            </div>
          </SportArt>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <p className="text-[13px] leading-relaxed text-white/65">{destaque.descricao}</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: 'Equipes', value: destaque.equipes },
                { label: 'Jogos', value: destaque.jogos },
                { label: 'Atletas', value: destaque.atletas },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="font-display text-xl font-bold text-white tabular">{item.value}</p>
                  <p className="text-[10px] text-white/45">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold text-lime-300">
              Ver chaves e resultados <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </div>
          </div>
        </Link>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Tabs items={abas} value={aba} onChange={setAba} className="flex-1" />
        <SearchInput
          placeholder="Buscar torneio"
          className="w-full md:w-64"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          <p className="text-[12px] text-ink-400">
            <span className="font-semibold text-ink-700">{lista.length}</span>{' '}
            {lista.length === 1 ? 'torneio encontrado' : 'torneios encontrados'}
          </p>
          {lista.length ? (
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {lista.map((torneio) => (
                <TorneioCard key={torneio.slug} torneio={torneio} />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-3"
              icon={Search}
              title="Nenhum torneio nesta categoria"
              description="Troque a aba ou limpe a busca para ver outras competições."
            />
          )}
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Próximas datas</h2>
              <CalendarDays className="h-4 w-4 text-ink-400" aria-hidden />
            </div>
            <div className="mt-4 space-y-3">
              {calendario.map((item) => (
                <div key={item.titulo} className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-50 text-brand-800">
                    <span className="font-display text-sm font-bold leading-none tabular">{item.dia}</span>
                    <span className="text-[8px] font-semibold uppercase tracking-wider">{item.mes}</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium leading-snug text-ink-800">{item.titulo}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[10px] text-ink-400">
                      <MapPin className="h-2.5 w-2.5" aria-hidden /> {item.local}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Como participar</h2>
            <ol className="mt-3 space-y-3">
              {[
                'Confirme seu vínculo institucional no cadastro.',
                'Inscreva sua equipe pela atlética ou sua inscrição individual.',
                'Acompanhe chaves, horários e resultados por aqui.',
              ].map((passo, index) => (
                <li key={passo} className="flex gap-2.5 text-[12px] text-ink-500">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-100 text-[10px] font-bold text-ink-600">
                    {index + 1}
                  </span>
                  {passo}
                </li>
              ))}
            </ol>
            <ButtonLink to="/noticias" variant="secondary" size="sm" className="mt-4 w-full justify-center" icon={Trophy}>
              Ver editais
            </ButtonLink>
          </Card>

          <div className="rounded-2xl border border-dashed border-ink-200 bg-white/60 p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-700">
              <Users className="h-3.5 w-3.5 text-brand-600" aria-hidden /> Organize um torneio
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-400">
              Representantes de atlética podem criar campeonatos e gerenciar equipes pelo painel da atlética.
            </p>
            <Link to="/gestao" className="mt-2 inline-block text-[11px] font-semibold text-brand-700 hover:text-brand-900">
              Acessar painel →
            </Link>
          </div>
        </aside>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-ink-200 bg-white p-4 text-[12px] text-ink-500">
        <span className="font-semibold text-ink-700">Inscrições encerrando:</span>
        {torneios
          .filter((torneio) => torneio.status === 'abertas')
          .slice(0, 2)
          .map((torneio) => (
            <Link
              key={torneio.slug}
              to={`/torneios/${torneio.slug}`}
              className={cn(
                'inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-800 hover:bg-amber-100',
              )}
            >
              {torneio.nome} · até {formatDate(torneio.inscricoesAte, { day: '2-digit', month: 'short' })}
            </Link>
          ))}
      </div>
    </div>
  )
}
