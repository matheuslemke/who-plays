"use client"

import { Match } from "@/types/Match"
import { Button } from "@nextui-org/react"
import { FC, useCallback, useState } from "react"
import { CalendarIcon } from "./CalendarIcon"
import { AddedIcon } from "@/components/AddedIcon"
import { addToCalendar } from "@/actions"
import { login } from "@/services/loginService"

const AddToCalendar: FC<{ match: Match }> = ({ match }) => {
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const handleClick = useCallback(async () => {
    const session = await login()
    if (!session) {
      return
    }
    console.log('No session, please login')
    addToCalendar(match, session)
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
