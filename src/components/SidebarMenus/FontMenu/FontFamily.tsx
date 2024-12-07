import Button from "@/components/ui/Button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { type Font, fonts } from "@/data/editor-fonts"

import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const FontFamily = () => {
  const [open, setOpen] = useState(false)

  const { fontFamily } = useStore((state) => state.editorConfig)
  const setFontFamily = useStore((state) => state.setFontFamily)

  function handleFont(font: Font) {
    setFontFamily(font)
    setOpen(false)
  }

  return (
    <SidebarItemWrapper>
      <span>Family</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            data-testid="font-family-trigger"
            variant="combo"
            role="combobox"
            aria-expanded={open}
            className="max-h-8 justify-between"
          >
            {fontFamily ? fonts.find((font) => font.id === fontFamily.id)?.name : "Select font..."}
            <ChevronDown className="ml-auto mr-0 size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="font-family-popover" className="p-0">
          <Command>
            <CommandInput placeholder="Search font..." />
            <CommandList>
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup>
                {fonts.map((font) => (
                  <CommandItem
                    key={font.id}
                    style={{
                      fontFamily: font.value
                    }}
                    value={font.id}
                    onSelect={() => {
                      handleFont(font)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", fontFamily?.id === font.id ? "opacity-100" : "opacity-0")} />
                    {font.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </SidebarItemWrapper>
  )
}

export default FontFamily
