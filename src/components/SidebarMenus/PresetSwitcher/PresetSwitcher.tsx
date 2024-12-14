import Button from "@/components/ui/Button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/Collapsible"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/Sidebar"
import { usePreset } from "@/hooks/use-preset"
import { ChevronsUpDown, Palette } from "lucide-react"
import { useState } from "react"
import PresetCard from "./PresetCard/PresetCard"

const PresetSwitcher = () => {
  const [opened, setOpened] = useState(false)

  const { open } = useSidebar()
  const { presets, addPreset, changePreset, activePreset } = usePreset()

  return (
    <SidebarMenu>
      <Collapsible
        open={opened && open}
        onOpenChange={(o) => {
          if (!open && opened) return
          setOpened(o)
        }}
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              data-testid="preset-switcher-button"
              size="lg"
              className="h-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Palette className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Presets</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent data-testid="preset-switcher-content" className="space-y-3 pt-3">
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={() => addPreset()}>
              Create preset
            </Button>
            <div
              data-testid="preset-switcher-list"
              className="flex max-h-96 w-full flex-col gap-3 overflow-y-auto overflow-x-hidden rounded-md p-1"
            >
              {presets && presets.length > 0 ? (
                presets?.map((preset) => (
                  <PresetCard
                    key={preset.id}
                    isActive={preset.id === activePreset?.id}
                    preset={preset}
                    onClick={() => {
                      changePreset(preset.id)
                    }}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-start gap-2">
                  <span className="text-sm text-muted-foreground">No presets found</span>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  )
}

export default PresetSwitcher
