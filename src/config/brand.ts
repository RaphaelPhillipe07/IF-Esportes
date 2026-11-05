export const brand = {
  /** Nome provisório definido pela equipe. Troque aqui para atualizar toda a interface. */
  name: 'IF Esportes',
  institution: 'IFAL · Campus Maceió',
  tagline: 'O esporte do campus em um só lugar.',
  description:
    'Modalidades, turmas, torneios e o passaporte esportivo do atleta do IFAL Campus Maceió.',
  emailDomain: '@aluno.ifal.edu.br',
  supportEmail: 'esportes@ifal.edu.br',
  githubUrl: 'https://github.com/RaphaelPhillipe07/IF-Esportes/graphs/contributors',
  provisional: true,
} as const

export const brandInitials = brand.name
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()
