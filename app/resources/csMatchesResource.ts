import { nextFazeResponseMock } from "@/mocks/nextFazeResponse"
import { Match } from "@/types/Match"
import { NextMatchesResponse } from "@/types/NextMatchesResponse"

const mapper = (response: NextMatchesResponse): Match[] => {
  const matches = response.events.map((event) => {
    const time = new Date(event.startTimestamp * 1000)
    return {
      id: event.id,
      home: { name: event.homeTeam.name },
      away: { name: event.awayTeam.name },
      league: event.tournament.name,
      date: time.toString(),
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
        next: { revalidate: 3600 },
      }
    )
    if (Number(response.headers.get("content-length")) > 0) {
      const result: NextMatchesResponse = nextFazeResponseMock // await response.json()
      return mapper(result)
    }
  } catch (error) {
    console.error(error)
  }
  return []
}

const CSMatchesResource = { getMatches }

export { CSMatchesResource }
