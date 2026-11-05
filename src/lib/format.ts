export function formatDate(
  value: Date | string,
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' },
) {
  const date = typeof value === 'string' ? new Date(`${value}T12:00:00`) : value
  return new Intl.DateTimeFormat('pt-BR', options)
    .format(date)
    .replace('.', '')
    .replace(' de ', ' ')
}

export function formatShortDate(value: Date | string) {
  return formatDate(value, { day: '2-digit', month: 'short' })
}

export function formatWeekday(value: Date | string) {
  return formatDate(value, { weekday: 'short' })
}

export function pct(part: number, total: number) {
  if (!total) return 0
  return Math.round((part / total) * 100)
}

export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0]
}

export function plural(value: number, singular: string, pluralForm: string) {
  return `${value} ${value === 1 ? singular : pluralForm}`
}
