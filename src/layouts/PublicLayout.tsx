import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Search,
  X,
  Youtube,
} from 'lucide-react'
import { brand } from '@/config/brand'
import { cn } from '@/lib/cn'
import { ButtonLink } from '@/components/ui'
import { Logo, LogoMark } from '@/components/Brand'

const navItems = [
  { label: 'Início', to: '/' },
  { label: 'Modalidades', to: '/modalidades' },
  { label: 'Torneios', to: '/torneios' },
  { label: 'Notícias', to: '/noticias' },
]

export function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <div className="bg-brand-950 text-white">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-[11px]">
          <p className="truncate">
            <span className="font-semibold text-lime-300">Inscrições abertas:</span>{' '}
            <span className="text-white/80">Copa das Atléticas até 20 de novembro</span>
          </p>
          <Link
            to="/torneios/copa-das-atleticas-2026"
            className="hidden shrink-0 items-center gap-1 font-semibold text-white/80 transition-colors hover:text-lime-300 sm:inline-flex"
          >
            Ver edital <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-paper/90 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Logo asLink />

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors',
                    isActive ? 'text-brand-800' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive ? <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-brand-700" /> : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-1.5 lg:flex">
            <Link
              to="/modalidades"
              aria-label="Buscar modalidades"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden />
            </Link>
            <ButtonLink to="/entrar" variant="ghost" size="sm">
              Entrar
            </ButtonLink>
            <ButtonLink to="/entrar?tab=cadastro" size="sm">
              Criar conta
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-700 hover:bg-ink-100 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>

        {menuOpen ? (
          <div id="menu-mobile" className="border-t border-ink-200 bg-white px-5 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <ButtonLink to="/entrar" variant="secondary" size="sm">
                Entrar
              </ButtonLink>
              <ButtonLink to="/entrar?tab=cadastro" size="sm">
                Criar conta
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </header>

      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-20 bg-brand-950 text-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-10 w-10" />
              <div>
                <p className="font-display text-lg font-extrabold leading-none">{brand.name}</p>
                <p className="mt-1 text-[11px] text-white/50">{brand.institution}</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/60">{brand.tagline}</p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={`mailto:${brand.supportEmail}`}
                aria-label="Enviar e-mail para a coordenação"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-lime-300/40 hover:text-lime-300"
              >
                <Mail className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="https://www.instagram.com/ifaloficial/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram do IFAL"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-lime-300/40 hover:text-lime-300"
              >
                <Instagram className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="https://www.youtube.com/@ifaloficial"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube do IFAL"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-lime-300/40 hover:text-lime-300"
              >
                <Youtube className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          <FooterColumn
            title="Plataforma"
            links={[
              { label: 'Modalidades', to: '/modalidades' },
              { label: 'Torneios e eventos', to: '/torneios' },
              { label: 'Notícias e editais', to: '/noticias' },
              { label: 'Passaporte esportivo', to: '/app/atleta' },
            ]}
          />
          <FooterColumn
            title="Para atléticas"
            links={[
              { label: 'Painel da atlética', to: '/gestao' },
              { label: 'Equipes e atletas', to: '/gestao/equipes' },
              { label: 'Gestão de torneios', to: '/gestao/torneios/jogos-internos-2026' },
              { label: 'Central de ajuda', to: '/noticias' },
            ]}
          />
          <FooterColumn
            title="Institucional"
            links={[
              { label: 'IFAL Campus Maceió', to: 'https://www2.ifal.edu.br/campus/maceio' },
              { label: 'Coordenação de Esportes', to: `mailto:${brand.supportEmail}` },
              { label: 'Projeto Integrador', to: '/galeria' },
              { label: 'Colaboradores do projeto', to: brand.githubUrl },
              { label: 'Acessibilidade', to: '/noticias' },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {brand.name}. Projeto acadêmico do curso de Sistemas de Informação do IFAL Campus Maceió.</p>
          <p className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Maceió, Alagoas · Brasil
            <Link to="/galeria" className="ml-2 inline-flex items-center gap-1 text-white/60 hover:text-lime-300">
              Galeria do protótipo <ArrowUpRight className="h-3 w-3" aria-hidden />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.to.startsWith('http') || link.to.startsWith('mailto') ? (
              <a
                href={link.to}
                target={link.to.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="text-[13px] text-white/65 transition-colors hover:text-lime-300"
              >
                {link.label}
              </a>
            ) : (
              <Link to={link.to} className="text-[13px] text-white/65 transition-colors hover:text-lime-300">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
