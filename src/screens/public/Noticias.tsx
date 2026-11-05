import { useMemo, useState } from 'react'
import { FileText, Mail, Search } from 'lucide-react'
import { noticias } from '@/data/mock'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/format'
import {
  Badge,
  Button,
  Card,
  Chip,
  EmptyState,
  PageHeader,
  SearchInput,
} from '@/components/ui'
import { NoticiaCard } from '@/components/cards'

const categorias = ['Todas', 'Notícia', 'Edital', 'Comunicado']

export function Noticias() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return noticias.filter((noticia) => {
      const matchBusca =
        !termo ||
        noticia.titulo.toLowerCase().includes(termo) ||
        noticia.resumo.toLowerCase().includes(termo)
      const matchCategoria = categoria === 'Todas' || noticia.categoria === categoria
      return matchBusca && matchCategoria
    })
  }, [busca, categoria])

  const destaque = filtradas.find((noticia) => noticia.destaque) ?? filtradas[0]
  const demais = filtradas.filter((noticia) => noticia.slug !== destaque?.slug)
  const editais = noticias.filter((noticia) => noticia.categoria === 'Edital')

  return (
    <div className="container-page py-8 md:py-10">
      <PageHeader
        eyebrow="Comunicação"
        title="Notícias e editais"
        description="Acompanhe comunicados da coordenação de esportes, editais de seleção e a cobertura dos torneios do campus."
        actions={<Badge tone="green">{noticias.length} publicações</Badge>}
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {categorias.map((item) => (
            <Chip key={item} active={categoria === item} onClick={() => setCategoria(item)}>
              {item}
            </Chip>
          ))}
        </div>
        <SearchInput
          placeholder="Buscar notícias e editais"
          className="w-full lg:max-w-xs"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
        />
      </div>

      {filtradas.length ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            {destaque ? (
              <div id={destaque.slug}>
                <NoticiaCard noticia={destaque} featured />
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {demais.map((noticia) => (
                <div key={noticia.slug} id={noticia.slug}>
                  <NoticiaCard noticia={noticia} />
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-[15px] font-bold text-ink-950">Editais em destaque</h2>
                <FileText className="h-4 w-4 text-ink-400" aria-hidden />
              </div>
              <div className="mt-4 space-y-3">
                {editais.map((edital) => (
                  <a
                    key={edital.slug}
                    href={`#${edital.slug}`}
                    className="block rounded-xl border border-ink-200 p-3 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-700">Edital</p>
                    <p className="mt-1 line-clamp-2 text-[12px] font-medium leading-snug text-ink-800">{edital.titulo}</p>
                    <p className="mt-1.5 text-[10px] text-ink-400">{formatDate(edital.data)}</p>
                  </a>
                ))}
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-brand-950 p-5 text-white">
                <Mail className="h-5 w-5 text-lime-300" aria-hidden />
                <h2 className="mt-2 font-display text-[15px] font-bold">Receba os comunicados</h2>
                <p className="mt-1 text-[11px] leading-relaxed text-white/55">
                  Um resumo semanal com editais, resultados e próximos jogos no seu e-mail institucional.
                </p>
                <div className="mt-3 space-y-2">
                  <input
                    type="email"
                    placeholder="seu.nome@aluno.ifal.edu.br"
                    className="h-9 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-[11px] text-white placeholder:text-white/35 focus:border-lime-300/50 focus:outline-none"
                  />
                  <Button variant="lime" size="sm" className="w-full justify-center">
                    Quero receber
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Canais oficiais</h2>
              <ul className="mt-3 space-y-2 text-[12px] text-ink-500">
                <li>
                  <a href="mailto:esportes@ifal.edu.br" className="hover:text-brand-700">
                    esportes@ifal.edu.br
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/ifaloficial/" target="_blank" rel="noreferrer" className="hover:text-brand-700">
                    Instagram do IFAL
                  </a>
                </li>
                <li>
                  <a href="https://www2.ifal.edu.br/campus/maceio" target="_blank" rel="noreferrer" className="hover:text-brand-700">
                    Portal do Campus Maceió
                  </a>
                </li>
              </ul>
            </Card>
          </aside>
        </div>
      ) : (
        <EmptyState
          className="mt-6"
          icon={Search}
          title="Nenhuma publicação encontrada"
          description="Tente outro termo ou selecione outra categoria."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setBusca('')
                setCategoria('Todas')
              }}
            >
              Limpar filtros
            </Button>
          }
        />
      )}

      <div className={cn('mt-10 rounded-2xl border border-ink-200 bg-white p-4 text-[12px] text-ink-500')}>
        <span className="font-semibold text-ink-700">Transparência:</span> comunicados oficiais são publicados pela
        coordenação de esportes e pelos representantes de atlética autorizados. Em caso de divergência, prevalece o
        documento original em PDF.
      </div>
    </div>
  )
}
