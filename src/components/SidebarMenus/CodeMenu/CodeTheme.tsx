import Button from "@/components/ui/Button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { resolveTheme, themeNames } from "@/data/editor-themes"
import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const CodeTheme = () => {
  const [open, setOpen] = useState(false)

  const { themeId, isTransparent } = useStore((state) => state.editorConfig)
  const setThemeId = useStore((state) => state.setThemeId)

  function handleTheme(id: string) {
    setThemeId(id)
    setOpen(false)
  }

  const theme = resolveTheme(themeId, isTransparent)

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
            {theme?.name || "Select theme..."}
            <ChevronDown className="ml-auto mr-0 size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="code-theme-content" className="p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {themeNames.map((theme) => (
                  <CommandItem
                    key={theme.id}
                    value={theme.id}
                    onSelect={() => {
                      handleTheme(theme.id)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", themeId === theme.id ? "opacity-100" : "opacity-0")} />
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
