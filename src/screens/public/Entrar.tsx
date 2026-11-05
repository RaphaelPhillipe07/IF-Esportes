import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, ShieldCheck, User } from 'lucide-react'
import { brand } from '@/config/brand'
import { cn } from '@/lib/cn'
import { Alert, Badge, Button, Input } from '@/components/ui'

type Aba = 'entrar' | 'cadastro'

export function Entrar() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const abaInicial: Aba = searchParams.get('tab') === 'cadastro' ? 'cadastro' : 'entrar'
  const [aba, setAba] = useState<Aba>(abaInicial)
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [aceite, setAceite] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/verificar')
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Badge tone="green">Área do aluno</Badge>
        <Badge tone="outline">Acesso seguro</Badge>
      </div>
      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-950">
        {aba === 'entrar' ? 'Bem-vindo de volta' : 'Crie seu passaporte'}
      </h1>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
        {aba === 'entrar'
          ? 'Acesse com seu e-mail institucional para acompanhar inscrições, treinos e torneios.'
          : 'Use seu e-mail institucional do IFAL. Vamos enviar um código de 6 dígitos para confirmar seu vínculo.'}
      </p>

      <div className="mt-6 grid grid-cols-2 rounded-xl bg-ink-100 p-1">
        {(
          [
            { value: 'entrar', label: 'Entrar' },
            { value: 'cadastro', label: 'Criar conta' },
          ] as { value: Aba; label: string }[]
        ).map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setAba(item.value)}
            className={cn(
              'h-9 rounded-lg text-[12px] font-semibold transition-colors',
              aba === item.value ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-800',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {aba === 'entrar' ? (
          <>
            <Input
              label="E-mail institucional"
              name="email"
              type="email"
              placeholder="seu.nome@aluno.ifal.edu.br"
              icon={Mail}
              autoComplete="email"
              required
            />
            <Input
              label="Senha"
              name="senha"
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Sua senha"
              icon={Lock}
              autoComplete="current-password"
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setMostrarSenha((value) => !value)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  className="rounded-md p-1 text-ink-400 hover:text-ink-700"
                >
                  {mostrarSenha ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                </button>
              }
            />

            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-[11px] font-medium text-ink-500">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-ink-300 text-brand-700 focus:ring-brand-500"
                />
                Lembrar de mim
              </label>
              <Link to="/entrar" className="text-[11px] font-semibold text-brand-700 hover:text-brand-900">
                Esqueci minha senha
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full justify-center" iconRight={ArrowRight}>
              Entrar na plataforma
            </Button>

            <div className="flex items-center gap-2">
              <span className="h-px flex-1 bg-ink-200" />
              <span className="text-[10px] uppercase tracking-wider text-ink-400">ou</span>
              <span className="h-px flex-1 bg-ink-200" />
            </div>
            <Button type="button" variant="secondary" size="md" className="w-full justify-center" icon={ShieldCheck}>
              Acessar com gov.br
            </Button>

            <Alert tone="info" icon={Mail} title="Use seu e-mail institucional">
              O acesso é restrito a alunos, professores e servidores com vínculo ativo no IFAL. Em caso de dúvida, fale
              com a coordenação.
            </Alert>
          </>
        ) : (
          <>
            <Input label="Nome completo" name="nome" placeholder="Como está no seu cadastro" icon={User} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="CPF" name="cpf" placeholder="000.000.000-00" required />
              <Input label="Matrícula ou SIAPE" name="matricula" placeholder="2023110405" required />
            </div>
            <Input
              label="E-mail institucional"
              name="email"
              type="email"
              placeholder="seu.nome@aluno.ifal.edu.br"
              icon={Mail}
              hint="Alunos: @aluno.ifal.edu.br · Servidores: @ifal.edu.br"
              required
            />
            <Input
              label="Senha"
              name="senha"
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Mínimo de 8 caracteres"
              icon={Lock}
              hint="Use letras, números e pelo menos um caractere especial."
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setMostrarSenha((value) => !value)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  className="rounded-md p-1 text-ink-400 hover:text-ink-700"
                >
                  {mostrarSenha ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                </button>
              }
            />
            <Input
              label="Confirmar senha"
              name="confirmar-senha"
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Repita a senha"
              icon={Lock}
              required
            />

            <label className="flex items-start gap-2.5 text-[11px] leading-relaxed text-ink-500">
              <input
                type="checkbox"
                checked={aceite}
                onChange={(event) => setAceite(event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-700 focus:ring-brand-500"
              />
              Li e aceito o regulamento de uso e o tratamento dos meus dados conforme a LGPD.
            </label>

            <Button type="submit" size="lg" className="w-full justify-center" iconRight={ArrowRight} disabled={!aceite}>
              Criar conta e verificar e-mail
            </Button>

            <Alert tone="success" icon={CheckCircle2} title="Vínculo validado por código">
              Após o cadastro, enviaremos um código de 6 dígitos para o seu e-mail institucional. Ele expira em 10
              minutos.
            </Alert>
          </>
        )}
      </form>

      <p className="mt-5 text-center text-[11px] text-ink-400">
        {aba === 'entrar' ? 'Primeiro acesso?' : 'Já tem conta?'}{' '}
        <button
          type="button"
          onClick={() => setAba(aba === 'entrar' ? 'cadastro' : 'entrar')}
          className="font-semibold text-brand-700 hover:text-brand-900"
        >
          {aba === 'entrar' ? 'Criar conta' : 'Entrar'}
        </button>
      </p>

      <p className="mt-6 text-center text-[10px] leading-relaxed text-ink-300">
        {brand.institution} · Ambiente acadêmico de demonstração. Nenhum dado real é utilizado neste protótipo.
      </p>
    </div>
  )
}
