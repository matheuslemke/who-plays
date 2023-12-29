"use client"

import { Match } from "@/types/Match"
import { Button } from "@nextui-org/react"
import { FC, useCallback } from "react"
import { CalendarService } from "../services/calendarService"
import { CalendarIcon } from "./CalendarIcon"

const AddToCalendar: FC<{ match: Match }> = ({ match }) => {
  const handleClick = useCallback(() => {
    CalendarService.addEvent(match)
  }, [match])
  return (
    <Button
      isIconOnly
      color="success"
      aria-label="Add to calendar"
      onClick={handleClick}
    >
      <CalendarIcon />
    </Button>
  )
}

export { AddToCalendar }
