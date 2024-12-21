import type { DecorationType } from "@/types/tabs.type"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"
import { useDecoration } from "@/hooks/use-decoration"
import { Eraser, Highlighter, ListPlus, ListX, ScanEye } from "lucide-react"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const decorToggles: { value: DecorationType; label: string; icon: any }[] = [
  { value: "highlighted", label: "Highlighted", icon: <Highlighter /> },
  { value: "added", label: "Added", icon: <ListPlus /> },
  { value: "removed", label: "Removed", icon: <ListX /> },
  { value: "focused", label: "Focused", icon: <ScanEye /> }
]

const CodeDecoration = () => {
  const { decorType, updateDecorType } = useDecoration()

  return (
    <SidebarItemWrapper>
      <Accordion className="col-span-full" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger data-testid="code-decoration-trigger" withIcon className="w-full whitespace-nowrap">
            Decorations
          </AccordionTrigger>
          <AccordionContent data-testid="code-decoration-content" className="">
            <ToggleGroup
              className="grid grid-cols-2"
              type="single"
              value={decorType || ""}
              onValueChange={(value) => updateDecorType(value as DecorationType)}
            >
              {decorToggles.map(({ value, label, icon }) => (
                <ToggleGroupItem key={value} value={value} variant={"outline"}>
                  {icon}
                  {label}
                </ToggleGroupItem>
              ))}
              <ToggleGroupItem value="clear" variant={"outline"} className="col-span-2">
                <Eraser />
                Clear
              </ToggleGroupItem>
            </ToggleGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SidebarItemWrapper>
  )
}

export default CodeDecoration
