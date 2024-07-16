import { SoccerMatchesResource } from "@/resources/soccerMatchesResource"
import { Match } from "@/types/Match"

const getMatches = async (): Promise<Match[]> => {
  const saoPauloId = 126
  const brazilId = 6
  const realMadridId = 541
  // const arsenalId = 42
  // const barcelonaId = 529
  const champions = 2
  const teamIds = [saoPauloId, brazilId, realMadridId]
  const leagueIds = [champions]

  const matches = await Promise.all([
    ...teamIds.map((id) => SoccerMatchesResource.getMatches(id)),
    ...leagueIds.map((id) => SoccerMatchesResource.getMatchesByLeague(id)),
  ])

  return matches.reduce((prev, curr) => prev.concat(curr), [])
}

const SoccerMatchesController = {
  getMatches,
}

export { SoccerMatchesController }
