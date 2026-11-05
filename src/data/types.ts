export type SportKey =
  | 'natacao'
  | 'futsal'
  | 'volei'
  | 'basquete'
  | 'atletismo'
  | 'judo'
  | 'xadrez'
  | 'handebol'
  | 'praia'

export type ModalidadeStatus = 'aberta' | 'ultimas' | 'lotada'

export type Turma = {
  id: string
  nome: string
  dias: string
  horario: string
  local: string
  vagas: number
  inscritos: number
  status: ModalidadeStatus
}

export type Modalidade = {
  slug: string
  nome: string
  categoria: 'Coletiva' | 'Individual' | 'Aquática' | 'Combate' | 'Mental' | 'Praia'
  descricao: string
  resumo: string
  local: string
  dias: string[]
  horarios: string[]
  instrutor: string
  vagas: number
  inscritos: number
  nivel: string
  status: ModalidadeStatus
  prerequisitos: string[]
  equipamentos: string[]
  imagem: string
  sport: SportKey
  turmas: Turma[]
}

export type TorneioStatus = 'abertas' | 'andamento' | 'encerrado'

export type Torneio = {
  slug: string
  nome: string
  modalidade: string
  periodo: string
  inicio: string
  fim: string
  local: string
  status: TorneioStatus
  equipes: number
  jogos: number
  atletas: number
  inscricoesAte: string
  organizador: string
  formato: string
  descricao: string
  imagem: string
  sport: SportKey
}

export type Noticia = {
  slug: string
  titulo: string
  categoria: 'Notícia' | 'Edital' | 'Comunicado'
  resumo: string
  data: string
  autor: string
  leitura: string
  imagem: string
  destaque?: boolean
}

export type InscricaoStatus = 'ativa' | 'fila' | 'concluida' | 'cancelada'

export type Inscricao = {
  id: string
  modalidade: string
  turma: string
  horario: string
  local: string
  status: InscricaoStatus
  frequencia: number
  posicao?: number
  sport: SportKey
}

export type Equipe = {
  id: string
  nome: string
  modalidade: string
  genero: string
  atletas: number
  tecnico: string
  status: string
  sport: SportKey
}

export type AtletaEquipe = {
  nome: string
  matricula: string
  posicao: string
  frequencia: number
  status: 'Ativo' | 'Atenção'
}

export type LogAuditoria = {
  id: string
  data: string
  usuario: string
  perfil: string
  acao: string
  entidade: string
  ip: string
  status: 'Sucesso' | 'Alerta'
}

export type BracketMatch = {
  id: string
  timeA: string
  timeB: string
  placarA?: number
  placarB?: number
  status: 'homologado' | 'em-andamento' | 'agendado'
  horario?: string
}

export type BracketRound = {
  nome: string
  partidas: BracketMatch[]
}
