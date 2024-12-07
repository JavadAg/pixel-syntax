import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import useStore from "@/store/store"
import React from "react"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const lineHeightOptions = [
  {
    id: 1,
    name: "1",
    value: "1"
  },
  {
    id: 2,
    name: "1.2",
    value: "1.2"
  },
  {
    id: 3,
    name: "1.5 (Default)",
    value: "1.5"
  },
  {
    id: 4,
    name: "1.8",
    value: "1.8"
  },
  {
    id: 5,
    name: "2",
    value: "2"
  }
]

const FontLineHeight = () => {
  const { lineHeight } = useStore((state) => state.editorConfig)
  const setLineHeight = useStore((state) => state.setLineHeight)

  function handleLineHeight(lineHeight: string) {
    setLineHeight(lineHeight)
  }

  return (
    <SidebarItemWrapper>
      <span>Line Height</span>
      <Select value={lineHeight} onValueChange={handleLineHeight}>
        <SelectTrigger data-testid="font-line-height-select" className="max-h-8">
          <SelectValue placeholder="Line Height" />
        </SelectTrigger>
        <SelectContent data-testid="font-line-height-select-content">
          {lineHeightOptions.map((option) => (
            <SelectItem key={option.id} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SidebarItemWrapper>
  )
}

export default FontLineHeight
