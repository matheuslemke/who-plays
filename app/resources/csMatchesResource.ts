import { Match } from "@/types/Match"
import { NextMatchesResponse } from "@/types/NextMatchesResponse"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(timezone)

const mapper = (response: NextMatchesResponse): Match[] => {
  const matches = response.events.map((event) => {
    const date = dayjs(event.startTimestamp * 1000)
    const duration = event.bestOf
    const endDate = date.add(duration, "hours")
    return {
      id: event.id,
      home: { name: event.homeTeam.name },
      away: { name: event.awayTeam.name },
      league: event.tournament.name,
      date: date.toString(),
      game: "CS2",
      endDate: endDate.toString()
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
        next: { revalidate: 1800 },
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

const CSMatchesResource = { getMatches }

export { CSMatchesResource }
