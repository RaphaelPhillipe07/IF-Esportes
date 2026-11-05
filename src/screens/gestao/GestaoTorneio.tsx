import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ClipboardCheck,
  Clock,
  FileText,
  MapPin,
  Settings2,
  ShieldCheck,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import { chaveFutsal, equipes, torneios } from '@/data/mock'
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Input,
  PageHeader,
  Select,
  Switch,
  Tabs,
} from '@/components/ui'
import { Bracket } from '@/components/Bracket'
import { StatusBadge } from '@/components/cards'
import { NotFound } from '../NotFound'

const abas = [
  { value: 'chaves', label: 'Chaves' },
  { value: 'partidas', label: 'Partidas' },
  { value: 'inscricoes', label: 'Inscrições' },
  { value: 'config', label: 'Configurações' },
]

export function GestaoTorneio() {
  const { slug } = useParams()
  const [aba, setAba] = useState('chaves')
  const [homologar, setHomologar] = useState(true)
  const [publicarChaves, setPublicarChaves] = useState(true)
  const [inscricoesAbertas, setInscricoesAbertas] = useState(false)
  const torneio = torneios.find((item) => item.slug === slug) ?? torneios[0]

  if (!torneio) return <NotFound />

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Painel da atlética', to: '/gestao' },
          { label: 'Torneios', to: '/gestao' },
          { label: torneio.nome },
        ]}
      />

      <PageHeader
        eyebrow="Gestão de torneios"
        title={torneio.nome}
        description="Gerencie chaves, lance resultados e controle as inscrições das equipes da atlética."
        actions={
          <>
            <Button variant="secondary" size="md" icon={Settings2}>
              Editar torneio
            </Button>
            <Button size="md" icon={ClipboardCheck}>
              Publicar resultados
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-3">
        <StatusBadge status={torneio.status} />
        <span className="text-[11px] text-ink-400">{torneio.periodo}</span>
        <span className="hidden h-4 w-px bg-ink-200 sm:block" />
        <span className="inline-flex items-center gap-1 text-[11px] text-ink-500">
          <MapPin className="h-3 w-3" aria-hidden /> {torneio.local}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-ink-500">
          <Users className="h-3 w-3" aria-hidden /> {torneio.equipes} equipes
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-ink-500">
          <Trophy className="h-3 w-3" aria-hidden /> {torneio.jogos} jogos
        </span>
        <span className="ml-auto text-[11px] text-ink-400">Organização: {torneio.organizador}</span>
      </div>

      <Tabs items={abas} value={aba} onChange={setAba} />

      {aba === 'chaves' ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Futsal · eliminatórias</p>
                  <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Chave do torneio</h2>
                </div>
                <Badge tone="green">Publicada</Badge>
              </div>
              <Bracket rounds={chaveFutsal} className="mt-5" />
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Mesa</p>
                  <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Lançar resultado</h2>
                </div>
                <Badge tone="outline">Jogo 12</Badge>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Select label="Partida" defaultValue="sf-2" className="sm:col-span-2">
                  <option value="sf-2">Semifinal 2 · Atlética Águia x Atlética Coruja</option>
                  <option value="sf-1">Semifinal 1 · Águia Futsal x Engenharia FC</option>
                  <option value="fn-1">Final · Águia Futsal x A definir</option>
                </Select>
                <Input label="Placar · Atlética Águia" defaultValue="2" inputMode="numeric" />
                <Input label="Placar · Atlética Coruja" defaultValue="2" inputMode="numeric" />
                <Input label="Data e horário" defaultValue="16/11/2026 · 20h00" className="sm:col-span-2" />
              </div>

              <label className="mt-4 flex items-start gap-2.5 text-[11px] leading-relaxed text-ink-500">
                <input
                  type="checkbox"
                  checked={homologar}
                  onChange={(event) => setHomologar(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-700 focus:ring-brand-500"
                />
                Homologar resultado agora. Após a homologação, alterações exigem justificativa e ficam registradas na
                auditoria (RN-03).
              </label>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="md" icon={Check}>
                  Salvar resultado
                </Button>
                <Button variant="secondary" size="md">
                  Salvar rascunho
                </Button>
              </div>
            </Card>
          </div>

          <aside className="space-y-4">
            <Card className="p-5">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Resumo</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: 'Equipes', value: torneio.equipes },
                  { label: 'Jogos', value: torneio.jogos },
                  { label: 'Atletas', value: torneio.atletas },
                  { label: 'Pendências', value: 3 },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-ink-50/70 p-3">
                    <p className="font-display text-lg font-bold text-ink-950 tabular">{item.value}</p>
                    <p className="text-[10px] text-ink-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Alert tone="warning" icon={AlertTriangle} title="Resultados homologados">
              Resultados publicados não podem ser editados sem justificativa registrada no log de auditoria (RN-03).
              Revise o placar antes de homologar.
            </Alert>

            <Card className="p-5">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Documentos</h2>
              <div className="mt-3 space-y-2">
                {['Regulamento do torneio', 'Tabela de jogos', 'Súmulas'].map((documento) => (
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
          </aside>
        </div>
      ) : null}

      {aba === 'partidas' ? (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink-100 p-5">
            <div>
              <p className="eyebrow">Futsal</p>
              <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Todas as partidas</h2>
            </div>
            <Badge tone="outline">{torneio.jogos} jogos</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50/60 text-[10px] uppercase tracking-wider text-ink-400">
                  <th className="px-5 py-2.5 font-semibold">Fase</th>
                  <th className="px-3 py-2.5 font-semibold">Confronto</th>
                  <th className="px-3 py-2.5 font-semibold">Data</th>
                  <th className="px-3 py-2.5 font-semibold">Status</th>
                  <th className="px-5 py-2.5 text-right font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {chaveFutsal.flatMap((round) =>
                  round.partidas.map((partida) => (
                    <tr key={partida.id} className="border-b border-ink-100 last:border-0">
                      <td className="px-5 py-3 text-[11px] text-ink-400">{round.nome}</td>
                      <td className="px-3 py-3 text-[12px] font-medium text-ink-900">
                        {partida.timeA} <span className="text-ink-300">x</span> {partida.timeB}
                      </td>
                      <td className="px-3 py-3 text-[11px] text-ink-500">{partida.horario ?? 'A definir'}</td>
                      <td className="px-3 py-3">
                        <StatusBadge
                          status={partida.status === 'homologado' ? 'encerrado' : partida.status === 'em-andamento' ? 'andamento' : 'aberta'}
                        />
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button type="button" className="text-[11px] font-semibold text-brand-700 hover:text-brand-900">
                          Lançar resultado
                        </button>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {aba === 'inscricoes' ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-ink-100 p-5">
              <div>
                <p className="eyebrow">Equipes</p>
                <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Inscrições recebidas</h2>
              </div>
              <Badge tone="amber">2 pendentes</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50/60 text-[10px] uppercase tracking-wider text-ink-400">
                    <th className="px-5 py-2.5 font-semibold">Equipe</th>
                    <th className="px-3 py-2.5 font-semibold">Modalidade</th>
                    <th className="px-3 py-2.5 font-semibold">Atletas</th>
                    <th className="px-3 py-2.5 font-semibold">Status</th>
                    <th className="px-5 py-2.5 text-right font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {equipes.map((equipe) => (
                    <tr key={equipe.id} className="border-b border-ink-100 last:border-0">
                      <td className="px-5 py-3 text-[12px] font-medium text-ink-900">{equipe.nome}</td>
                      <td className="px-3 py-3 text-[12px] text-ink-500">
                        {equipe.modalidade} · {equipe.genero}
                      </td>
                      <td className="px-3 py-3 text-[12px] text-ink-500 tabular">{equipe.atletas}</td>
                      <td className="px-3 py-3">
                        <Badge tone={equipe.status.includes('Inscrita') ? 'green' : 'amber'}>{equipe.status}</Badge>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            aria-label={`Aprovar ${equipe.nome}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100"
                          >
                            <Check className="h-4 w-4" aria-hidden />
                          </button>
                          <button
                            type="button"
                            aria-label={`Recusar ${equipe.nome}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-red-50 hover:text-danger"
                          >
                            <X className="h-4 w-4" aria-hidden />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Checklist de inscrição</h2>
            <ul className="mt-3 space-y-2.5 text-[11px] leading-relaxed text-ink-500">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 text-brand-600" aria-hidden /> Vínculo institucional dos
                atletas validado.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 text-brand-600" aria-hidden /> Lista de atletas com no mínimo
                8 e no máximo 14 integrantes.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 text-brand-600" aria-hidden /> Termo de inscrição assinado
                pelo representante.
              </li>
            </ul>
            <Button variant="secondary" size="sm" className="mt-4 w-full justify-center">
              Baixar checklist
            </Button>
          </Card>
        </div>
      ) : null}

      {aba === 'config' ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <Card className="p-5">
            <h2 className="font-display text-lg font-bold tracking-tight text-ink-950">Configurações do torneio</h2>
            <p className="mt-1 text-[12px] text-ink-500">
              Alterações nesta tela são registradas no histórico do torneio.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Input label="Nome do torneio" defaultValue={torneio.nome} className="sm:col-span-2" />
              <Input label="Data de início" type="date" defaultValue={torneio.inicio} />
              <Input label="Data de término" type="date" defaultValue={torneio.fim} />
              <Input label="Local" defaultValue={torneio.local} className="sm:col-span-2" />
              <Select label="Formato" defaultValue={torneio.formato} className="sm:col-span-2">
                <option>{torneio.formato}</option>
                <option>Pontos corridos</option>
                <option>Eliminatória simples</option>
                <option>Grupos + eliminatórias</option>
              </Select>
            </div>

            <div className="mt-5 space-y-3 border-t border-ink-100 pt-4">
              <Switch checked={publicarChaves} onChange={setPublicarChaves} label="Publicar chaves publicamente" />
              <Switch checked={inscricoesAbertas} onChange={setInscricoesAbertas} label="Permitir novas inscrições" />
            </div>

            <div className="mt-5 flex gap-2">
              <Button size="md">Salvar alterações</Button>
              <Button variant="secondary" size="md">
                Cancelar
              </Button>
            </div>
          </Card>

          <aside className="space-y-4">
            <Alert tone="info" icon={Clock} title="Histórico de alterações">
              Todas as mudanças de configuração são registradas com usuário, data e IP para fins de auditoria.
            </Alert>
            <Card className="p-5">
              <h2 className="font-display text-[15px] font-bold text-ink-950">Últimas alterações</h2>
              <div className="mt-3 space-y-3 text-[11px]">
                {[
                  { data: '04/11 · 09:42', texto: 'Resultado da semifinal 1 homologado' },
                  { data: '03/11 · 18:10', texto: 'Chave publicada para a comunidade' },
                  { data: '02/11 · 14:05', texto: 'Torneio criado pela Atlética Águia' },
                ].map((item) => (
                  <div key={item.data}>
                    <p className="font-medium text-ink-700">{item.texto}</p>
                    <p className="text-[10px] text-ink-400">{item.data} · Thomas Pinheiro</p>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      ) : null}
    </div>
  )
}
