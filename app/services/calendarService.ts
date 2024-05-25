import { createClient } from "@/services/supabase/server"
import { Match } from "@/types/Match"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { Session } from "next-auth"
import { signIn } from "next-auth/react"
dayjs.extend(utc)
dayjs.extend(timezone)

const GAME_ID = {
  SOCCER: 1,
  CS2: 2,
  NBA: 3,
}

const addEvent = async (match: Match, session: Session) => {
  const calendarId = process.env.NEXT_PUBLIC_CALENDAR_ID

  const start = dayjs(match.date).tz("America/Sao_Paulo")
  const end = match.endDate
    ? dayjs(match.endDate).tz("America/Sao_Paulo")
    : start.add(2, "hours").tz("America/Sao_Paulo")

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?alt=json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        start: { dateTime: start.format() },
        end: { dateTime: end.format() },
        summary: `${match.home.name} vs ${match.away.name}`,
      }),
    }
  )

  if (response.status >= 400) {
    console.error("Error:", await response.json())
    await signIn()
    return
  }

  const supabase = createClient()
  const { error, status } = await supabase
    .from("matches")
    .insert({ external_id: match.id, game_id: GAME_ID[match.game] })
  if (error || status >= 400) {
    console.error("Supabase Error:", error)
  }
}

const CalendarService = { addEvent }

export { CalendarService }
