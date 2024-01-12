import { Team as TeamType } from "@/types/Match"
import Image from "next/image"
import tw from "tailwind-styled-components"

const TeamName = tw.div`
  text-xs text-ellipsis text-center self-center md:text-lg
`

const Team = ({ team }: { team: TeamType }) => {
  return (
    <div className="flex flex-col gap-1 mt-3">
      <Image
        src={team.imgSrc || "/team-fallback.svg"}
        width={0}
        height={0}
        alt={`${team.name} icon`}
        className="mx-auto"
        style={{ width: "16px", height: "16px" }}
      />
      <TeamName>{team.name}</TeamName>
    </div>
  )
}

export { Team }
