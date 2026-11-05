import { useMemo, useState } from 'react'
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import { modalidades } from '@/data/mock'
import { cn } from '@/lib/cn'
import {
  Button,
  Card,
  Chip,
  EmptyState,
  PageHeader,
  SearchInput,
  Select,
} from '@/components/ui'
import { ModalidadeCard } from '@/components/cards'

const categorias = ['Todas', 'Coletiva', 'Individual', 'Aquática', 'Combate', 'Mental', 'Praia']
const dias = ['Todos', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const locais = ['Todos', ...Array.from(new Set(modalidades.map((modalidade) => modalidade.local)))]

export function Modalidades() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [local, setLocal] = useState('Todos')
  const [dia, setDia] = useState('Todos')
  const [somenteVagas, setSomenteVagas] = useState(false)
  const [ordenacao, setOrdenacao] = useState('vagas')

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    const resultado = modalidades.filter((modalidade) => {
      const matchBusca =
        !termo ||
        modalidade.nome.toLowerCase().includes(termo) ||
        modalidade.resumo.toLowerCase().includes(termo) ||
        modalidade.instrutor.toLowerCase().includes(termo)
      const matchCategoria = categoria === 'Todas' || modalidade.categoria === categoria
      const matchLocal = local === 'Todos' || modalidade.local === local
      const matchDia = dia === 'Todos' || modalidade.dias.includes(dia)
      const matchVagas = !somenteVagas || modalidade.inscritos < modalidade.vagas
      return matchBusca && matchCategoria && matchLocal && matchDia && matchVagas
    })

    return resultado.sort((a, b) => {
      if (ordenacao === 'nome') return a.nome.localeCompare(b.nome)
      if (ordenacao === 'procuradas') return b.inscritos - a.inscritos
      return b.vagas - b.inscritos - (a.vagas - a.inscritos)
    })
  }, [busca, categoria, local, dia, somenteVagas, ordenacao])

  const temFiltro = busca || categoria !== 'Todas' || local !== 'Todos' || dia !== 'Todos' || somenteVagas

  function limparFiltros() {
    setBusca('')
    setCategoria('Todas')
    setLocal('Todos')
    setDia('Todos')
    setSomenteVagas(false)
  }

  return (
    <div className="container-page py-8 md:py-10">
      <PageHeader
        eyebrow="Catálogo"
        title="Modalidades esportivas"
        description="Encontre turmas por esporte, local ou dia da semana. Confira horários, vagas e pré-requisitos antes de solicitar sua inscrição."
        actions={
          <div className="hidden items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-2 text-[12px] text-ink-500 md:flex">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {modalidades.length} modalidades ativas
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[248px_1fr]">
        <aside className="hidden lg:block">
          <Card className="sticky top-24 p-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-900">
                <Filter className="h-4 w-4 text-ink-400" aria-hidden /> Filtros
              </p>
              {temFiltro ? (
                <button
                  type="button"
                  onClick={limparFiltros}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-700 hover:text-brand-900"
                >
                  <X className="h-3 w-3" aria-hidden /> Limpar
                </button>
              ) : null}
            </div>

            <div className="mt-4">
              <SearchInput
                placeholder="Buscar modalidade"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
              />
            </div>

            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">Categoria</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {categorias.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategoria(item)}
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors',
                      categoria === item
                        ? 'border-brand-700 bg-brand-700 text-white'
                        : 'border-ink-200 text-ink-500 hover:border-ink-300 hover:text-ink-800',
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Select label="Local" value={local} onChange={(event) => setLocal(event.target.value)}>
                {locais.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
              <Select label="Dia da semana" value={dia} onChange={(event) => setDia(event.target.value)}>
                {dias.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-2 text-[12px] font-medium text-ink-600">
              <input
                type="checkbox"
                checked={somenteVagas}
                onChange={(event) => setSomenteVagas(event.target.checked)}
                className="h-4 w-4 rounded border-ink-300 text-brand-700 focus:ring-brand-500"
              />
              Somente com vagas abertas
            </label>

            <div className="mt-5 rounded-xl bg-brand-50 p-3">
              <p className="text-[11px] font-semibold text-brand-900">Precisa de orientação?</p>
              <p className="mt-1 text-[11px] leading-relaxed text-brand-800/70">
                A coordenação ajuda a escolher a turma ideal para o seu nível.
              </p>
              <a href="mailto:esportes@ifal.edu.br" className="mt-2 inline-block text-[11px] font-semibold text-brand-700">
                Falar com a coordenação →
              </a>
            </div>
          </Card>
        </aside>

        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SearchInput
              placeholder="Buscar por nome, local ou professor"
              className="w-full sm:max-w-sm lg:hidden"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-ink-400 lg:hidden" aria-hidden />
              <Select
                aria-label="Ordenar modalidades"
                className="h-10 w-[190px] text-[12px]"
                value={ordenacao}
                onChange={(event) => setOrdenacao(event.target.value)}
              >
                <option value="vagas">Mais vagas disponíveis</option>
                <option value="procuradas">Mais procuradas</option>
                <option value="nome">Nome (A–Z)</option>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 hide-scrollbar lg:hidden">
            {categorias.map((item) => (
              <Chip key={item} active={categoria === item} onClick={() => setCategoria(item)}>
                {item}
              </Chip>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-[12px] text-ink-400">
              <span className="font-semibold text-ink-700">{filtradas.length}</span>{' '}
              {filtradas.length === 1 ? 'modalidade encontrada' : 'modalidades encontradas'}
            </p>
            {temFiltro ? (
              <button
                type="button"
                onClick={limparFiltros}
                className="text-[11px] font-medium text-brand-700 hover:text-brand-900 lg:hidden"
              >
                Limpar filtros
              </button>
            ) : null}
          </div>

          {filtradas.length ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtradas.map((modalidade) => (
                <ModalidadeCard key={modalidade.slug} modalidade={modalidade} />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-4"
              icon={Search}
              title="Nenhuma modalidade encontrada"
              description="Tente remover alguns filtros ou buscar por outro termo, como “natação” ou “quadra”."
              action={
                <Button variant="secondary" onClick={limparFiltros}>
                  Limpar filtros
                </Button>
              }
            />
          )}

          <div className="mt-8 rounded-2xl border border-dashed border-ink-200 bg-white/60 p-5 text-center">
            <p className="text-[13px] font-medium text-ink-700">Não encontrou o esporte que procura?</p>
            <p className="mt-1 text-[12px] text-ink-400">
              A coordenação avalia novas turmas a cada semestre. Envie sua sugestão.
            </p>
            <a
              href="mailto:esportes@ifal.edu.br?subject=Sugest%C3%A3o%20de%20modalidade"
              className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-700 hover:text-brand-900"
            >
              Sugerir uma modalidade →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
