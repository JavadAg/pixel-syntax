import { Input } from "@/components/ui/Input"
import useStore from "@/store/store"
import { toast } from "sonner"
import { z } from "zod"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const fontSizeSchema = z.number().min(12).max(24)

const FontSize = () => {
  const { fontSize } = useStore((state) => state.editorConfig)
  const setFontSize = useStore((state) => state.setFontSize)

  function handleFontSize(fontSize: number) {
    try {
      fontSizeSchema.parse(fontSize)
      setFontSize(fontSize)
    } catch (error) {
      console.error(error)
      toast.error("Failed to set font size, must be between 12 and 24")
    }
  }

  return (
    <SidebarItemWrapper>
      <span>Size</span>
      <Input
        data-testid="font-size-input"
        type="number"
        value={fontSize}
        onChange={(e) => handleFontSize(Number(e.target.value))}
      />
    </SidebarItemWrapper>
  )
}

export default FontSize
