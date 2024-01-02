import { Match } from "@/types/Match"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { getSession, signIn } from "next-auth/react"
dayjs.extend(utc)

const addEvent = async (match: Match) => {
  const session = await getSession()

  if (!session) {
    await signIn()
    return
  }

  const calendarId = process.env.NEXT_PUBLIC_CALENDAR_ID

  const start = dayjs(match.date).utc()
  const end = start.add(2.5, "hours").utc()

  await fetch(
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
}

const CalendarService = { addEvent }

export { CalendarService }
