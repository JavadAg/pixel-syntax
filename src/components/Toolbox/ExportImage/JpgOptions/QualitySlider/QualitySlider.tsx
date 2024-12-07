import type { ExportExtensionOption } from "@/types/export-config.type"
import { Slider } from "@/components/ui/Slider"
import React from "react"

type IProps = {
  opt: ExportExtensionOption
  setValue: (value: number) => void
}

const QualitySlider: React.FC<IProps> = ({ opt, setValue }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm capitalize">{opt.optionName}</span>
      <Slider
        value={[opt.value as number]}
        max={1}
        min={0.6}
        step={0.1}
        onValueChange={(val) => val[0] && setValue(+val[0])}
      />
    </div>
  )
}

export default QualitySlider
