import { useMemo, useState } from 'react'
import { ArrowRight, FileText, Plus, Search, ShieldCheck, UserPlus, Users } from 'lucide-react'
import { atletasEquipe, equipes, proximosJogos } from '@/data/mock'
import { cn } from '@/lib/cn'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonLink,
  Card,
  PageHeader,
  Progress,
  SearchInput,
} from '@/components/ui'
import { SportIcon } from '@/components/Brand'

export function Equipes() {
  const [selecionada, setSelecionada] = useState(equipes[1]?.id ?? equipes[0].id)
  const [busca, setBusca] = useState('')
  const equipe = equipes.find((item) => item.id === selecionada) ?? equipes[0]

  const atletasFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return atletasEquipe.filter(
      (atleta) =>
        !termo || atleta.nome.toLowerCase().includes(termo) || atleta.matricula.includes(termo),
    )
  }, [busca])

  const mediaFrequencia = Math.round(
    atletasEquipe.reduce((total, atleta) => total + atleta.frequencia, 0) / atletasEquipe.length,
  )

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Equipes"
        title="Equipes e atletas"
        description="Cadastre equipes, vincule atletas e acompanhe a frequência e a situação de cada integrante."
        actions={
          <Button size="md" icon={Plus}>
            Nova equipe
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {equipes.map((item) => {
          const ativa = item.id === selecionada
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelecionada(item.id)}
              className={cn(
                'rounded-2xl border bg-white p-4 text-left shadow-card transition-all',
                ativa ? 'border-brand-600 ring-1 ring-brand-600' : 'border-ink-200/80 hover:border-brand-300',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <SportIcon sport={item.sport} className="h-4 w-4" />
                </span>
                {ativa ? <Badge tone="green">Selecionada</Badge> : <Badge tone="outline">{item.genero}</Badge>}
              </div>
              <p className="mt-3 text-[13px] font-semibold text-ink-900">{item.nome}</p>
              <p className="text-[10px] text-ink-400">
                {item.modalidade} · {item.atletas} atletas
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Progress value={(item.atletas / 18) * 100} tone={item.atletas >= 14 ? 'brand' : 'amber'} size="sm" className="flex-1" />
                <span className="text-[9px] text-ink-400 tabular">{item.atletas}/18</span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <SportIcon sport={equipe.sport} className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl font-bold tracking-tight text-ink-950">{equipe.nome}</h2>
                    <Badge tone="green">{equipe.status}</Badge>
                  </div>
                  <p className="mt-0.5 text-[11px] text-ink-400">
                    {equipe.modalidade} · {equipe.genero} · Técnico {equipe.tecnico}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" icon={UserPlus}>
                  Vincular atleta
                </Button>
                <Button size="sm">Editar equipe</Button>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Elenco</p>
                <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">
                  Atletas vinculados <span className="text-ink-400">({atletasEquipe.length})</span>
                </h2>
              </div>
              <SearchInput
                placeholder="Buscar atleta ou matrícula"
                className="w-full sm:w-64"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50/60 text-[10px] uppercase tracking-wider text-ink-400">
                    <th className="px-5 py-2.5 font-semibold">Atleta</th>
                    <th className="px-3 py-2.5 font-semibold">Matrícula</th>
                    <th className="px-3 py-2.5 font-semibold">Posição</th>
                    <th className="px-3 py-2.5 font-semibold">Frequência</th>
                    <th className="px-3 py-2.5 font-semibold">Status</th>
                    <th className="px-5 py-2.5 text-right font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {atletasFiltrados.map((atleta) => (
                    <tr key={atleta.matricula} className="border-b border-ink-100 last:border-0">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={atleta.nome} size="xs" />
                          <span className="text-[12px] font-medium text-ink-900">{atleta.nome}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[11px] text-ink-500 tabular">{atleta.matricula}</td>
                      <td className="px-3 py-3 text-[12px] text-ink-500">{atleta.posicao}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={atleta.frequencia}
                            tone={atleta.frequencia >= 75 ? 'brand' : 'amber'}
                            size="sm"
                            className="w-20"
                          />
                          <span className="text-[10px] text-ink-400 tabular">{atleta.frequencia}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <Badge tone={atleta.status === 'Ativo' ? 'green' : 'amber'}>{atleta.status}</Badge>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button type="button" className="text-[11px] font-semibold text-brand-700 hover:text-brand-900">
                          Gerenciar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!atletasFiltrados.length ? (
              <div className="flex items-center justify-center gap-2 px-5 py-8 text-[12px] text-ink-400">
                <Search className="h-4 w-4" aria-hidden /> Nenhum atleta encontrado para “{busca}”.
              </div>
            ) : null}
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Resumo da equipe</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: 'Atletas', value: equipe.atletas },
                { label: 'Frequência média', value: `${mediaFrequencia}%` },
                { label: 'Próximos jogos', value: '2' },
                { label: 'Inscrição', value: 'Ativa' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-ink-50/70 p-3">
                  <p className="font-display text-lg font-bold text-ink-950 tabular">{item.value}</p>
                  <p className="text-[10px] text-ink-400">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-ink-100 pt-4">
              {proximosJogos.slice(0, 2).map((jogo) => (
                <div key={`${jogo.timeA}-${jogo.timeB}`} className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-ink-600">
                    {jogo.timeA} <span className="text-ink-300">x</span> {jogo.timeB}
                  </span>
                  <span className="shrink-0 text-ink-400">
                    {jogo.data} · {jogo.hora}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Documentos da equipe</h2>
            <div className="mt-3 space-y-2">
              {['Lista de atletas', 'Termo de inscrição', 'Súmulas dos jogos'].map((documento) => (
                <a
                  key={documento}
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className="flex items-center justify-between rounded-xl border border-ink-200 px-3 py-2.5 text-[12px] font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50/50"
                >
                  <span className="inline-flex items-center gap-2">
                    <FileText className="h-4 w-4 text-ink-400" aria-hidden /> {documento}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-ink-400" aria-hidden />
                </a>
              ))}
            </div>
          </Card>

          <Alert tone="info" icon={ShieldCheck} title="Permissões de vínculo">
            Apenas representantes da atlética e a coordenação podem vincular atletas às equipes. Cada atleta pode
            representar uma equipe por modalidade (RN-05).
          </Alert>

          <div className="rounded-2xl border border-dashed border-ink-200 bg-white/60 p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-700">
              <Users className="h-3.5 w-3.5 text-brand-600" aria-hidden /> Precisa de mais atletas?
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-400">
              Compartilhe o convite da atlética com os alunos do campus e acompanhe as solicitações de vínculo.
            </p>
            <ButtonLink to="/gestao" variant="secondary" size="sm" className="mt-3 w-full justify-center">
              Voltar ao painel
            </ButtonLink>
          </div>
        </aside>
      </div>
    </div>
  )
}
