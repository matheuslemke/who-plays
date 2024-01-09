import { SoccerMatchesResource } from "@/resources/soccerMatchesResource"
import { Match } from "@/types/Match"

const getMatches = async (): Promise<Match[]> => {
  const saoPauloId = 364396
  const brazilId = 6
  const realMadridId = 541
  const arsenalId = 42
  const barcelonaId = 529
  const ids = [saoPauloId, brazilId, realMadridId, arsenalId, barcelonaId]

  const matches = await Promise.all(
    ids.map((id) => SoccerMatchesResource.getMatches(id))
  )

  return matches.reduce((prev, curr) => prev.concat(curr), [])
}

const SoccerMatchesController = {
  getMatches,
}

export { SoccerMatchesController }
