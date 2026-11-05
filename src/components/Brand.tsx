import type { ComponentType, SVGProps } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  CircleDot,
  Crown,
  Goal,
  Hand,
  Sun,
  Swords,
  Timer,
  Trophy,
  Volleyball,
  Waves,
} from 'lucide-react'
import { brand } from '@/config/brand'
import type { SportKey } from '@/data/types'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'

export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 36 36" className={cn('h-9 w-9', className)} role="img" aria-label={brand.name} {...props}>
      <rect width="36" height="36" rx="10" fill="#0A4B2C" />
      <path d="M10 10.5h3.8v15H10z" fill="#FFFFFF" />
      <path d="M17.2 10.5H26v3.3h-5v3h4.2v3.3H21v5.4h-3.8z" fill="#FFFFFF" />
      <circle cx="28.6" cy="9.4" r="2.4" fill="#C6F135" />
    </svg>
  )
}

export function Logo({
  variant = 'default',
  compact = false,
  asLink = false,
  className,
}: {
  variant?: 'default' | 'light'
  compact?: boolean
  asLink?: boolean
  className?: string
}) {
  const [first, ...rest] = brand.name.split(' ')
  const content = (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="h-9 w-9 shrink-0" />
      {!compact ? (
        <span className="font-display text-[19px] font-extrabold leading-none tracking-tight">
          <span className={variant === 'light' ? 'text-white' : 'text-brand-800'}>{first}</span>
          {rest.length ? (
            <span className={variant === 'light' ? 'text-white/90' : 'text-ink-950'}> {rest.join(' ')}</span>
          ) : null}
        </span>
      ) : null}
    </span>
  )

  if (asLink) {
    return (
      <Link to="/" aria-label={`${brand.name} — página inicial`} className="inline-flex rounded-lg">
        {content}
      </Link>
    )
  }
  return content
}

export const sportIcons: Record<SportKey, LucideIcon> = {
  natacao: Waves,
  futsal: Goal,
  volei: Volleyball,
  basquete: CircleDot,
  atletismo: Timer,
  judo: Swords,
  xadrez: Crown,
  handebol: Hand,
  praia: Sun,
}

export const sportLabels: Record<SportKey, string> = {
  natacao: 'Natação',
  futsal: 'Futsal',
  volei: 'Voleibol',
  basquete: 'Basquete',
  atletismo: 'Atletismo',
  judo: 'Judô',
  xadrez: 'Xadrez',
  handebol: 'Handebol',
  praia: 'Vôlei de Praia',
}

export const sportGradients: Record<SportKey, string> = {
  natacao: 'from-cyan-700 via-brand-800 to-brand-950',
  futsal: 'from-brand-700 via-brand-800 to-brand-950',
  volei: 'from-teal-700 via-brand-800 to-brand-950',
  basquete: 'from-amber-700 via-brand-800 to-brand-950',
  atletismo: 'from-orange-700 via-brand-800 to-brand-950',
  judo: 'from-slate-700 via-brand-800 to-brand-950',
  xadrez: 'from-violet-800 via-brand-800 to-brand-950',
  handebol: 'from-blue-700 via-brand-800 to-brand-950',
  praia: 'from-sky-700 via-brand-800 to-brand-950',
}

export function SportIcon({
  sport,
  className,
}: {
  sport: SportKey
  className?: string
}) {
  const Icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }> = sportIcons[sport]
  return <Icon className={className} aria-hidden />
}

export function SportArt({
  sport,
  image,
  className,
  overlayClassName,
  children,
}: {
  sport: SportKey
  image?: string
  className?: string
  overlayClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('relative overflow-hidden bg-brand-900', className)}>
      {image ? (
        <img src={asset(image)} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : null}
      <div
        className={cn(
          'absolute inset-0',
          image
            ? 'bg-gradient-to-t from-brand-950/95 via-brand-950/45 to-brand-950/5'
            : cn('bg-gradient-to-br', sportGradients[sport]),
        )}
      />
      <div className={cn('relative z-10', overlayClassName)}>{children}</div>
    </div>
  )
}

export function TrophyMark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-brand-950', className)}>
      <Trophy className="h-5 w-5" aria-hidden />
    </span>
  )
}
