import type { EditorConfig } from "@/types/editor-config.type"
import type { Preset } from "@/types/presets.type"
import { borders } from "@/data/border-presets"
import { fonts } from "@/data/editor-fonts"
import { paddings } from "@/data/padding-presets"
import { radii } from "@/data/radius-presets"
import { shadows } from "@/data/shadow-presets"
import db from "@/libs/db"
import useStore from "@/store/store"
import { useLiveQuery } from "dexie-react-hooks"
import { debounce } from "lodash-es"
import { useCallback, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

const nameSchema = z.string().min(1).max(20)

export const usePreset = () => {
  const [activePreset, setActivePreset] = useState<Preset | null>(null)
  const presets = useLiveQuery(() => db.presets.toArray())

  const editorConfig = useStore((state) => state.editorConfig)
  const setConfig = useStore((state) => state.setConfig)

  const presetConfig = {
    background: editorConfig.background,
    paddingX: editorConfig.paddingX.name,
    paddingY: editorConfig.paddingY.name,
    radius: editorConfig.radius.name,
    opacity: editorConfig.opacity,
    isTransparent: editorConfig.isTransparent,
    isHeader: editorConfig.isHeader,
    headerId: editorConfig.headerId,
    shadow: editorConfig.shadow.name,
    border: editorConfig.border.name,
    editorRadius: editorConfig.editorRadius.name,
    themeId: editorConfig.themeId,
    isLineNumber: editorConfig.isLineNumber,
    fontFamily: editorConfig.fontFamily.id,
    fontSize: editorConfig.fontSize,
    fontWeight: editorConfig.fontWeight.name,
    lineHeight: editorConfig.lineHeight,
    isLigatures: editorConfig.isLigatures,
    isWatermark: editorConfig.isWatermark,
    watermarkLocation: editorConfig.watermarkLocation,
    watermarkOpacity: editorConfig.watermarkOpacity,
    watermarkText: editorConfig.watermarkText
  }

  function generateConfig(preset: Preset): EditorConfig {
    const { configs } = preset

    const findByName = <T extends { name: string }>(list: T[], name: string) => list.find((item) => item.name === name)!

    const findById = <T extends { id: number | string }>(list: T[], id: number | string) =>
      list.find((item) => item.id === id)!

    const font = findById(fonts, configs.fontFamily)

    return {
      background: configs.background,
      paddingX: findByName(paddings, configs.paddingX),
      paddingY: findByName(paddings, configs.paddingY),
      radius: findByName(radii, configs.radius),
      opacity: configs.opacity,
      isTransparent: configs.isTransparent,
      isHeader: configs.isHeader,
      headerId: configs.headerId,
      shadow: findByName(shadows, configs.shadow),
      border: findByName(borders, configs.border),
      editorRadius: findByName(radii, configs.editorRadius),
      themeId: configs.themeId,
      isLineNumber: configs.isLineNumber,
      fontFamily: font,
      fontSize: configs.fontSize,
      fontWeight: font.weights.find((w) => w.name === configs.fontWeight)!,
      lineHeight: configs.lineHeight,
      isLigatures: configs.isLigatures,
      isWatermark: configs.isWatermark || true,
      watermarkLocation: configs.watermarkLocation || "container",
      watermarkOpacity: configs.watermarkOpacity || 100,
      watermarkText: configs.watermarkText || "Pixel Syntax"
    }
  }

  async function addPreset() {
    try {
      const id = await db.presets.add({
        name: "New Preset",
        updatedAt: new Date(),
        createdAt: new Date(),
        configs: presetConfig
      })

      const preset = await db.presets.get(id)
      preset && setActivePreset(preset)
      toast.success("Preset added")
    } catch (error: any) {
      console.error(error)
      toast.error(`Failed to add: ${"message" in error ? error.message : String(error)}`)
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
        await db.presets.update(presetId, { name, updatedAt: new Date() })
      } else {
        await db.presets.update(presetId, { configs: presetConfig, updatedAt: new Date() })
      }

      const preset = await db.presets.get(presetId)
      setActivePreset(preset!)
      toast.success("Preset updated")
    } catch (error: any) {
      console.error(error)
      toast.error(`Failed to update: ${"message" in error ? error.message : String(error)}`)
    }
  }

  async function deletePreset(presetId: number) {
    try {
      await db.presets.delete(presetId)
      toast.success("Preset deleted")
    } catch (error: any) {
      console.error(error)
      toast.error(`Failed to delete: ${"message" in error ? error.message : String(error)}`)
    }
  }

  function changePreset(id: number) {
    const preset = presets?.find((p) => p.id === id)
    if (preset) {
      setActivePreset(preset)
      setConfig(generateConfig(preset))
    }
  }

  return {
    presets,
    activePreset,
    changePreset,
    addPreset,
    updatePreset,
    deletePreset,
    renamePreset,
    generateConfig
  }
}
