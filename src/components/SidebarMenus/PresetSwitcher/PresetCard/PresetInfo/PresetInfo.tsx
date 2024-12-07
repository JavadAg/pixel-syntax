import type { Preset } from "@/types/presets.type"
import AutoResizingInput from "@/components/ui/AutoResizingInput"
import db from "@/libs/db"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { toast } from "sonner"
import { z } from "zod"
import PresetControl from "./PresetControl/PresetControl"

dayjs.extend(relativeTime)

type IProps = {
  preset: Preset
}

const nameSchema = z.string().min(1).max(20)

const PresetInfo: React.FC<IProps> = ({ preset }) => {
  function renamePreset(value: string) {
    try {
      nameSchema.parse(value)
      db.presets.where("id").equals(preset.id).modify({ name: value })
    } catch (error) {
      console.error(error)
      toast.error("Failed to rename preset")
    }
  }

  return (
    <div className="flex w-full items-center justify-between px-3 py-2">
      <div className="flex flex-wrap items-center justify-start gap-x-2">
        <AutoResizingInput
          data-testid="preset-name"
          maxLength={20}
          className="min-w-3 bg-transparent text-sm font-medium outline-none"
          value={preset.name}
          onChange={(e) => renamePreset(e.target.value)}
        />
        <span className="select-none text-xs text-muted-foreground">{dayjs(preset.updatedAt).fromNow()}</span>
      </div>
      <PresetControl presetId={preset.id} />
    </div>
  )
}

export default PresetInfo
