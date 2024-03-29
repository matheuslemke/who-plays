import { Match } from "@/types/Match"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { getSession, signIn } from "next-auth/react"
dayjs.extend(utc)
dayjs.extend(timezone)

const addEvent = async (match: Match) => {
  const session = await getSession()

  if (!session) {
    await signIn()
    return
  }

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
    await signIn()
    return
  }
}

const CalendarService = { addEvent }

export { CalendarService }
