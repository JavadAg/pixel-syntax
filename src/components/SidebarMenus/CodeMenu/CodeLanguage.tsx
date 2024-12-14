import type { LanguageName } from "@uiw/codemirror-extensions-langs"
import Button from "@/components/ui/Button"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { languageNames } from "@/data/language-configs"
import useStore from "@/store/store"
import { cn, resolveLanguage } from "@/utils/helpers"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const CodeLanguage = () => {
  const [open, setOpen] = useState(false)

  const activeTabId = useStore((state) => state.activeTabId)
  const getTab = useStore((state) => state.getTab)
  const updateTab = useStore((state) => state.updateTab)

  function handleLanguage(id: LanguageName) {
    updateTab(activeTabId, { languageId: id })
    setOpen(false)
  }

  const language = resolveLanguage(getTab().languageId)

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
            {language.name || "Select language..."}
            <ChevronDown className="ml-auto mr-0 size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="code-language-content" className="p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandGroup>
                {languageNames.map((lang) => (
                  <CommandItem
                    key={lang.id}
                    value={lang.id}
                    onSelect={() => {
                      handleLanguage(lang.id)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", language?.name === lang.name ? "opacity-100" : "opacity-0")} />
                    {lang.name}
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
