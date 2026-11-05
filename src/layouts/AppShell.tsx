import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronRight,
  HelpCircle,
  IdCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  ScrollText,
  Search,
  Ticket,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import { brand } from '@/config/brand'
import { atleta } from '@/data/mock'
import { cn } from '@/lib/cn'
import { Avatar, Badge } from '@/components/ui'
import { Logo } from '@/components/Brand'

export type Role = 'aluno' | 'atletica' | 'admin'

const roleMeta: Record<
  Role,
  {
    label: string
    name: string
    sub: string
    badge: string
    tone: 'green' | 'lime' | 'dark'
  }
> = {
  aluno: {
    label: 'Aluno-atleta',
    name: atleta.nome,
    sub: `${atleta.matricula} · ${atleta.periodo}`,
    badge: 'Aluno',
    tone: 'green',
  },
  atletica: {
    label: 'Atlética Águia',
    name: 'Thomas Pinheiro',
    sub: 'Representante da atlética',
    badge: 'Atlética',
    tone: 'lime',
  },
  admin: {
    label: 'Coordenação de Esportes',
    name: 'Carlos Roque',
    sub: 'Perfil administrativo',
    badge: 'Admin',
    tone: 'dark',
  },
}

const navByRole: Record<Role, { label: string; to: string; icon: typeof LayoutDashboard; end?: boolean }[]> = {
  aluno: [
    { label: 'Visão geral', to: '/app', icon: LayoutDashboard, end: true },
    { label: 'Modalidades', to: '/modalidades', icon: Trophy },
    { label: 'Minhas inscrições', to: '/app/inscricoes', icon: Ticket },
    { label: 'Passaporte', to: '/app/atleta', icon: IdCard },
    { label: 'Notícias e editais', to: '/noticias', icon: Newspaper },
  ],
  atletica: [
    { label: 'Painel da atlética', to: '/gestao', icon: LayoutDashboard, end: true },
    { label: 'Equipes e atletas', to: '/gestao/equipes', icon: Users },
    { label: 'Torneios', to: '/gestao/torneios/jogos-internos-2026', icon: Trophy },
    { label: 'Notícias e editais', to: '/noticias', icon: Newspaper },
  ],
  admin: [
    { label: 'Visão geral', to: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Modalidades e turmas', to: '/admin/modalidades', icon: Trophy },
    { label: 'Relatórios', to: '/admin/relatorios', icon: BarChart3 },
    { label: 'Auditoria', to: '/admin/relatorios', icon: ScrollText },
  ],
}

export function AppShell({ role }: { role: Role }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const meta = roleMeta[role]
  const nav = navByRole[role]
  const current = nav.find((item) => (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)))
  const pageTitle = current?.label ?? meta.label

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col border-r border-ink-200/80 bg-white lg:flex">
        <SidebarContent role={role} meta={meta} nav={nav} />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
          />
          <aside className="absolute inset-y-0 left-0 flex w-[286px] flex-col bg-white shadow-float">
            <div className="flex items-center justify-between border-b border-ink-100 p-4">
              <Logo asLink />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <SidebarContent role={role} meta={meta} nav={nav} />
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-ink-200/80 bg-paper/90 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 md:px-8">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-600 hover:bg-ink-100 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>

            <div className="flex min-w-0 items-center gap-2">
              <span className="hidden text-[11px] font-medium text-ink-400 sm:inline">{meta.label}</span>
              <ChevronRight className="hidden h-3 w-3 text-ink-300 sm:block" aria-hidden />
              <h1 className="truncate font-display text-[15px] font-semibold text-ink-900">{pageTitle}</h1>
            </div>

            <div className="ml-auto flex items-center gap-1">
              <Link
                to="/modalidades"
                aria-label="Buscar modalidades"
                className="inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-[13px] text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                <Search className="h-[18px] w-[18px]" aria-hidden />
                <span className="hidden xl:inline">Buscar</span>
              </Link>
              <button
                type="button"
                aria-label="Notificações"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                <Bell className="h-[18px] w-[18px]" aria-hidden />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-lime-500 ring-2 ring-paper" />
              </button>
              <div className="mx-1 hidden h-6 w-px bg-ink-200 sm:block" />
              <div className="flex items-center gap-2 rounded-xl px-1.5 py-1">
                <Avatar name={meta.name} size="sm" />
                <div className="hidden text-left sm:block">
                  <p className="text-[12px] font-semibold leading-tight text-ink-900">{meta.name}</p>
                  <p className="text-[10px] leading-tight text-ink-400">{meta.sub}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 pb-24 md:px-8 md:py-8 lg:pb-10">
          <Outlet />
        </main>
      </div>

      <nav
        aria-label="Navegação rápida"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <div className="flex items-stretch justify-around">
          {nav.slice(0, 4).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
                  isActive ? 'text-brand-800' : 'text-ink-400',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'flex h-7 w-10 items-center justify-center rounded-full transition-colors',
                      isActive ? 'bg-brand-50' : 'bg-transparent',
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <span className="max-w-[72px] truncate">{item.label.split(' ')[0]}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

function SidebarContent({
  role,
  meta,
  nav,
}: {
  role: Role
  meta: (typeof roleMeta)[Role]
  nav: { label: string; to: string; icon: typeof LayoutDashboard; end?: boolean }[]
}) {
  return (
    <>
      <div className="flex h-16 items-center border-b border-ink-100 px-5">
        <Logo asLink />
      </div>

      <div className="px-4 pt-5">
        <div className="rounded-xl border border-ink-200/80 bg-ink-50/60 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-semibold text-ink-800">{meta.label}</p>
            <Badge tone={meta.tone}>{meta.badge}</Badge>
          </div>
          <p className="mt-1 truncate text-[10px] text-ink-400">{meta.sub}</p>
        </div>
      </div>

      <nav aria-label="Navegação da área" className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {nav.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 text-brand-800'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn('h-[18px] w-[18px] shrink-0', isActive ? 'text-brand-700' : 'text-ink-400 group-hover:text-ink-600')}
                  aria-hidden
                />
                <span className="flex-1">{item.label}</span>
                {isActive ? <span className="h-1.5 w-1.5 rounded-full bg-brand-600" /> : null}
              </>
            )}
          </NavLink>
        ))}

        <div className="mt-4 border-t border-ink-100 pt-4">
          <Link
            to={role === 'aluno' ? '/modalidades' : role === 'atletica' ? '/gestao/equipes' : '/admin/modalidades'}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-900"
          >
            <ArrowUpRight className="h-[18px] w-[18px] text-ink-400" aria-hidden />
            <span className="flex-1">Explorar plataforma</span>
          </Link>
        </div>
      </nav>

      <div className="border-t border-ink-100 p-4">
        <div className="rounded-xl bg-brand-50 p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-900">
            <HelpCircle className="h-3.5 w-3.5" aria-hidden /> Precisa de ajuda?
          </p>
          <p className="mt-1 text-[10px] leading-relaxed text-brand-800/70">
            Fale com a coordenação de esportes do campus.
          </p>
          <a
            href={`mailto:${brand.supportEmail}`}
            className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-brand-700 hover:text-brand-900"
          >
            Enviar e-mail <ArrowUpRight className="h-3 w-3" aria-hidden />
          </a>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl px-1 py-1">
          <Avatar name={meta.name} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-ink-900">{meta.name}</p>
            <p className="truncate text-[10px] text-ink-400">{meta.label}</p>
          </div>
          <Link
            to="/"
            aria-label="Sair da área"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700"
          >
            <LogOut className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </>
  )
}
