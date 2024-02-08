import { Match } from "@/types/Match"
import { NextMatchesResponse } from "@/types/NextMatchesResponse"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(timezone)

const mapper = (response: NextMatchesResponse): Match[] => {
  const matches = response.events.map((event) => {
    const date = dayjs(event.startTimestamp * 1000).toString()
    return {
      id: event.id,
      home: { name: event.homeTeam.name },
      away: { name: event.awayTeam.name },
      league: event.tournament.name,
      date,
      game: "CS2",
    } as Match
  })
  return matches
}

const getMatches = async (teamId: number): Promise<Match[]> => {
  try {
    const response = await fetch(
      `${process.env.CSGO_URL}/team/${teamId}/matches/next/0`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.CSGO_KEY || "",
          "X-RapidAPI-Host": "esportapi1.p.rapidapi.com",
        },
        next: { revalidate: 0 },
      }
    )
    if (Number(response.headers.get("content-length")) > 0) {
      const result: NextMatchesResponse = await response.json()
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

const CSMatchesResource = { getMatches }

export { CSMatchesResource }
