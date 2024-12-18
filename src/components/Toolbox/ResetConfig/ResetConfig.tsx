import Button from "@/components/ui/Button"
import useStore from "@/store/store"
import { RotateCcw } from "lucide-react"
import { toast } from "sonner"

const ResetConfig = () => {
  const resetConfig = useStore((state) => state.resetConfig)

  function handleResetConfig() {
    resetConfig()
    toast.success("Config reset successfully")
  }

  return (
    <Button onClick={() => handleResetConfig()} variant="outline">
      <RotateCcw />
      Reset
    </Button>
  )
}

export default ResetConfig
