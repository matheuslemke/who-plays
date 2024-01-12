export type Match = {
  id: number
  home: Team
  away: Team
  league: string
  date: string
  game: Game
}

export type Game = "CS2" | "SOCCER" | "NBA"

type Team = {
  name: string
  imgSrc?: string
}
