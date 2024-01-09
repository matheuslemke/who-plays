import { nextFazeResponseMock } from "@/mocks/nextFazeResponse"
import { Match } from "@/types/Match"
import {
  NextMatchesResponse,
  NextMatchesSoccerResponse,
} from "@/types/NextMatchesResponse"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(timezone)

const mapper = (response: NextMatchesSoccerResponse): Match[] => {
  const matches = response.response.map((event) => {
    const date = dayjs(event.fixture.timestamp * 1000).toString()
    return {
      id: event.fixture.id,
      home: { name: event.teams.home.name },
      away: { name: event.teams.away.name },
      league: event.league.name,
      date,
      game: "Futebol",
    } as Match
  })
  return matches
}

const getMatches = async (teamId: number): Promise<Match[]> => {
  try {
    const response = await fetch(
      `${process.env.SOCCER_URL}/fixtures?team=${teamId}&next=2&timezone=America%2FSao_Paulo`,
      {
        method: "GET",
        headers: {
          "X-ApiSports-Key": process.env.SOCCER_KEY || "",
        },
        next: { revalidate: 21600 },
      }
    )
    if (response.status === 200) {
      const result: NextMatchesSoccerResponse = await response.json()
      return mapper(result)
    }
  } catch (error) {
    console.error(error)
  }
  return []
}

// const getMatches = async (teamId: number): Promise<Match[]> => {
//   const result: NextMatchesResponse = nextFazeResponseMock
//   return mapper(result)
// }

const SoccerMatchesResource = { getMatches }

export { SoccerMatchesResource }
