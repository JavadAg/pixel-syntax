import type { ExportExtension } from "@/types/export-config.type"
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"
import { exportExtensions, exportScales } from "@/data/export-configs"
import useStore from "@/store/store"
import domtoimage from "dom-to-image-more"
import { ArrowDownToLine, Settings2 } from "lucide-react"
import { type ChangeEvent, Fragment } from "react"
import { toast } from "sonner"
import { z } from "zod"
import ExportConfigWrapper from "./ExportConfigWrapper/ExportConfigWrapper"

const nameSchema = z.string().min(1).max(20)

const ExportImage = () => {
  const editorContainerRef = useStore((state) => state.editorContainerRef)

  const { exportExtension, exportExtensionOptions, exportName, exportScale } = useStore((state) => state.exportConfig)
  const setExportScale = useStore((state) => state.setExportScale)
  const setExportExtension = useStore((state) => state.setExportExtension)
  const setExportExtensionOptions = useStore((state) => state.setExportExtensionOptions)
  const setExportName = useStore((state) => state.setExportName)

  function handleScale(scale: string) {
    const selectedScale = exportScales.find((item) => item.value === +scale)
    selectedScale && setExportScale(selectedScale)
  }

  function handleExtension(extension: string) {
    const selectedExtension = exportExtensions.find((item) => item.value === extension)
    selectedExtension && setExportExtension(selectedExtension)
  }

  function handleName(event: ChangeEvent<HTMLInputElement>) {
    const isValid = nameSchema.safeParse(event.target.value)

    if (!isValid.success) {
      toast.error("Name must be between 1 and 20 characters")
      return
    }

    setExportName(event.target.value)
  }

  const handleExportImage = async (format: ExportExtension) => {
    const { value, name } = format
    const exportOptions = exportExtensionOptions?.reduce(
      (o, key) => Object.assign(o, { [key.optionName]: key.value }),
      {}
    )

    function filter(node: Node) {
      if (node instanceof HTMLElement) {
        if (node.hasAttribute("data-exclude")) {
          return false
        }
      }
      return true
    }

    if (editorContainerRef) {
      try {
        const dataUrl = await domtoimage[value](editorContainerRef, {
          copyDefaultStyles: false,
          scale: exportScale.value,
          filter,
          ...exportOptions
        })

        const link = document.createElement("a")
        link.download = `${exportName}.${name}`
        link.href = dataUrl
        link.click()
        toast.success("Image exported successfully")
      } catch (error: any) {
        toast.error(`Failed to export: ${"message" in error ? error.message : String(error)}`)
      }
    }
  }

  function handleJpgQuality(value: number) {
    if (!exportExtensionOptions) return

    const options = exportExtensionOptions.map((opt) => {
      if (opt.optionName === "quality") {
        return { ...opt, value }
      }

      return opt
    })
    setExportExtensionOptions(options)
  }

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button data-testid="export-image-popover-button" variant="outline" size="icon" className="rounded-r-none">
            <Settings2 />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-testid="export-image-popover"
          align="start"
          sideOffset={10}
          className="w-full min-w-32 space-y-4"
        >
          <ExportConfigWrapper title="Name">
            <Input value={exportName} onChange={handleName} type="text" className="h-9" />
          </ExportConfigWrapper>

          <ExportConfigWrapper title="Extension">
            <ToggleGroup
              data-testid="export-image-extension"
              value={exportExtension.value}
              onValueChange={handleExtension}
              type="single"
              className="flex w-full"
            >
              {exportExtensions.map((ext) => (
                <ToggleGroupItem key={ext.value} value={ext.value}>
                  {ext.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </ExportConfigWrapper>
          {exportExtension.options && (
            <div className="!mt-2 flex flex-col gap-2">
              {exportExtension.options.map((option) => {
                const opt = exportExtensionOptions!.find((opt) => opt.optionName === option.name)
                return <Fragment key={option.name}>{option.render(opt!, handleJpgQuality)}</Fragment>
              })}
            </div>
          )}

          <ExportConfigWrapper title="Scale">
            <ToggleGroup
              data-testid="export-image-scale"
              value={exportScale.value.toString()}
              onValueChange={handleScale}
              type="single"
              className="flex w-full"
            >
              {exportScales.map((scale) => (
                <ToggleGroupItem key={scale.value} value={scale.value.toString()}>
                  {scale.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </ExportConfigWrapper>
        </PopoverContent>
      </Popover>
      <Button
        onClick={() => handleExportImage(exportExtension)}
        className="rounded-l-none border-l-0 pl-2"
        variant="outline"
      >
        <ArrowDownToLine />
        Export
      </Button>
    </div>
  )
}

export default ExportImage
