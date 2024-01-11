import { Match } from "@/types/Match"
import { NextMatchesNbaResponse } from "@/types/NextMatchesResponse"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(timezone)

const mapper = (response: NextMatchesNbaResponse): Match[] => {
  const matches = response.response.map((event) => {
    const date = dayjs(event.timestamp * 1000).toString()
    return {
      id: event.id,
      home: { name: event.teams.home.name },
      away: { name: event.teams.away.name },
      league: event.league.name,
      date,
      game: "NBA",
    } as Match
  })
  return matches
}

const getMatches = async (): Promise<Match[]> => {
  const nbaId = 12
  const season = "2023-2024"
  const date = dayjs().format('YYYY-MM-DD')
  try {
    const response = await fetch(
      `${process.env.NBA_URL}/games?league=${nbaId}&season=${season}&date=${date}&timezone=America%2FSao_Paulo`,
      {
        method: "GET",
        headers: {
          "X-ApiSports-Key": process.env.NBA_KEY || "",
        },
        next: { revalidate: 14400 },
      }
    )
    if (response.status === 200) {
      const result: NextMatchesNbaResponse = await response.json()
      return mapper(result)
    }
  } catch (error) {
    console.error(error)
  }
  return []
}

const NbaMatchesResource = { getMatches }

export { NbaMatchesResource }
