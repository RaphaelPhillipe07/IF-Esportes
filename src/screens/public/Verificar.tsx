import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Mail, ShieldCheck } from 'lucide-react'
import { atleta } from '@/data/mock'
import { Alert, Badge, Button } from '@/components/ui'

const DIGITS = 6

export function Verificar() {
  const navigate = useNavigate()
  const [code, setCode] = useState<string[]>(Array(DIGITS).fill(''))
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const filled = code.every((digit) => digit !== '')

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1)
    setCode((current) => current.map((item, position) => (position === index ? digit : item)))
    if (digit && index < DIGITS - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  return (
    <div>
      <Link to="/entrar?tab=cadastro" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Voltar
      </Link>

      <div className="mt-5 flex items-center gap-2">
        <Badge tone="green">Etapa 2 de 3</Badge>
        <Badge tone="outline">Verificação</Badge>
      </div>

      <span className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
        <Mail className="h-6 w-6" aria-hidden />
      </span>
      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-950">Confirme seu e-mail</h1>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
        Enviamos um código de 6 dígitos para{' '}
        <strong className="font-semibold text-ink-800">{atleta.email}</strong>. Digite o código abaixo para validar seu
        vínculo institucional.
      </p>

      <div className="mt-6 flex justify-between gap-2">
        {Array.from({ length: DIGITS }).map((_, index) => (
          <input
            key={index}
            ref={(element) => {
              inputs.current[index] = element
            }}
            value={code[index]}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            aria-label={`Dígito ${index + 1} do código`}
            className="h-14 w-full rounded-xl border border-ink-200 bg-white text-center font-display text-xl font-bold text-ink-950 transition-colors focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px]">
        <span className="text-ink-400">
          Não recebeu? <span className="font-semibold text-ink-600">Reenviar em 00:42</span>
        </span>
        <button type="button" className="font-semibold text-brand-700 hover:text-brand-900">
          Reenviar código
        </button>
      </div>

      <Button
        size="lg"
        className="mt-5 w-full justify-center"
        iconRight={ArrowRight}
        disabled={!filled}
        onClick={() => navigate('/app')}
      >
        Validar código
      </Button>

      <div className="mt-5">
        <Alert tone="info" icon={Lock} title="Por que pedimos isso?">
          A confirmação por e-mail garante que apenas membros da comunidade acadêmica acessem inscrições, torneios e
          dados de atletas (RN-04).
        </Alert>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-[11px] text-ink-500">
        <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
        O código expira em 10 minutos. Nunca compartilhe seu código com outras pessoas.
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-ink-400">
        {['Conta criada', 'Verificação', 'Passaporte pronto'].map((passo, index) => (
          <span key={passo} className="inline-flex items-center gap-1.5">
            {index === 0 ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" aria-hidden />
            ) : (
              <span
                className={
                  index === 1
                    ? 'h-3.5 w-3.5 rounded-full border-2 border-brand-600 bg-brand-100'
                    : 'h-3.5 w-3.5 rounded-full border border-ink-200'
                }
              />
            )}
            {passo}
          </span>
        ))}
      </div>
    </div>
  )
}
