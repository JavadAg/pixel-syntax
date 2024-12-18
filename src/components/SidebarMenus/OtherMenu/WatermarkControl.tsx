import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Slider } from "@/components/ui/Slider"
import { Switch } from "@/components/ui/Switch"
import useStore from "@/store/store"
import { toast } from "sonner"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const WatermarkControl = () => {
  const { isWatermark, watermarkText, watermarkOpacity, watermarkLocation } = useStore((state) => state.editorConfig)
  const setWatermark = useStore((state) => state.setWatermark)
  const setWatermarkText = useStore((state) => state.setWatermarkText)
  const setWatermarkOpacity = useStore((state) => state.setWatermarkOpacity)
  const setWatermarkLocation = useStore((state) => state.setWatermarkLocation)

  function handleWatermark(value: string) {
    if (value.length <= 40) setWatermarkText(value)
    else toast.error("Watermark must be less than 40 characters")
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
          <Select value={watermarkLocation} onValueChange={setWatermarkLocation}>
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
            value={[watermarkOpacity]}
            max={100}
            min={-1}
            step={1}
            onValueChange={(val) => val[0] && setWatermarkOpacity(val[0])}
          />

          <span>Content</span>
          <Input
            data-testid="watermark-input"
            value={watermarkText}
            onChange={(e) => handleWatermark(e.target.value)}
            placeholder="Watermark"
          />
        </>
      )}
    </SidebarItemWrapper>
  )
}

export default WatermarkControl
