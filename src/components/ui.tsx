import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Info,
  Minus,
  Search,
  X,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { initials } from '@/lib/format'

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'lime' | 'outlineLight' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-700 text-white shadow-sm hover:bg-brand-800 active:bg-brand-900',
  secondary: 'border border-ink-200 bg-white text-ink-800 hover:border-ink-300 hover:bg-ink-50',
  ghost: 'text-ink-700 hover:bg-ink-100',
  dark: 'bg-ink-950 text-white hover:bg-ink-900',
  lime: 'bg-lime-400 text-brand-950 shadow-sm hover:bg-lime-300',
  outlineLight: 'border border-white/25 text-white hover:bg-white/10',
  danger: 'bg-danger text-white hover:bg-red-700',
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 rounded-lg px-3 text-[13px]',
  md: 'h-11 gap-2 rounded-xl px-4 text-sm',
  lg: 'h-12 gap-2 rounded-xl px-5 text-[15px]',
}

export function buttonStyles(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    buttonVariants[variant],
    buttonSizes[size],
    className,
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  iconRight?: LucideIcon
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyles(variant, size, className)} {...props}>
      {Icon ? <Icon className={size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'} aria-hidden /> : null}
      {children}
      {IconRight ? <IconRight className={size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'} aria-hidden /> : null}
    </button>
  )
}

type ButtonLinkProps = {
  to: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  iconRight?: LucideIcon
  className?: string
  children: ReactNode
  target?: string
  rel?: string
}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  className,
  children,
  target,
  rel,
}: ButtonLinkProps) {
  return (
    <Link to={to} target={target} rel={rel} className={buttonStyles(variant, size, className)}>
      {Icon ? <Icon className={size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'} aria-hidden /> : null}
      {children}
      {IconRight ? <IconRight className={size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'} aria-hidden /> : null}
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* Badge / Chip                                                        */
/* ------------------------------------------------------------------ */

type BadgeTone = 'green' | 'lime' | 'gray' | 'amber' | 'red' | 'blue' | 'dark' | 'outline'

const badgeTones: Record<BadgeTone, string> = {
  green: 'bg-brand-50 text-brand-800 ring-1 ring-inset ring-brand-200',
  lime: 'bg-lime-400/20 text-brand-900 ring-1 ring-inset ring-lime-500/30',
  gray: 'bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200',
  amber: 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200',
  red: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
  blue: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
  dark: 'bg-ink-950 text-white',
  outline: 'border border-ink-200 bg-white text-ink-600',
}

export function Badge({
  tone = 'gray',
  dot = false,
  className,
  children,
}: {
  tone?: BadgeTone
  dot?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none',
        badgeTones[tone],
        className,
      )}
    >
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden /> : null}
      {children}
    </span>
  )
}

export function Chip({
  active,
  onClick,
  children,
  className,
}: {
  active?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium transition-colors',
        active
          ? 'border-brand-800 bg-brand-800 text-white'
          : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900',
        className,
      )}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Card / sections                                                     */
/* ------------------------------------------------------------------ */

export function Card({
  className,
  children,
  as: Tag = 'div',
}: {
  className?: string
  children: ReactNode
  as?: 'div' | 'section' | 'article' | 'aside'
}) {
  return <Tag className={cn('card-surface', className)}>{children}</Tag>
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
        <h2 className="text-balance text-2xl font-bold tracking-tight text-ink-950 md:text-3xl">{title}</h2>
        {description ? <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink-500">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  breadcrumb,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  breadcrumb?: ReactNode
  className?: string
}) {
  return (
    <header className={cn('mb-6', className)}>
      {breadcrumb ? <div className="mb-4">{breadcrumb}</div> : null}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
          <h1 className="text-balance text-[28px] font-bold leading-[1.1] tracking-tight text-ink-950 md:text-[34px]">
            {title}
          </h1>
          {description ? <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink-500">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  )
}

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-[12px] text-ink-400">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
          {index > 0 ? <span className="text-ink-300">/</span> : null}
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-brand-700">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-ink-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/* Form controls                                                       */
/* ------------------------------------------------------------------ */

export function Field({
  label,
  hint,
  error,
  children,
  className,
  htmlFor,
}: {
  label?: string
  hint?: string
  error?: string
  children: ReactNode
  className?: string
  htmlFor?: string
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label ? (
        <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-ink-800">
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="text-[12px] font-medium text-danger">{error}</p>
      ) : hint ? (
        <p className="text-[12px] text-ink-400">{hint}</p>
      ) : null}
    </div>
  )
}

const controlBase =
  'h-11 w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm text-ink-900 placeholder:text-ink-300 transition-colors hover:border-ink-300 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 disabled:bg-ink-50 disabled:text-ink-400'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
  icon?: LucideIcon
  trailing?: ReactNode
  wrapperClassName?: string
}

export function Input({ label, hint, error, icon: Icon, trailing, wrapperClassName, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name
  return (
    <Field label={label} hint={hint} error={error} htmlFor={inputId} className={wrapperClassName}>
      <div className="relative">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-300" aria-hidden />
        ) : null}
        <input
          id={inputId}
          className={cn(controlBase, Icon && 'pl-10', trailing && 'pr-10', className)}
          {...props}
        />
        {trailing ? <div className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</div> : null}
      </div>
    </Field>
  )
}

export function SearchInput({
  placeholder = 'Buscar...',
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-300" aria-hidden />
      <input className={cn(controlBase, 'pl-10 pr-9')} placeholder={placeholder} type="search" {...props} />
      <button
        type="button"
        aria-label="Limpar busca"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-300 hover:text-ink-600"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  )
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  hint?: string
  wrapperClassName?: string
}

export function Select({ label, hint, className, wrapperClassName, id, children, ...props }: SelectProps) {
  const selectId = id ?? props.name
  return (
    <Field label={label} hint={hint} htmlFor={selectId} className={wrapperClassName}>
      <div className="relative">
        <select id={selectId} className={cn(controlBase, 'cursor-pointer appearance-none pr-9', className)} {...props}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
      </div>
    </Field>
  )
}

/* ------------------------------------------------------------------ */
/* Tabs / progress / avatar                                            */
/* ------------------------------------------------------------------ */

export function Tabs({
  items,
  value,
  onChange,
  className,
  size = 'md',
}: {
  items: { value: string; label: string; count?: number }[]
  value: string
  onChange: (value: string) => void
  className?: string
  size?: 'sm' | 'md'
}) {
  return (
    <div
      role="tablist"
      className={cn('flex gap-1 overflow-x-auto border-b border-ink-200 hide-scrollbar', className)}
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              'relative whitespace-nowrap border-b-2 px-3 font-medium transition-colors',
              size === 'sm' ? 'pb-2.5 pt-1 text-[13px]' : 'pb-3 pt-1 text-sm',
              active
                ? 'border-brand-700 text-brand-800'
                : 'border-transparent text-ink-500 hover:border-ink-300 hover:text-ink-800',
            )}
          >
            {item.label}
            {typeof item.count === 'number' ? (
              <span
                className={cn(
                  'ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                  active ? 'bg-brand-100 text-brand-800' : 'bg-ink-100 text-ink-500',
                )}
              >
                {item.count}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

export function Progress({
  value,
  tone = 'brand',
  size = 'md',
  className,
  label,
}: {
  value: number
  tone?: 'brand' | 'lime' | 'amber' | 'red'
  size?: 'sm' | 'md'
  className?: string
  label?: string
}) {
  const tones = {
    brand: 'bg-brand-600',
    lime: 'bg-lime-500',
    amber: 'bg-amber-500',
    red: 'bg-danger',
  }
  return (
    <div className={className}>
      {label ? (
        <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-ink-500">
          <span>{label}</span>
          <span className="tabular">{Math.round(value)}%</span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn('w-full overflow-hidden rounded-full bg-ink-100', size === 'sm' ? 'h-1.5' : 'h-2')}
      >
        <div
          className={cn('h-full rounded-full transition-all', tones[tone])}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}

const avatarSizes = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-[11px]',
  md: 'h-11 w-11 text-xs',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-24 w-24 text-2xl',
}

export function Avatar({
  name,
  src,
  size = 'md',
  className,
}: {
  name: string
  src?: string
  size?: keyof typeof avatarSizes
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-800 font-display font-bold text-white ring-2 ring-white',
        avatarSizes[size],
        className,
      )}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : initials(name)}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Stats / alerts / empty state                                        */
/* ------------------------------------------------------------------ */

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  delta,
  deltaTone = 'up',
  tone = 'green',
  className,
}: {
  icon: LucideIcon
  label: string
  value: ReactNode
  hint?: string
  delta?: string
  deltaTone?: 'up' | 'down' | 'flat'
  tone?: 'green' | 'lime' | 'gray' | 'amber' | 'blue'
  className?: string
}) {
  const tones = {
    green: 'bg-brand-50 text-brand-700',
    lime: 'bg-lime-400/20 text-brand-800',
    gray: 'bg-ink-100 text-ink-600',
    amber: 'bg-amber-50 text-amber-700',
    blue: 'bg-blue-50 text-blue-700',
  }
  const DeltaIcon = deltaTone === 'up' ? ArrowUpRight : deltaTone === 'down' ? ArrowDownRight : Minus
  return (
    <div className={cn('card-surface p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', tones[tone])}>
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        {delta ? (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-semibold',
              deltaTone === 'up' && 'bg-brand-50 text-brand-700',
              deltaTone === 'down' && 'bg-red-50 text-red-600',
              deltaTone === 'flat' && 'bg-ink-100 text-ink-500',
            )}
          >
            <DeltaIcon className="h-3 w-3" aria-hidden />
            {delta}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-[12px] font-medium text-ink-500">{label}</p>
      <p className="mt-0.5 font-display text-[26px] font-bold leading-none tracking-tight text-ink-950 tabular">{value}</p>
      {hint ? <p className="mt-2 text-[11px] leading-snug text-ink-400">{hint}</p> : null}
    </div>
  )
}

const alertTones = {
  info: 'border-blue-200 bg-blue-50/70 text-blue-900',
  success: 'border-brand-200 bg-brand-50/70 text-brand-900',
  warning: 'border-amber-200 bg-amber-50/70 text-amber-900',
  danger: 'border-red-200 bg-red-50/70 text-red-900',
}

export function Alert({
  tone = 'info',
  title,
  children,
  icon,
  className,
}: {
  tone?: keyof typeof alertTones
  title?: string
  children?: ReactNode
  icon?: LucideIcon
  className?: string
}) {
  const Icon = icon ?? (tone === 'success' ? CheckCircle2 : tone === 'warning' || tone === 'danger' ? AlertTriangle : Info)
  return (
    <div className={cn('flex gap-3 rounded-xl border px-4 py-3', alertTones[tone], className)}>
      <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden />
      <div className="text-[13px] leading-relaxed">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children ? <div className={cn(title && 'mt-0.5 opacity-90')}>{children}</div> : null}
      </div>
    </div>
  )
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50/40 px-6 py-12 text-center', className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ink-400 shadow-sm">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <p className="mt-4 font-display text-base font-semibold text-ink-900">{title}</p>
      {description ? <p className="mt-1 max-w-sm text-sm text-ink-500">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Table helpers                                                       */
/* ------------------------------------------------------------------ */

export function TableWrap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('card-surface overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">{children}</table>
      </div>
    </div>
  )
}

export function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <th className={cn('whitespace-nowrap border-b border-ink-200 bg-ink-50/60 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-500', className)}>
      {children}
    </th>
  )
}

export function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return <td className={cn('border-b border-ink-100 px-4 py-3 align-middle text-[13px] text-ink-700', className)}>{children}</td>
}

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export function Switch({
  checked,
  onChange,
  label,
  id,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  id?: string
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
          checked ? 'bg-brand-600' : 'bg-ink-200',
        )}
      >
        <span
          className={cn(
            'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-[18px]' : 'translate-x-0',
          )}
        />
      </button>
      <span className="text-[13px] font-medium text-ink-700">{label}</span>
    </label>
  )
}

export function IconButton({
  icon: Icon,
  label,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: LucideIcon; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900',
        className,
      )}
      {...props}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden />
    </button>
  )
}
