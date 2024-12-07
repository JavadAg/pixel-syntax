import Button from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/Dropdown"
import db from "@/libs/db"
import useStore from "@/store/store"
import { Ellipsis, PenLine, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type IProps = {
  presetId: number
}

const PresetControl: React.FC<IProps> = ({ presetId }) => {
  const [open, setOpen] = useState(false)

  const editorConfig = useStore((state) => state.editorConfig)

  const configs = {
    background: editorConfig.background,
    paddingX: editorConfig.paddingX.name,
    paddingY: editorConfig.paddingY.name,
    radius: editorConfig.radius.name,
    opacity: editorConfig.opacity,
    isTransparent: editorConfig.isTransparent,
    isHeader: editorConfig.isHeader,
    headerType: editorConfig.headerType.name,
    shadow: editorConfig.shadow.name,
    border: editorConfig.border.name,
    editorRadius: editorConfig.editorRadius.name,
    theme: editorConfig.theme.id,
    isLineNumber: editorConfig.isLineNumber,
    fontFamily: editorConfig.fontFamily.id,
    fontSize: editorConfig.fontSize,
    fontWeight: editorConfig.fontWeight.name,
    lineHeight: editorConfig.lineHeight,
    isLigatures: editorConfig.isLigatures
  }

  function handleOverwrite() {
    try {
      db.presets.where("id").equals(presetId).modify({ configs })
      toast.success("Preset overwritten")
    } catch (error) {
      console.error(error)
      toast.error("Failed to overwrite preset")
    } finally {
      setOpen(false)
    }
  }

  function handleDelete() {
    try {
      db.presets.delete(presetId)
      toast.success("Preset deleted")
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete preset")
    } finally {
      setOpen(false)
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Ellipsis size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        data-testid="preset-control-menu"
        className="flex flex-col items-start justify-start space-y-2"
      >
        <Button
          onClick={() => handleOverwrite()}
          type="button"
          variant="secondary"
          className="h-8 w-full justify-start"
        >
          <PenLine />
          Overwrite
        </Button>
        <Button onClick={() => handleDelete()} variant="destructive" type="button" className="h-8 w-full justify-start">
          <Trash2 />
          Delete
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PresetControl
