import type { Preset } from "@/types/presets.type"
import AutoResizingInput from "@/components/ui/AutoResizingInput"
import { usePreset } from "@/hooks/use-preset"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useState } from "react"
import PresetControl from "./PresetControl/PresetControl"

dayjs.extend(relativeTime)

type IProps = {
  preset: Preset
}

const PresetInfo: React.FC<IProps> = ({ preset }) => {
  const [name, setName] = useState(preset.name)

  const { renamePreset } = usePreset()

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
    renamePreset(preset.id, e.target.value)
  }

  return (
    <div className="flex w-full items-center justify-between px-3 py-2">
      <div className="flex flex-wrap items-center justify-start gap-x-2">
        <AutoResizingInput
          data-testid="preset-name"
          maxLength={20}
          className="min-w-3 bg-transparent text-sm font-medium outline-none"
          value={name}
          onChange={(e) => handleNameChange(e)}
        />
        <span className="select-none text-xs text-muted-foreground">{dayjs(preset.updatedAt).fromNow()}</span>
      </div>
      <PresetControl presetId={preset.id} />
    </div>
  )
}

export default PresetInfo
