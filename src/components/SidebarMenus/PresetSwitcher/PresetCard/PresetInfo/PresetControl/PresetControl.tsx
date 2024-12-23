import Button from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/Dropdown"
import { usePreset } from "@/hooks/use-preset"
import { Ellipsis, PenLine, Trash2 } from "lucide-react"
import { useState } from "react"

type IProps = {
  presetId: number
}

const PresetControl: React.FC<IProps> = ({ presetId }) => {
  const [open, setOpen] = useState(false)

  const { deletePreset, updatePreset } = usePreset()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Ellipsis size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        data-testid="preset-control-menu"
        className="flex flex-col items-start justify-start divide-y p-0"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            updatePreset(presetId)
          }}
          type="button"
          className="w-full justify-start"
        >
          <PenLine />
          Overwrite
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            deletePreset(presetId)
          }}
          type="button"
          className="w-full justify-start hover:bg-destructive"
        >
          <Trash2 />
          Delete
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PresetControl
