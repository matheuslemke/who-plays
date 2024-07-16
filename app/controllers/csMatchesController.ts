import { CSMatchesResource } from "@/resources/csMatchesResource"
import { Match } from "@/types/Match"

const getMatches = async (): Promise<Match[]> => {
  const furiaId = 364252
  const mibrId = 366538
  const imperialId = 365850
  // const planoId = 381450
  const painId = 381450

  const matches = await Promise.all([
    CSMatchesResource.getMatches(furiaId),
    CSMatchesResource.getMatches(mibrId),
    CSMatchesResource.getMatches(imperialId),
    CSMatchesResource.getMatches(painId),
  ])

  return matches.flat()
}

const CSMatchesController = {
  getMatches,
}

export { CSMatchesController }
