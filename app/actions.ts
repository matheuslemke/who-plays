"use server"

import { CalendarService } from "@/services/calendarService"
import { Match } from "@/types/Match"
import { Session } from "next-auth"

export const addToCalendar = async(match: Match, session: Session): Promise<boolean> => {
  return await CalendarService.addEvent(match, session)
}
