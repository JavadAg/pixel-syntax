import db from "@/libs/db"
import useStore from "@/store/store"
import { useLiveQuery } from "dexie-react-hooks"
import { debounce } from "lodash-es"
import { useCallback } from "react"
import { toast } from "sonner"
import { z } from "zod"

const nameSchema = z.string().min(1).max(20)

export const usePreset = () => {
  const presets = useLiveQuery(() => db.presets.toArray())
  const activePresetId = useLiveQuery(() => db.table("appState").get("activePresetId"))
  const activePreset = useLiveQuery(() => {
    if (activePresetId?.value) {
      return presets?.find((preset) => preset.id === activePresetId.value)
    }

    return undefined
  }, [activePresetId, presets])

  const editorConfig = useStore((state) => state.editorConfig)

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

  async function addPreset() {
    try {
      const preset = await db.presets.add({
        name: "New Preset",
        updatedAt: new Date(),
        createdAt: new Date(),
        configs
      })

      await db.table("appState").put({ key: "activePresetId", value: preset })

      toast.success("Preset added")
    } catch (error: any) {
      console.error(error)
      "message" in error
        ? toast.error(`Failed to add ${name}: ${error.message}`)
        : toast.error(`Failed to add ${name}: ${error}`)
    }
  }

  async function changePreset(presetId: number) {
    try {
      await db.table("appState").put({ key: "activePresetId", value: presetId })
    } catch (error: any) {
      console.error(error)
      "message" in error
        ? toast.error(`Failed to change ${name}: ${error.message}`)
        : toast.error(`Failed to change ${name}: ${error}`)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renamePreset = useCallback(
    debounce((presetId: number, name: string) => {
      updatePreset(presetId, name)
    }, 1000),
    []
  )

  async function updatePreset(presetId: number, name?: string) {
    try {
      if (name) {
        nameSchema.parse(name)
        await db.presets.where("id").equals(presetId).modify({ name, updatedAt: new Date() })
      } else {
        await db.presets.where("id").equals(presetId).modify({ configs, updatedAt: new Date() })
      }
      toast.success("Preset updated")
    } catch (error: any) {
      console.error(error)
      "message" in error
        ? toast.error(`Failed to update ${name}: ${error.message}`)
        : toast.error(`Failed to update ${name}: ${error}`)
    }
  }

  async function deletePreset(presetId: number) {
    try {
      const isCurrentPreset = activePresetId?.value === presetId

      await db.presets.where("id").equals(presetId).delete()

      if (isCurrentPreset) {
        await db.table("appState").put({ key: "activePresetId", value: null })
      }

      toast.success("Preset deleted")
    } catch (error: any) {
      console.error(error)
      "message" in error
        ? toast.error(`Failed to delete ${name}: ${error.message}`)
        : toast.error(`Failed to delete ${name}: ${error}`)
    }
  }

  return { presets, activePreset, activePresetId, addPreset, changePreset, updatePreset, deletePreset, renamePreset }
}
