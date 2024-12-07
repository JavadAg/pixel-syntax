export type ExportConfig = {
  exportExtension: ExportExtension
  exportExtensionOptions: ExportExtensionOption[] | null
  exportScale: ExportScale
  exportName: string
}

export type ExportScale = {
  name: string
  value: number
}

type ExportOptionValue = string | number | null
export type ExportExtensionOption = { optionName: string; value: ExportOptionValue }

export type ExportExtension = {
  name: "Png" | "Jpg" | "Svg"
  ext: "png" | "jpg" | "svg"
  value: "toPng" | "toJpeg" | "toSvg"
  options?: {
    label: string
    name: string
    defaultValue: ExportOptionValue
    render: (opt: ExportExtensionOption, setValue: (value: number) => void) => React.ReactNode
  }[]
}
