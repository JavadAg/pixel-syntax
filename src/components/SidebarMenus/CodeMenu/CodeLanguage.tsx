import Button from "@/components/ui/Button"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import languageConfigs, { type LanguageConfig } from "@/data/language-configs"
import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const CodeLanguage = () => {
  const [open, setOpen] = useState(false)
  const setTabs = useStore((state) => state.setTabs)
  const activeTab = useStore((state) => state.getActiveTab)

  function handleLanguage(language: LanguageConfig) {
    const newTab = { ...activeTab(), tabLanguage: language }
    setTabs(activeTab().id, newTab)
    setOpen(false)
  }

  return (
    <SidebarItemWrapper>
      <span>Language</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            data-testid="code-language-trigger"
            variant="combo"
            role="combobox"
            aria-expanded={open}
            className="max-h-8 justify-between"
          >
            {activeTab()?.tabLanguage?.label || "Select language..."}
            <ChevronDown className="ml-auto mr-0 size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="code-language-content" className="p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandGroup>
                {languageConfigs.map((lang) => (
                  <CommandItem
                    key={lang.label}
                    value={lang.label}
                    onSelect={() => {
                      handleLanguage(lang)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        activeTab()?.tabLanguage?.label === lang.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {lang.label}
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

export default CodeLanguage
