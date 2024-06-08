import { GameIcon } from "@/components/GameIcon"
import { Team } from "@/components/Team"
import { CSMatchesController } from "@/controllers/csMatchesController"
import { NbaMatchesController } from "@/controllers/nbaMatchesController"
import { SoccerMatchesController } from "@/controllers/soccerMatchesController"
import { Match } from "@/types/Match"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { AddToCalendar } from "./components/AddToCalendar"
import { Header } from "@/components/Header"
import { Container } from "@/components/Container"
dayjs.extend(timezone)
dayjs.extend(utc)

const getMatches = async (): Promise<Match[]> => {
  const matches = await Promise.all([
    CSMatchesController.getMatches(),
    SoccerMatchesController.getMatches(),
    NbaMatchesController.getMatches(),
  ])
  return matches
    .flat()
    .sort((a, b) => dayjs(a.date).diff(b.date))
    .filter(
      (match, index, arr) =>
        arr.findIndex((m) => m.id === match.id && m.game === match.game) ===
        index
    )
}

export default async function Home() {
  const matches = await getMatches()

  return (
    <main>
      <Container>
        <Header title="Who Plays?" />
        <div className="flex flex-col items-center">
          {matches.map((match, index) => (
            <div key={match.id} className="w-full">
              <div className="border w-full grid grid-cols-[1fr_repeat(3,_2fr)_1fr] gap-3 md:gap-4">
                <GameIcon game={match.game} />
                <Team team={match.home} />
                <div className="flex flex-col items-center">
                  <span className="text-sm text-center md:text-sm">
                    {dayjs(match.date).tz("America/Sao_Paulo").format("DD/MMM")}
                  </span>
                  <span className="text-4xl">
                    {dayjs(match.date).tz("America/Sao_Paulo").format("HH:mm")}
                  </span>
                  <span className="text-[8px] text-center md:text-xs">
                    {match.league}
                  </span>
                </div>
                <Team team={match.away} />
                <div className="flex items-center mr-1">
                  <AddToCalendar match={match} />
                </div>
              </div>
              {matches[index + 1] &&
              dayjs(matches[index + 1]?.date)
                .tz("America/Sao_Paulo")
                .date() > dayjs(match.date).tz("America/Sao_Paulo").date() ? (
                <span className="block w-full h-5" />
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </Container>
    </main>
  )
}
