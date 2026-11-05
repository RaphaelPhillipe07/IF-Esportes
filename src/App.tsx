import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { AppShell } from '@/layouts/AppShell'
import { Home } from '@/screens/public/Home'
import { Modalidades } from '@/screens/public/Modalidades'
import { ModalidadeDetalhe } from '@/screens/public/ModalidadeDetalhe'
import { Inscricao } from '@/screens/public/Inscricao'
import { Torneios } from '@/screens/public/Torneios'
import { TorneioDetalhe } from '@/screens/public/TorneioDetalhe'
import { Noticias } from '@/screens/public/Noticias'
import { Entrar } from '@/screens/public/Entrar'
import { Verificar } from '@/screens/public/Verificar'
import { DashboardAluno } from '@/screens/app/DashboardAluno'
import { MinhasInscricoes } from '@/screens/app/MinhasInscricoes'
import { Passaporte } from '@/screens/app/Passaporte'
import { PainelAtletica } from '@/screens/gestao/PainelAtletica'
import { Equipes } from '@/screens/gestao/Equipes'
import { GestaoTorneio } from '@/screens/gestao/GestaoTorneio'
import { PainelAdmin } from '@/screens/admin/PainelAdmin'
import { ModalidadesAdmin } from '@/screens/admin/ModalidadesAdmin'
import { Relatorios } from '@/screens/admin/Relatorios'
import { Galeria } from '@/screens/Galeria'
import { NotFound } from '@/screens/NotFound'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    const frame = requestAnimationFrame(() => window.scrollTo(0, 0))
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

function PrototypeBadge() {
  const location = useLocation()
  const isCapture = new URLSearchParams(location.search).get('capture') === '1'

  if (location.pathname === '/galeria' || isCapture) return null

  return (
    <Link
      to="/galeria"
      className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-brand-950/95 px-3.5 py-2 text-[11px] font-semibold text-white shadow-float backdrop-blur transition-colors hover:bg-brand-900 lg:bottom-6 lg:right-6"
    >
      Galeria de telas
      <ArrowUpRight className="h-3.5 w-3.5 text-lime-300" aria-hidden />
    </Link>
  )
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="modalidades" element={<Modalidades />} />
          <Route path="modalidades/:slug" element={<ModalidadeDetalhe />} />
          <Route path="modalidades/:slug/inscricao" element={<Inscricao />} />
          <Route path="torneios" element={<Torneios />} />
          <Route path="torneios/:slug" element={<TorneioDetalhe />} />
          <Route path="noticias" element={<Noticias />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="entrar" element={<Entrar />} />
          <Route path="verificar" element={<Verificar />} />
        </Route>

        <Route element={<AppShell role="aluno" />}>
          <Route path="app" element={<DashboardAluno />} />
          <Route path="app/inscricoes" element={<MinhasInscricoes />} />
          <Route path="app/atleta" element={<Passaporte />} />
        </Route>

        <Route element={<AppShell role="atletica" />}>
          <Route path="gestao" element={<PainelAtletica />} />
          <Route path="gestao/equipes" element={<Equipes />} />
          <Route path="gestao/torneios/:slug" element={<GestaoTorneio />} />
        </Route>

        <Route element={<AppShell role="admin" />}>
          <Route path="admin" element={<PainelAdmin />} />
          <Route path="admin/modalidades" element={<ModalidadesAdmin />} />
          <Route path="admin/relatorios" element={<Relatorios />} />
        </Route>

        <Route path="galeria" element={<Galeria />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <PrototypeBadge />
    </BrowserRouter>
  )
}
