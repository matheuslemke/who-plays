export type Match = {
  id: number
  home: Team
  away: Team
  league: string
  date: string
  game: "CS2" | "Futebol"
}

type Team = {
  name: string
  imgSrc?: string
}
