import type { ZodError } from "zod"
import Button from "@/components/ui/Button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/Command"
import CommandValueInput from "@/components/ui/CommandValueInput"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { type Radius, radiusList } from "@/data/radius-presets"
import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import { radiusSchema } from "@/validations/editor-config.validation"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const EditorRadius = () => {
  const [open, setOpen] = useState(false)

  const { editorRadius: selectedRadius } = useStore((state) => state.editorConfig)
  const setEditorRadius = useStore((state) => state.setEditorRadius)

  const [inputValue, setInputValue] = useState(selectedRadius)

  function validateBorderRadius(radius: Radius) {
    try {
      radiusSchema.parse(radius.value)
    } catch (error: ZodError<typeof radiusSchema> | any) {
      for (const issue of error.issues) {
        console.error(`Error: ${issue.code} - ${issue.message} at ${issue.path.join(".")}`)

        toast.error(issue.message)
      }

      return
    }

    handleBorderRadius(radius)
  }

  function handleBorderRadius(radius: Radius) {
    setInputValue(radius)
    setEditorRadius(radius)
  }

  return (
    <SidebarItemWrapper>
      <span>Radius</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            data-testid="editor-radius-trigger"
            variant="combo"
            role="combobox"
            aria-expanded={open}
            className="max-h-8 justify-between"
          >
            {radiusList.find((radius) => radius.name === selectedRadius.name)?.name || "Custom"}
            <ChevronDown className="ml-auto mr-0 size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="editor-radius-content" className="p-0">
          <Command>
            <CommandValueInput
              placeholder="Radius Value"
              value={inputValue.value}
              type="number"
              onChange={(e) => {
                validateBorderRadius({
                  name: "Custom",
                  value: +e.target.value
                })
              }}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {radiusList.map((radius) => (
                  <CommandItem
                    key={radius.name}
                    value={radius.name}
                    onSelect={() => {
                      handleBorderRadius(radius)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", radius?.name === selectedRadius.name ? "opacity-100" : "opacity-0")}
                    />
                    {radius.name}
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

export default EditorRadius
