import Button from "@/components/ui/Button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/Collapsible"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/Sidebar"
import db from "@/libs/db"
import useStore from "@/store/store"
import { generateConfig } from "@/utils/helpers"
import { useLiveQuery } from "dexie-react-hooks"
import { ChevronsUpDown, Palette } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import PresetCard from "./PresetCard/PresetCard"

const PresetSwitcher = () => {
  const [opened, setOpened] = useState(false)
  const { open } = useSidebar()

  const presets = useLiveQuery(() => db.presets.toArray())
  const activePresetId = useLiveQuery(() => db.table("appState").get("activePresetId"))
  const activePreset = useLiveQuery(() => {
    if (activePresetId?.value) {
      return presets?.find((preset) => preset.id === activePresetId.value)
    }

    return undefined
  }, [activePresetId, presets])

  const editorConfig = useStore((state) => state.editorConfig)
  const setConfig = useStore((state) => state.setConfig)

  const configs = {
    background: editorConfig.background,
    paddingX: editorConfig.paddingX.name,
    paddingY: editorConfig.paddingY.name,
    radius: editorConfig.radius.name,
    opacity: editorConfig.opacity,
    isTransparent: editorConfig.isTransparent,
    isHeader: editorConfig.isHeader,
    headerType: editorConfig.headerType.name,
    shadow: editorConfig.shadow.name,
    border: editorConfig.border.name,
    editorRadius: editorConfig.editorRadius.name,
    theme: editorConfig.theme.id,
    isLineNumber: editorConfig.isLineNumber,
    fontFamily: editorConfig.fontFamily.id,
    fontSize: editorConfig.fontSize,
    fontWeight: editorConfig.fontWeight.name,
    lineHeight: editorConfig.lineHeight,
    isLigatures: editorConfig.isLigatures
  }

  async function changePreset(id: number) {
    const presets = await db.presets.toArray()

    const preset = presets.find((preset) => preset.id === id)
    if (!preset) return

    const presetConfig = generateConfig(preset)

    await db.table("appState").put({ key: "activePresetId", value: preset.id })
    setConfig({ ...editorConfig, ...presetConfig })
  }

  async function addPreset() {
    try {
      const preset = await db.presets.add({
        name: "New Preset",
        updatedAt: new Date(),
        createdAt: new Date(),
        configs
      })

      await changePreset(preset)

      toast.success("Preset added")
    } catch (error: any) {
      console.error(error)
      "message" in error
        ? toast.error(`Failed to add ${name}: ${error.message}`)
        : toast.error(`Failed to add ${name}: ${error}`)
    }
  }

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
                <span data-testid="active-preset-name" className="text-xs text-muted-foreground empty:hidden">
                  {activePreset?.name}
                </span>
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
              className="grid max-h-96 w-full gap-3 overflow-y-auto overflow-x-hidden rounded-md p-1"
            >
              {presets && presets.length > 0 ? (
                presets?.map((preset) => (
                  <PresetCard
                    key={preset.id}
                    isActive={activePresetId?.value && preset.id === activePresetId.value}
                    preset={preset}
                    onClick={() => changePreset(preset.id)}
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
