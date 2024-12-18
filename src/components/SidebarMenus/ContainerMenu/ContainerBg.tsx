import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/Accordion"
import { type ColorPreset, gradientColors, solidColors } from "@/data/color-presets"
import useStore from "@/store/store"
import { useState } from "react"
import ReactGPicker from "react-gcolor-picker"
import MenuAccordionTrigger from "../MenuAccordionTrigger/MenuAccordionTrigger"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const ContainerBg = () => {
  const [colorPresets, setColorPresets] = useState<ColorPreset>(gradientColors)

  const { background } = useStore((state) => state.editorConfig)
  const setBackground = useStore((state) => state.setBackground)

  const handleColor = (color: string) => {
    setBackground(color)
  }

  function handleColorPickerTab(value: string) {
    if (value === "solid") {
      setColorPresets(solidColors)
      setBackground(solidColors.colors[4]!)
    } else {
      setColorPresets(gradientColors)
      setBackground(gradientColors.colors[3]!)
    }
  }

  return (
    <SidebarItemWrapper className="grid-cols-1">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" data-testid="container-bg-trigger">
          <MenuAccordionTrigger title="Background" style={{ background }} />
          <AccordionContent
            className="dark:[&_.popup\_tabs-header>.popup\_tabs-header-label-active]:bg-background/60 dark:[&_.popup\_tabs-header>.popup\_tabs-header-label-active]:text-foreground/90 [&_.popup\_tabs-header>div]:h-9 [&_.popup\_tabs-header]:h-9 dark:[&_.popup\_tabs-header]:bg-secondary [&_.popup\_tabs]:!w-full [&_.popup\_tabs]:!shadow-none dark:[&_.popup\_tabs]:!bg-background/60 dark:[&_.popup\_tabs_.color-picker-panel]:!bg-background/60 dark:[&_.popup\_tabs_.colorpicker]:!bg-background/60 [&_.popup\_tabs_.popup\_tabs-body]:!p-2"
            data-testid="container-bg-content"
          >
            <ReactGPicker
              defaultActiveTab="gradient"
              showAlpha={false}
              gradient
              allowAddGradientStops={false}
              debounceMS={100}
              format="rgb"
              defaultColors={colorPresets.colors}
              showGradientMode={false}
              onChangeTabs={handleColorPickerTab}
              value={background}
              onChange={handleColor}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SidebarItemWrapper>
  )
}

export default ContainerBg
