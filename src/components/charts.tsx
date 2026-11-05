import { useId } from 'react'
import { cn } from '@/lib/cn'

export function BarChart({
  data,
  height = 190,
  className,
  highlightIndex,
}: {
  data: { label: string; value: number }[]
  height?: number
  className?: string
  highlightIndex?: number
}) {
  const max = Math.max(...data.map((item) => item.value), 1)
  return (
    <div className={cn('w-full', className)}>
      <div className="relative flex items-end gap-2" style={{ height }}>
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((line) => (
            <div key={line} className="border-t border-dashed border-ink-100" />
          ))}
        </div>
        {data.map((item, index) => {
          const isHighlight = highlightIndex === index
          return (
            <div key={item.label} className="group relative flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-[10px] font-semibold text-ink-500 tabular opacity-0 transition-opacity group-hover:opacity-100">
                {item.value}
              </span>
              <div
                className={cn(
                  'w-full rounded-t-md transition-colors',
                  isHighlight ? 'bg-lime-500' : 'bg-brand-600 group-hover:bg-brand-500',
                )}
                style={{ height: `${Math.max(4, (item.value / max) * 100)}%` }}
                title={`${item.label}: ${item.value}`}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex gap-2">
        {data.map((item, index) => (
          <span
            key={item.label}
            className={cn(
              'flex-1 truncate text-center text-[10px] leading-tight',
              highlightIndex === index ? 'font-semibold text-ink-800' : 'text-ink-400',
            )}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function LineChart({
  data,
  height = 170,
  className,
  tone = 'brand',
}: {
  data: { label: string; value: number }[]
  height?: number
  className?: string
  tone?: 'brand' | 'lime'
}) {
  const id = useId().replace(/:/g, '')
  const max = Math.max(...data.map((item) => item.value), 1)
  const min = Math.min(...data.map((item) => item.value), 0)
  const range = max - min || 1
  const points = data.map((item, index) => {
    const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100
    const y = 38 - ((item.value - min) / range) * 32
    return { x, y, ...item }
  })
  const line = points.map((point) => `${point.x},${point.y}`).join(' ')
  const area = `0,40 ${line} 100,40`
  const stroke = tone === 'lime' ? '#A8D51C' : '#127A47'

  return (
    <div className={cn('w-full', className)}>
      <svg viewBox="0 0 100 40" className="h-auto w-full" preserveAspectRatio="none" role="img" aria-label="Gráfico de linha">
        <defs>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[8, 18, 28, 38].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#E8EDEA" strokeWidth="0.3" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
        ))}
        <polygon points={area} fill={`url(#area-${id})`} />
        <polyline
          points={line}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((point) => (
          <circle key={point.label} cx={point.x} cy={point.y} r="1.1" fill="#FFFFFF" stroke={stroke} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-ink-400">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
      <span className="sr-only" style={{ height }} />
    </div>
  )
}

export function Donut({
  value,
  label,
  sublabel,
  size = 148,
  tone = 'brand',
  className,
}: {
  value: number
  label: string
  sublabel?: string
  size?: number
  tone?: 'brand' | 'lime' | 'amber'
  className?: string
}) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference
  const stroke = tone === 'lime' ? '#C6F135' : tone === 'amber' ? '#D9A21B' : '#127A47'
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#E8EDEA" strokeWidth="9" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-ink-950 tabular">{label}</span>
          {sublabel ? <span className="text-[10px] font-medium text-ink-400">{sublabel}</span> : null}
        </div>
      </div>
    </div>
  )
}

export function Heatmap({
  rows,
  columns,
  values,
  className,
}: {
  rows: string[]
  columns: string[]
  values: number[][]
  className?: string
}) {
  return (
    <div className={cn('w-full', className)}>
      <div className="grid gap-1" style={{ gridTemplateColumns: `44px repeat(${columns.length}, minmax(0, 1fr))` }}>
        <span />
        {columns.map((column) => (
          <span key={column} className="pb-1 text-center text-[10px] font-medium text-ink-400">
            {column}
          </span>
        ))}
        {rows.map((row, rowIndex) => (
          <div key={row} className="contents">
            <span className="flex items-center text-[10px] font-medium text-ink-400">{row}</span>
            {columns.map((column, columnIndex) => {
              const value = values[rowIndex]?.[columnIndex] ?? 0
              return (
                <div
                  key={`${row}-${column}`}
                  title={`${row} ${column}: ${value}%`}
                  className="flex h-7 items-center justify-center rounded-md text-[9px] font-semibold"
                  style={{
                    backgroundColor: value === 0 ? '#F6F8F7' : `rgba(18, 122, 71, ${0.12 + (value / 100) * 0.8})`,
                    color: value > 55 ? '#FFFFFF' : '#5B6B63',
                  }}
                >
                  {value === 0 ? '—' : value}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-ink-400">
        <span>Menos</span>
        {[0.12, 0.32, 0.52, 0.72, 0.92].map((alpha) => (
          <span key={alpha} className="h-3 w-4 rounded-sm" style={{ backgroundColor: `rgba(18, 122, 71, ${alpha})` }} />
        ))}
        <span>Mais</span>
      </div>
    </div>
  )
}
