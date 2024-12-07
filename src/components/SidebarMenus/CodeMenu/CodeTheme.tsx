import Button from "@/components/ui/Button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { themes } from "@/data/editor-themes"
import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const CodeTheme = () => {
  const [open, setOpen] = useState(false)

  const { theme: selectedTheme } = useStore((state) => state.editorConfig)
  const setTheme = useStore((state) => state.setTheme)

  function handleTheme(theme: (typeof themes)[number]) {
    setTheme(theme)
    setOpen(false)
  }

  return (
    <SidebarItemWrapper>
      <span>Theme</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            data-testid="code-theme-trigger"
            variant="combo"
            role="combobox"
            aria-expanded={open}
            className="max-h-8 justify-between"
          >
            {selectedTheme?.name || "Select theme..."}
            <ChevronDown className="ml-auto mr-0 size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="code-theme-content" className="p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {themes.map((theme) => (
                  <CommandItem
                    key={theme.id}
                    value={theme.id}
                    onSelect={() => {
                      handleTheme(theme)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedTheme?.id === theme.id ? "opacity-100" : "opacity-0")}
                    />
                    {theme.name}
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

export default CodeTheme
