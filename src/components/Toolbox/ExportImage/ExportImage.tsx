import type { ExportExtension } from "@/types/export-config.type"
import Button from "@/components/ui/Button"
import useStore from "@/store/store"
import domtoimage from "dom-to-image-more"
import { ArrowDownToLine } from "lucide-react"
import { toast } from "sonner"
import ExportOptions from "./ExportOptions/ExportOptions"

const ExportImage = () => {
  const editorContainerRef = useStore((state) => state.editorContainerRef)

  const { exportExtension, exportExtensionOptions, exportName, exportScale } = useStore((state) => state.exportConfig)

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
      const width = editorContainerRef.offsetWidth
      const height = editorContainerRef.offsetHeight

      try {
        const dataUrl = await domtoimage[value](editorContainerRef, {
          copyDefaultStyles: false,
          scale: exportScale.value,
          height,
          width,
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

  return (
    <div className="flex items-center">
      <ExportOptions />
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
