import { NbaMatchesResource } from "@/resources/nbaMatchesResource"
import { Match } from "@/types/Match"

const getMatches = async (): Promise<Match[]> => {
  const ids = [""]

  const matches = await Promise.all(
    ids.map((id) => NbaMatchesResource.getMatches())
  )

  return matches.reduce((prev, curr) => prev.concat(curr), [])
}

const NbaMatchesController = {
  getMatches,
}

export { NbaMatchesController }
