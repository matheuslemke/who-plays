export type Match = {
  id: number
  home: Team
  away: Team
  league: string
  date: string
  game: Game
  endDate?: string
}

export type Game = "CS2" | "SOCCER" | "NBA"

export type Team = {
  name: string
  imgSrc?: string
}
