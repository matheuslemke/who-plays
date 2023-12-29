export type NextMatchesResponse = {
  events: Event[]
}

type Event = {
  id: number
  tournament: {
    name: string
    category: {
      name: string
    }
  }
  homeTeam: {
    name: string
  }
  awayTeam: {
    name: string
  }
  startTimestamp: number
}
