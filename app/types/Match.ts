export type Match = {
  id: number
  home: Team
  away: Team
  league: string
  date: string
  game: string
}

type Team = {
  name: string
  imgSrc?: string
}
