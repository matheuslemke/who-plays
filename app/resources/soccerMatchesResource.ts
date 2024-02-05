import { Match } from "@/types/Match"
import { NextMatchesSoccerResponse } from "@/types/NextMatchesResponse"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(timezone)

const mapper = (response: NextMatchesSoccerResponse): Match[] => {
  const matches = response.response.map((event) => {
    const date = dayjs(event.fixture.timestamp * 1000).toString()
    return {
      id: event.fixture.id,
      home: { name: event.teams.home.name, imgSrc: event.teams.home.logo },
      away: { name: event.teams.away.name, imgSrc: event.teams.away.logo },
      league: event.league.name,
      date,
      game: "SOCCER",
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
        // next: { revalidate: 10800 },
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

const SoccerMatchesResource = { getMatches }

export { SoccerMatchesResource }
