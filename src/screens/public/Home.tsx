import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  IdCard,
  MapPin,
  Search,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react'
import { modalidades, noticiasDestaque, torneios } from '@/data/mock'
import { asset } from '@/lib/assets'
import { Badge, ButtonLink, Card, SectionHeading } from '@/components/ui'
import { ModalidadeCard, NoticiaCard } from '@/components/cards'
import { SportArt } from '@/components/Brand'

const destaqueSlugs = ['natacao', 'voleibol', 'futsal', 'xadrez']
const passos = [
  {
    icon: Search,
    title: 'Encontre sua modalidade',
    text: 'Explore o catálogo por esporte, local ou dia da semana e confira horários, vagas e pré-requisitos.',
  },
  {
    icon: CheckCircle2,
    title: 'Solicite sua vaga',
    text: 'A inscrição é feita em poucos passos, com validação de conflito de horário e fila de espera automática.',
  },
  {
    icon: IdCard,
    title: 'Construa seu passaporte',
    text: 'Acompanhe frequência, torneios, medalhas e todo o seu histórico esportivo em um só perfil.',
  },
]

export function Home() {
  const destaques = destaqueSlugs
    .map((slug) => modalidades.find((modalidade) => modalidade.slug === slug))
    .filter((modalidade): modalidade is (typeof modalidades)[number] => Boolean(modalidade))
  const proximosTorneios = torneios.filter((torneio) => torneio.status !== 'encerrado').slice(0, 3)

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200/60">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full bg-lime-300/25 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-brand-200/40 blur-3xl" />

        <div className="container-page relative grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="animate-fade-up">
            <Badge tone="lime" dot>
              2026.2 · inscrições abertas
            </Badge>
            <h1 className="mt-5 text-balance font-display text-[44px] font-extrabold leading-[1.02] tracking-tight text-ink-950 sm:text-[54px] lg:text-[62px]">
              O esporte do campus em{' '}
              <span className="relative inline-block text-brand-700">
                um só lugar
                <span className="absolute inset-x-0 bottom-1 -z-10 h-3 rounded-full bg-lime-400/70" />
              </span>
              .
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-500 md:text-base">
              Encontre modalidades, garanta sua vaga nos treinos e acompanhe torneios, resultados e o seu passaporte
              esportivo — tudo em uma plataforma feita para o IFAL Campus Maceió.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink to="/modalidades" size="lg" iconRight={ArrowRight}>
                Explorar modalidades
              </ButtonLink>
              <ButtonLink to="/torneios" variant="secondary" size="lg" icon={Trophy}>
                Ver torneios
              </ButtonLink>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-[12px] text-ink-500">
              <span className="flex items-center gap-2">
                <span className="flex -space-x-1.5">
                  {['MC', 'BL', 'CN', 'AR'].map((item, index) => (
                    <span
                      key={item}
                      className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-paper bg-brand-700 text-[9px] font-bold text-white"
                      style={{ zIndex: 10 - index }}
                    >
                      {item}
                    </span>
                  ))}
                </span>
                <span className="font-medium text-ink-700">+320 atletas</span> no campus
              </span>
              <span className="hidden h-4 w-px bg-ink-200 sm:block" />
              <span>9 modalidades</span>
              <span>4 espaços esportivos</span>
            </div>
          </div>

          <div className="relative animate-fade-in lg:pl-2">
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] border border-white/60 bg-brand-950 shadow-float">
              <img
                src={asset('/images/hero-track.jpg')}
                alt="Pista de atletismo do campus ao entardecer"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/35 to-brand-950/5" />
              <div className="absolute left-5 top-5 flex items-center gap-2">
                <Badge tone="dark" className="bg-ink-950/45 text-white backdrop-blur">
                  Jogos Internos 2026
                </Badge>
                <Badge tone="lime" dot className="bg-lime-400 text-brand-950 ring-lime-300/60">
                  Ao vivo
                </Badge>
              </div>
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lime-300">
                  34 jogos · 12 equipes
                </p>
                <h2 className="mt-1 text-balance font-display text-2xl font-bold leading-tight tracking-tight text-white">
                  Acompanhe as chaves e os resultados em tempo real
                </h2>
                <div className="mt-4 flex items-center gap-2">
                  <ButtonLink to="/torneios/jogos-internos-2026" variant="lime" size="sm" iconRight={ArrowRight}>
                    Ver torneio
                  </ButtonLink>
                  <span className="text-[11px] text-white/75">Até 22 de novembro</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink-200/80 bg-white p-3 shadow-card">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Users className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[10px] font-medium text-ink-600">Natação · Turma A</p>
                    <p className="text-[12px] font-semibold text-ink-900">8 vagas restantes</p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full w-2/3 rounded-full bg-brand-600" />
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-ink-200/80 bg-white p-3 shadow-card">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400 text-brand-950">
                  <IdCard className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] font-medium text-ink-600">Passaporte esportivo</p>
                  <p className="text-[12px] font-semibold text-ink-900">6 torneios · 6 medalhas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink-200/60 bg-white/60">
        <div className="container-page grid grid-cols-2 divide-x divide-ink-200/60 py-6 md:grid-cols-4">
          {[
            { value: '9', label: 'modalidades ativas' },
            { value: '320+', label: 'atletas cadastrados' },
            { value: '12', label: 'torneios no ano' },
            { value: '4', label: 'espaços esportivos' },
          ].map((item) => (
            <div key={item.label} className="px-4 py-2 text-center first:pl-0 last:pr-0 md:text-left">
              <p className="font-display text-2xl font-bold tracking-tight text-ink-950 tabular md:text-3xl">{item.value}</p>
              <p className="mt-0.5 text-[11px] text-ink-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Modalidades"
          title="Encontre o esporte que combina com você"
          description="Do xadrez à natação: turmas para todos os níveis, com horários no contraturno e acompanhamento de professores."
          action={
            <ButtonLink to="/modalidades" variant="secondary" size="sm" iconRight={ArrowRight}>
              Ver todas as modalidades
            </ButtonLink>
          }
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((modalidade) => (
            <ModalidadeCard key={modalidade.slug} modalidade={modalidade} />
          ))}
        </div>
      </section>

      <section className="border-y border-ink-200/60 bg-white/60">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="Como funciona"
            title="Da descoberta ao pódio, em três passos"
            description="A plataforma centraliza o que hoje está espalhado entre murais, planilhas e grupos de mensagem."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {passos.map((passo, index) => (
              <Card key={passo.title} className="p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <passo.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-display text-3xl font-bold text-ink-100">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink-950">{passo.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{passo.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Torneios e eventos"
          title="A próxima competição já tem data"
          description="Inscrições, chaves, tabelas e resultados publicados pela coordenação e pelas atléticas."
          action={
            <ButtonLink to="/torneios" variant="secondary" size="sm" iconRight={ArrowRight}>
              Ver todos os torneios
            </ButtonLink>
          }
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {proximosTorneios.map((torneio) => (
            <Link
              key={torneio.slug}
              to={`/torneios/${torneio.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
            >
              <SportArt sport={torneio.sport} image={torneio.imagem} className="h-28">
                <div className="flex h-full items-start justify-between p-4">
                  <Badge tone="dark" className="bg-ink-950/50 text-white backdrop-blur">
                    {torneio.modalidade}
                  </Badge>
                  <span className="rounded-full bg-lime-400 px-2.5 py-1 text-[10px] font-bold text-brand-950">
                    {torneio.status === 'andamento' ? 'Em andamento' : 'Inscrições abertas'}
                  </span>
                </div>
              </SportArt>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-ink-950 group-hover:text-brand-800">
                  {torneio.nome}
                </h3>
                <div className="mt-3 space-y-1.5 text-[12px] text-ink-500">
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-ink-300" aria-hidden /> {torneio.periodo}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-ink-300" aria-hidden /> {torneio.local}
                  </p>
                </div>
                <p className="mt-4 border-t border-ink-100 pt-3 text-[11px] font-medium text-brand-700">
                  {torneio.equipes ? `${torneio.equipes} equipes` : `${torneio.atletas} atletas`} · {torneio.jogos} jogos
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-16 md:pb-20">
        <SectionHeading
          eyebrow="Notícias e editais"
          title="O que acontece no esporte do campus"
          description="Comunicados da coordenação, editais de seleção e cobertura dos torneios."
          action={
            <ButtonLink to="/noticias" variant="secondary" size="sm" iconRight={ArrowRight}>
              Ver todas
            </ButtonLink>
          }
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {noticiasDestaque.map((noticia, index) => (
            <NoticiaCard key={noticia.slug} noticia={noticia} featured={index === 0} />
          ))}
        </div>
      </section>

      <section className="container-page pb-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-950 px-6 py-12 text-white md:px-12 md:py-14">
          <div className="bg-dots absolute inset-0 opacity-40" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <Badge tone="lime" className="bg-lime-300 text-brand-950 ring-lime-300/40">
                Passaporte esportivo
              </Badge>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Seu histórico esportivo começa no primeiro treino.
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/65">
                Crie sua conta com o e-mail institucional, inscreva-se nas turmas e acompanhe medalhas, frequência e
                torneios disputados ao longo da sua trajetória no IFAL.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <ButtonLink to="/entrar?tab=cadastro" variant="lime" size="lg" iconRight={ArrowRight} className="w-full justify-center">
                Criar meu passaporte
              </ButtonLink>
              <ButtonLink to="/modalidades" variant="outlineLight" size="lg" className="w-full justify-center">
                Explorar modalidades
              </ButtonLink>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-[10px] text-white/40">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Acesso com e-mail institucional
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
