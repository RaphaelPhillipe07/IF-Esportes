import { Link, Outlet } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { brand } from '@/config/brand'
import { Logo, LogoMark } from '@/components/Brand'
import { asset } from '@/lib/assets'

const highlights = [
  'Catálogo completo de modalidades e horários',
  'Inscrição em turmas com controle de vagas',
  'Histórico esportivo, medalhas e frequência',
]

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.02fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-brand-950 text-white lg:flex lg:flex-col lg:justify-between">
        <img
          src={asset('/images/hero-track.jpg')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/60 via-brand-950/70 to-brand-950" />
        <div className="bg-dots absolute inset-0 opacity-40" />

        <div className="relative z-10 p-10">
          <Logo variant="light" asLink />
        </div>

        <div className="relative z-10 max-w-lg p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-300">Passaporte esportivo</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight">
            Seu histórico esportivo, do primeiro treino ao pódio.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">
            Um único acesso para encontrar modalidades, garantir sua vaga e acompanhar sua trajetória no esporte do
            campus.
          </p>
          <ul className="mt-7 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/75">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-300" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 p-10 text-[11px] text-white/40">
          <span>{brand.institution}</span>
          <span>Projeto Integrador · 2026.2</span>
        </div>
      </aside>

      <main className="flex min-h-screen flex-col bg-paper">
        <div className="flex items-center justify-between p-5 lg:hidden">
          <div className="flex items-center gap-2">
            <LogoMark className="h-9 w-9" />
            <span className="font-display text-base font-extrabold">{brand.name}</span>
          </div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-500 hover:text-brand-700">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

        <p className="px-6 pb-6 text-center text-[11px] text-ink-400">
          Ao continuar, você concorda com o tratamento de dados conforme a LGPD.
        </p>
      </main>
    </div>
  )
}
