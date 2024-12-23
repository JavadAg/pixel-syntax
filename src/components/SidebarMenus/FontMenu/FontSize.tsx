import { Input } from "@/components/ui/Input"
import useStore from "@/store/store"
import { fontSizeSchema } from "@/validations/configs.validation"
import { toast } from "sonner"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const FontSize = () => {
  const { fontSize } = useStore((state) => state.editorConfig)
  const setFontSize = useStore((state) => state.setFontSize)

  function handleFontSize(fontSize: number) {
    const isValid = fontSizeSchema.safeParse(fontSize)

    if (!isValid.success) {
      toast.error("Font size must be between 12 and 24")
      return
    }

    setFontSize(fontSize)
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
