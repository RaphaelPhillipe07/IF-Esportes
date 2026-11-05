import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import { ButtonLink, Card } from '@/components/ui'
import { Logo } from '@/components/Brand'

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <Card className="w-full max-w-lg p-8 text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <span className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Compass className="h-7 w-7" aria-hidden />
        </span>
        <p className="mt-4 font-display text-5xl font-extrabold tracking-tight text-ink-950">404</p>
        <h1 className="mt-2 font-display text-xl font-bold text-ink-900">Página não encontrada</h1>
        <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-ink-500">
          O endereço pode ter mudado ou a tela ainda não faz parte deste protótipo. Volte para o início ou explore a
          galeria de telas.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <ButtonLink to="/" size="md" icon={ArrowLeft}>
            Voltar ao início
          </ButtonLink>
          <ButtonLink to="/galeria" variant="secondary" size="md">
            Galeria de telas
          </ButtonLink>
        </div>
        <p className="mt-6 text-[11px] text-ink-400">
          Precisa de ajuda?{' '}
          <Link to="/noticias" className="font-semibold text-brand-700">
            Fale com a coordenação
          </Link>
        </p>
      </Card>
    </div>
  )
}
