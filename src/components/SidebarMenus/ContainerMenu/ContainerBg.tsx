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
        <AccordionItem data-testid="container-bg" value="item-1">
          <MenuAccordionTrigger title="Background" style={{ background }} />
          <AccordionContent data-testid="accordion-content">
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
            {/* <Tabs defaultValue="color">
              <TabsList>
                <TabsTrigger value="color">Color</TabsTrigger>
                <TabsTrigger value="image">Image</TabsTrigger>
              </TabsList>
              <TabsContent value="color">
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
              </TabsContent>
              <TabsContent value="image">Image</TabsContent>
            </Tabs> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SidebarItemWrapper>
  )
}

export default ContainerBg
