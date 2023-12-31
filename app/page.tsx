import { CSMatchesController } from "@/controllers/csMatchesController"
import { Match } from "@/types/Match"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import tw from "tailwind-styled-components"
import { AddToCalendar } from "./components/AddToCalendar"
dayjs.extend(timezone)
dayjs.extend(utc)

const Game = tw.span`
  text-xs my-auto md:text-base
`
const TeamName = tw.div`
  text-xs text-ellipsis text-center self-center md:text-lg
`

const getMatches = async (): Promise<Match[]> =>
  CSMatchesController.getMatches()

export default async function Home() {
  const matches = await getMatches()

  return (
    <main>
      <div className="w-screen">
        <div className="flex flex-col items-center">
          {matches.map((match) => (
            <div
              key={match.id}
              className="border w-full grid grid-cols-[1fr_repeat(3,_2fr)_1fr] gap-3 md:gap-4"
            >
              <Game>{match.game}</Game>
              <TeamName>{match.home.name}</TeamName>
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-center md:text-xs">
                  {dayjs(match.date).tz("America/Sao_Paulo").format("DD/MMM")}
                </span>
                <span className="text-4xl">
                  {dayjs(match.date).tz("America/Sao_Paulo").format("hh:mm")}
                </span>
                <span className="text-[8px] text-center md:text-xs">
                  {match.league}
                </span>
              </div>
              <TeamName>{match.away.name}</TeamName>
              <div className="flex items-center mr-1">
                <AddToCalendar match={match} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
