"use client"

import { Match } from "@/types/Match"
import { Button } from "@nextui-org/react"
import { FC, useCallback, useState } from "react"
import { CalendarService } from "../services/calendarService"
import { CalendarIcon } from "./CalendarIcon"
import { AddedIcon } from "@/components/AddedIcon"

const AddToCalendar: FC<{ match: Match }> = ({ match }) => {
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const handleClick = useCallback(async () => {
    await CalendarService.addEvent(match)
    setAlreadyAdded(true)
  }, [match])
  return (
    <Button
      isIconOnly
      color="success"
      aria-label="Add to calendar"
      onClick={handleClick}
    >
      {alreadyAdded ? <AddedIcon /> : <CalendarIcon />}
    </Button>
  )
}

export { AddToCalendar }
