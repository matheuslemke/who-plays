export type NextMatchesResponse = {
  events: Event[]
}

export type NextMatchesSoccerResponse = {
  response: {
    fixture: {
      id: number
      timestamp: number
    }
    league: { name: string }
    teams: {
      home: {
        name: string
        logo: string | null
      }
      away: {
        name: string
        logo: string | null
      }
    }
  }[]
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
  bestOf: number
}

export type NextMatchesNbaResponse = {
  response: {
    id: number
    timestamp: number
    league: {
      name: string
    }
    teams: {
      home: {
        name: string
        logo: string | null
      }
      away: {
        name: string
        logo: string | null
      }
    }
  }[]
}
