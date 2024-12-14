import { cn } from "@/utils/helpers"
import { Circle } from "lucide-react"

type IProps = {
  variant: "outline" | "default" | "colored"
}

const MacControl: React.FC<IProps> = ({ variant }) => {
  return (
    <div data-testid="mac-control" className="mr-3 flex items-center gap-2">
      <Circle
        size={16}
        className={cn(
          variant === "outline" && "text-red-400",
          variant === "colored" && "fill-red-400 text-red-400",
          variant === "default" && "fill-gray-400 text-gray-400"
        )}
      />
      <Circle
        size={16}
        className={cn(
          variant === "outline" && "text-yellow-400",
          variant === "colored" && "fill-yellow-400 text-yellow-400",
          variant === "default" && "fill-gray-400 text-gray-400"
        )}
      />
      <Circle
        size={16}
        className={cn(
          variant === "outline" && "text-green-400",
          variant === "colored" && "fill-green-500 text-green-500",
          variant === "default" && "fill-gray-400 text-gray-400"
        )}
      />
    </div>
  )
}

export default MacControl
