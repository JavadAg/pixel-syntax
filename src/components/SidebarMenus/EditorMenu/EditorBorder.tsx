import Button from "@/components/ui/Button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/Command"
import CommandValueInput from "@/components/ui/CommandValueInput"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { type Border, borders } from "@/data/border-presets"
import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import { borderSchema } from "@/validations/editor-config.validation"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const EditorBorder = () => {
  const [open, setOpen] = useState(false)

  const { border: selectedBorder } = useStore((state) => state.editorConfig)
  const setBorder = useStore((state) => state.setBorder)

  const [inputValue, setInputValue] = useState(selectedBorder.value)

  function validateBorder(border: Border) {
    setInputValue(border.value)

    const isValid = borderSchema.safeParse(border.value)

    if (!isValid.success) {
      toast.error("Invalid border. Example: '1px solid #000' or 'medium dashed rgba(0, 0, 0, 0.5)'")
      return
    }

    handleBorder(border)
  }

  function handleBorder(border: Border) {
    setInputValue(border.value)
    setBorder(border)
  }

  return (
    <SidebarItemWrapper>
      <span>Border</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            data-testid="editor-border-trigger"
            variant="combo"
            role="combobox"
            aria-expanded={open}
            className="max-h-8 justify-between"
          >
            {borders.find((border) => border.name === selectedBorder.name)?.name || "Custom"}
            <ChevronDown className="ml-auto mr-0 size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="editor-border-content" className="p-0">
          <Command>
            <CommandValueInput
              placeholder="Border Value"
              value={inputValue}
              onChange={(e) => {
                validateBorder({ name: "Custom", value: e.target.value })
              }}
            />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {borders.map((border) => (
                  <CommandItem
                    key={border.name}
                    value={border.name}
                    onSelect={() => {
                      handleBorder(border)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", border?.name === selectedBorder.name ? "opacity-100" : "opacity-0")}
                    />
                    {border.name}
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

export default EditorBorder
