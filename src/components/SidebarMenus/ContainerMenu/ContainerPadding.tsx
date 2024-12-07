import type { ZodError } from "zod"
import Button from "@/components/ui/Button"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/Command"
import CommandValueInput from "@/components/ui/CommandValueInput"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { type Padding, paddingList } from "@/data/padding-presets"
import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import { paddingSchema } from "@/validations/editor-config.validation"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const ContainerPadding = () => {
  const { paddingX, paddingY } = useStore((state) => state.editorConfig)
  const setPadding = useStore((state) => state.setPadding)

  const [inputValueX, setInputValueX] = useState(paddingX.value)
  const [inputValueY, setInputValueY] = useState(paddingY.value)

  function handlePadding(padding: Padding, axis: "paddingX" | "paddingY") {
    try {
      paddingSchema.parse(padding.value)
    } catch (error: ZodError<typeof paddingSchema> | any) {
      for (const issue of error.issues) {
        console.error(`Error: ${issue.code} - ${issue.message} at ${issue.path.join(".")}`)

        toast.error(issue.message)
      }

      return
    }

    if (axis === "paddingX") setInputValueX(padding.value)
    if (axis === "paddingY") setInputValueY(padding.value)

    setPadding(axis, padding)
  }

  return (
    <SidebarItemWrapper>
      <span>Padding</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            data-testid="container-padding-trigger"
            variant="combo"
            role="combobox"
            className="max-h-8 justify-between"
          >
            {`${paddingX.name} x ${paddingY.name}`}
            <ChevronDown className="ml-auto mr-0 size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="container-padding-popover" className="w-auto max-w-xs">
          <div className="flex items-start justify-center gap-4">
            <div className="grid items-center">
              <label htmlFor="paddingX">Padding X</label>
              <Command>
                <CommandValueInput
                  id="paddingX"
                  placeholder="PaddingX Value"
                  value={inputValueX}
                  type="number"
                  onChange={(e) => {
                    handlePadding(
                      {
                        name: "Custom",
                        value: +e.target.value
                      },
                      "paddingX"
                    )
                  }}
                />
                <CommandList>
                  <CommandGroup>
                    {paddingList.map((padding) => (
                      <CommandItem
                        key={padding.name}
                        value={padding.name}
                        onSelect={() => {
                          handlePadding(padding, "paddingX")
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", padding?.name === paddingX.name ? "opacity-100" : "opacity-0")}
                        />
                        {padding.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
            <div className="grid items-center">
              <label htmlFor="paddingY">Padding Y</label>
              <Command>
                <CommandValueInput
                  id="paddingY"
                  placeholder="PaddingY Value"
                  value={inputValueY}
                  type="number"
                  onChange={(e) => {
                    handlePadding(
                      {
                        name: "Custom",
                        value: +e.target.value
                      },
                      "paddingY"
                    )
                  }}
                />
                <CommandList>
                  <CommandGroup>
                    {paddingList.map((padding) => (
                      <CommandItem
                        key={padding.name}
                        value={padding.name}
                        onSelect={() => {
                          handlePadding(padding, "paddingY")
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", padding?.name === paddingY.name ? "opacity-100" : "opacity-0")}
                        />
                        {padding.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </SidebarItemWrapper>
  )
}

export default ContainerPadding
