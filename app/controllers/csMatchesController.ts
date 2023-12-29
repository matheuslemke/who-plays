import { CSMatchesResource } from "@/resources/csMatchesResource"
import { Match } from "@/types/Match"

const getMatches = async (): Promise<Match[]> => {
  const furiaId = 364396
  const mibrId = 366538
  const imperialId = 365850

  const [furiaMatches, mibrMatches, imperialMatches] = await Promise.all([
    CSMatchesResource.getMatches(furiaId),
    CSMatchesResource.getMatches(mibrId),
    CSMatchesResource.getMatches(imperialId),
  ])

  return [...furiaMatches, ...mibrMatches, ...imperialMatches]
}

const CSMatchesController = {
  getMatches,
}

export { CSMatchesController }
