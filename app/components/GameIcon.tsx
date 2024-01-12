import { Game } from "@/types/Match"
import Image from "next/image"

const GameIcon = ({ game }: { game: Game }) => {
  return (
    <span className="m-auto">
      <Image
        src={`/game-icons/${game}.png`}
        alt={`${game} icon`}
        width={32}
        height={32}
      />
    </span>
  )
}

export { GameIcon }
