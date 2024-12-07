import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import useStore from "@/store/store"
import React from "react"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const FontWeight = () => {
  const { fontWeight, fontFamily } = useStore((state) => state.editorConfig)
  const setFontWeight = useStore((state) => state.setFontWeight)

  function handleFontWeight(weight: string) {
    const selectedWeight = fontFamily.weights.find((w) => w.value.toString() === weight)
    if (!selectedWeight) return
    setFontWeight(selectedWeight)
  }

  return (
    <SidebarItemWrapper>
      <span>Weight</span>
      <Select value={fontWeight.value.toString()} onValueChange={handleFontWeight}>
        <SelectTrigger data-testid="font-weight-select" className="max-h-8">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent data-testid="font-weight-select-content">
          {fontFamily.weights.map((weight) => (
            <SelectItem key={weight.name} value={weight.value.toString()}>
              {weight.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SidebarItemWrapper>
  )
}

export default FontWeight
