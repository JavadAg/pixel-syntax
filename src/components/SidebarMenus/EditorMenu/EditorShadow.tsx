import type { ZodError } from "zod"
import Button from "@/components/ui/Button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/Command"
import CommandValueInput from "@/components/ui/CommandValueInput"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { type Shadow, shadowList } from "@/data/shadow-presets"
import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import { shadowSchema } from "@/validations/editor-config.validation"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const EditorShadow = () => {
  const [open, setOpen] = useState(false)

  const { shadow: selectedShadow } = useStore((state) => state.editorConfig)
  const setShadow = useStore((state) => state.setShadow)

  const [inputValue, setInputValue] = useState(selectedShadow.value)

  function validateShadow(shadow: Shadow) {
    setInputValue(shadow.value)

    try {
      shadowSchema.parse(shadow.value)
    } catch (error: ZodError<typeof shadowSchema> | any) {
      for (const issue of error.issues) {
        console.error(`Error: ${issue.code} - ${issue.message} at ${issue.path.join(".")}`)

        toast.error(issue.message)
      }

      return
    }

    handleShadow(shadow)
  }

  function handleShadow(shadow: Shadow) {
    setInputValue(shadow.value)
    setShadow(shadow)
  }

  return (
    <SidebarItemWrapper>
      <span>Shadow</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            data-testid="editor-shadow-trigger"
            variant="combo"
            role="combobox"
            aria-expanded={open}
            className="max-h-8 justify-between"
          >
            {shadowList.find((shadow) => shadow.name === selectedShadow.name)?.name || "Custom"}
            <ChevronDown className="ml-auto mr-0 size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="editor-shadow-content" className="p-0">
          <Command>
            <CommandValueInput
              placeholder="Shadow Value"
              value={inputValue}
              onChange={(e) => {
                validateShadow({ name: "Custom", value: e.target.value })
              }}
            />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {shadowList.map((shadow) => (
                  <CommandItem
                    key={shadow.name}
                    value={shadow.name}
                    onSelect={() => {
                      handleShadow(shadow)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", shadow?.name === selectedShadow.name ? "opacity-100" : "opacity-0")}
                    />
                    {shadow.name}
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

export default EditorShadow