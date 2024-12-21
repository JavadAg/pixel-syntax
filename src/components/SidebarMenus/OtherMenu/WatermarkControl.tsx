import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Slider } from "@/components/ui/Slider"
import { Switch } from "@/components/ui/Switch"
import useStore from "@/store/store"
import { toast } from "sonner"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const WatermarkControl = () => {
  const { isWatermark, watermarkControls } = useStore((state) => state.editorConfig)
  const setWatermark = useStore((state) => state.setWatermark)
  const setWatermarkControls = useStore((state) => state.setWatermarkControls)

  function handleWatermarkControls(type: "location" | "opacity" | "text", value: string) {
    switch (type) {
      case "location":
        setWatermarkControls({ ...watermarkControls, location: value as "container" | "editor" })
        break
      case "opacity":
        setWatermarkControls({ ...watermarkControls, opacity: Number(value) })
        break
      case "text": {
        if (value.length <= 40) setWatermarkControls({ ...watermarkControls, text: value })
        else toast.error("Watermark must be less than 40 characters")
      }
    }
  }

  return (
    <SidebarItemWrapper>
      <span>Watermark</span>
      <div className="flex items-center justify-end">
        <Switch data-testid="watermark-switch" checked={isWatermark} onCheckedChange={setWatermark} />
      </div>

      {isWatermark && (
        <>
          <span>Location</span>
          <Select value={watermarkControls.location} onValueChange={(val) => handleWatermarkControls("location", val)}>
            <SelectTrigger data-testid="watermark-place-select" className="max-h-8">
              <SelectValue placeholder="Place" />
            </SelectTrigger>
            <SelectContent data-testid="watermark-place-select-content">
              <SelectItem value="container">Container</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
            </SelectContent>
          </Select>

          <span>Opacity</span>
          <Slider
            data-testid="watermark-opacity-slider"
            value={[watermarkControls.opacity]}
            max={100}
            min={-1}
            step={1}
            onValueChange={(val) => val[0] && handleWatermarkControls("opacity", String(val[0]))}
          />

          <span>Content</span>
          <Input
            data-testid="watermark-input"
            value={watermarkControls.text}
            onChange={(e) => handleWatermarkControls("text", e.target.value)}
            placeholder="Watermark"
          />
        </>
      )}
    </SidebarItemWrapper>
  )
}

export default WatermarkControl
