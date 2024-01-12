import { Team as TeamType } from "@/types/Match"
import Image from "next/image"
import tw from "tailwind-styled-components"

const TeamName = tw.div`
  text-xs text-ellipsis text-center self-center md:text-lg
`

const Team = ({ team }: { team: TeamType }) => {
  return (
    <div className="flex flex-col gap-1 mt-1">
      <Image
        src={team.imgSrc || "/team-fallback.svg"}
        width={32}
        height={32}
        alt={`${team.name} icon`}
        className="mx-auto"
      />
      <TeamName>{team.name}</TeamName>
    </div>
  )
}

export { Team }
