import { CSMatchesResource } from "@/resources/csMatchesResource"
import { Match } from "@/types/Match"

const getMatches = async (): Promise<Match[]> => {
  const furiaId = 364252
  const mibrId = 366538
  const imperialId = 365850
  const planoId = 381450

  const [furiaMatches, mibrMatches, imperialMatches, planoMatches] =
    await Promise.all([
      CSMatchesResource.getMatches(furiaId),
      CSMatchesResource.getMatches(mibrId),
      CSMatchesResource.getMatches(imperialId),
      CSMatchesResource.getMatches(planoId),
    ])

  return [...furiaMatches, ...mibrMatches, ...imperialMatches, ...planoMatches]
}

const CSMatchesController = {
  getMatches,
}

export { CSMatchesController }
