import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ClipboardCheck,
  Clock,
  MapPin,
  Plus,
  Trophy,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { equipes, inscricoesRecentes, inscritosPorModalidade } from '@/data/mock'
import { BarChart } from '@/components/charts'
import { Badge, Button, ButtonLink, Card, PageHeader, StatCard } from '@/components/ui'
import { SportIcon } from '@/components/Brand'

export function PainelAtletica() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Atlética Águia"
        title="Painel da atlética"
        description="Gerencie equipes, vincule atletas, acompanhe torneios e homologue inscrições da sua atlética."
        actions={
          <>
            <Button variant="secondary" size="md" icon={UserPlus}>
              Convidar atleta
            </Button>
            <Button size="md" icon={Plus}>
              Novo torneio
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Users} label="Atletas vinculados" value={54} delta="+6" tone="green" hint="Atletas ativos na atlética" />
        <StatCard icon={Trophy} label="Equipes" value={equipes.length} hint="3 modalidades coletivas" tone="lime" />
        <StatCard icon={CalendarDays} label="Torneios ativos" value={2} hint="Jogos Internos e Copa das Atléticas" tone="amber" />
        <StatCard icon={ClipboardCheck} label="Inscrições pendentes" value={7} delta="+2" deltaTone="up" tone="blue" hint="Aguardando homologação" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-ink-100 p-5">
              <div>
                <p className="eyebrow">Homologação</p>
                <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Inscrições para revisar</h2>
              </div>
              <Badge tone="amber">7 pendentes</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50/60 text-[10px] uppercase tracking-wider text-ink-400">
                    <th className="px-5 py-2.5 font-semibold">Atleta</th>
                    <th className="px-3 py-2.5 font-semibold">Modalidade</th>
                    <th className="px-3 py-2.5 font-semibold">Turma</th>
                    <th className="px-3 py-2.5 font-semibold">Data</th>
                    <th className="px-5 py-2.5 text-right font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {inscricoesRecentes.map((inscricao) => (
                    <tr key={`${inscricao.atleta}-${inscricao.modalidade}`} className="border-b border-ink-100 last:border-0">
                      <td className="px-5 py-3">
                        <p className="text-[12px] font-medium text-ink-900">{inscricao.atleta}</p>
                      </td>
                      <td className="px-3 py-3 text-[12px] text-ink-500">{inscricao.modalidade}</td>
                      <td className="px-3 py-3 text-[12px] text-ink-500">{inscricao.turma}</td>
                      <td className="px-3 py-3 text-[11px] text-ink-400">{inscricao.data}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            aria-label={`Aprovar inscrição de ${inscricao.atleta}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100"
                          >
                            <Check className="h-4 w-4" aria-hidden />
                          </button>
                          <button
                            type="button"
                            aria-label={`Recusar inscrição de ${inscricao.atleta}`}
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
            <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3">
              <p className="text-[11px] text-ink-400">Últimas 5 de 7 solicitações</p>
              <Button variant="ghost" size="sm" iconRight={ArrowRight}>
                Ver todas
              </Button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Equipes</p>
                <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Minhas equipes</h2>
              </div>
              <ButtonLink to="/gestao/equipes" variant="secondary" size="sm" iconRight={ArrowRight}>
                Gerenciar
              </ButtonLink>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {equipes.map((equipe) => (
                <Link
                  key={equipe.id}
                  to="/gestao/equipes"
                  className="group rounded-xl border border-ink-200/80 p-3.5 transition-colors hover:border-brand-300 hover:bg-brand-50/30"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <SportIcon sport={equipe.sport} className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-semibold text-ink-900">{equipe.nome}</p>
                      <p className="text-[10px] text-ink-400">
                        {equipe.modalidade} · {equipe.genero}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-ink-400">{equipe.atletas} atletas</span>
                    <Badge tone={equipe.status.includes('Inscrita') ? 'green' : equipe.status.includes('formação') ? 'amber' : 'gray'}>
                      {equipe.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Participação</p>
                <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink-950">Atletas por modalidade</h2>
              </div>
              <Badge tone="outline">2026.2</Badge>
            </div>
            <BarChart data={inscritosPorModalidade.slice(0, 6)} className="mt-4" height={170} />
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative bg-brand-950 p-5 text-white">
              <div className="bg-dots absolute inset-0 opacity-25" />
              <div className="relative">
                <Badge tone="lime">Semifinal · 16 nov</Badge>
                <div className="mt-4 flex items-center justify-between gap-2 text-[13px] font-semibold">
                  <span className="truncate">Águia Futsal</span>
                  <span className="font-display text-sm text-white/40">x</span>
                  <span className="truncate text-right">Engenharia FC</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/50">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden /> 19h00
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden /> Ginásio
                  </span>
                </div>
                <ButtonLink
                  to="/gestao/torneios/jogos-internos-2026"
                  variant="lime"
                  size="sm"
                  className="mt-4 w-full justify-center"
                  iconRight={ArrowRight}
                >
                  Ver detalhes
                </ButtonLink>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Ações rápidas</h2>
            <div className="mt-3 space-y-1">
              {[
                { label: 'Vincular atleta a uma equipe', icon: UserPlus, to: '/gestao/equipes' },
                { label: 'Criar novo torneio', icon: Trophy, to: '/gestao/torneios/jogos-internos-2026' },
                { label: 'Homologar inscrições', icon: ClipboardCheck, to: '/gestao' },
                { label: 'Publicar comunicado', icon: Bell, to: '/noticias' },
              ].map((acao) => (
                <Link
                  key={acao.label}
                  to={acao.to}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[12px] font-medium text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <acao.icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="flex-1">{acao.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-ink-300" aria-hidden />
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-[15px] font-bold text-ink-950">Avisos</h2>
            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3">
                <p className="text-[11px] font-semibold text-amber-900">Prazo de inscrição</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-amber-800/80">
                  A Copa das Atléticas encerra as inscrições em 20/11. Confirme a lista de atletas da sua equipe.
                </p>
              </div>
              <div className="rounded-xl border border-ink-200 p-3">
                <p className="text-[11px] font-semibold text-ink-800">Reunião de representantes</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-ink-400">
                  Quinta-feira, 6/11, às 18h, na sala da coordenação de esportes.
                </p>
              </div>
            </div>
          </Card>

          <div className="rounded-2xl border border-dashed border-ink-200 bg-white/60 p-4">
            <p className="text-[11px] font-semibold text-ink-700">Permissões da atlética</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-400">
              Você pode gerenciar a página da atlética, cadastrar equipes, vincular atletas e organizar torneios sob sua
              responsabilidade (RN-05).
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
