import type { ExportExtension, ExportScale } from "@/types/export-config.type"
import { Slider } from "@/components/ui/Slider"

export const exportExtensions: ExportExtension[] = [
  {
    name: "Png",
    ext: "png",
    value: "toPng"
  },
  {
    name: "Jpg",
    ext: "jpg",
    value: "toJpeg",
    options: [
      {
        label: "Quality",
        name: "quality",
        defaultValue: 100,
        render: (opt, setValue) => (
          <div className="space-y-1">
            <label htmlFor="quality-slider" className="select-none text-sm capitalize">
              {opt.optionName} <span className="font-bold">{opt.value}%</span>
            </label>
            <Slider
              id="quality-slider"
              data-testid="quality-slider"
              value={[(opt.value as number) / 100]}
              max={1}
              min={0.6}
              step={0.01}
              onValueChange={(val) => val[0] && setValue(+val[0] * 100)}
            />
          </div>
        )
      }
    ]
  },
  {
    name: "Svg",
    ext: "svg",
    value: "toSvg"
  }
]

export const exportScales: ExportScale[] = [
  {
    name: "Original",
    value: 1
  },
  {
    name: "2x",
    value: 2
  },
  {
    name: "4x",
    value: 4
  },
  {
    name: "8x",
    value: 8
  }
]
