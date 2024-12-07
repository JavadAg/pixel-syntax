import type { Preset } from "@/types/presets.type"
import type { Plugin as PrettierPlugin } from "prettier"
import { borderList } from "@/data/border-presets"
import { fonts } from "@/data/editor-fonts"
import { headersList } from "@/data/editor-headers"
import { themes } from "@/data/editor-themes"
import { paddingList } from "@/data/padding-presets"
import { radiusList } from "@/data/radius-presets"
import { shadowList } from "@/data/shadow-presets"
import chroma from "chroma-js"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const awaitPlugins = async (
  plugins: (() => Promise<PrettierPlugin>) | (() => Promise<PrettierPlugin>)[] | undefined
): Promise<PrettierPlugin[]> => {
  if (!plugins) return Promise.resolve([])

  const pluginPromises = Array.isArray(plugins) ? plugins.map((plugin) => plugin()) : [plugins()]

  const resolvedPlugins = await Promise.all(pluginPromises)

  return resolvedPlugins
}

export const adjustBrightness = (hex: string, factor: number): string => {
  const color = chroma(hex)
  return color.brighten(factor).hex()
}

export const adjustOpacity = (hex: string, factor: number): string => {
  const color = chroma(hex)
  return color.alpha(factor).hex()
}

export function generateConfig(preset: Preset) {
  const { configs } = preset

  const findByName = <T extends { name: string }>(list: T[], name: string) => list.find((item) => item.name === name)!

  const findById = <T extends { id: number | string }>(list: T[], id: number | string) =>
    list.find((item) => item.id === id)!

  const font = findById(fonts, configs.fontFamily)

  return {
    background: configs.background,
    paddingX: findByName(paddingList, configs.paddingX),
    paddingY: findByName(paddingList, configs.paddingY),
    radius: findByName(radiusList, configs.radius),
    opacity: configs.opacity,
    isTransparent: configs.isTransparent,
    isHeader: configs.isHeader,
    headerType: findByName(headersList, configs.headerType),
    shadow: findByName(shadowList, configs.shadow),
    border: findByName(borderList, configs.border),
    editorRadius: findByName(radiusList, configs.editorRadius),
    theme: findById(themes, configs.theme),
    isLineNumber: configs.isLineNumber,
    fontFamily: font,
    fontSize: configs.fontSize,
    fontWeight: font.weights.find((w) => w.name === configs.fontWeight)!,
    lineHeight: configs.lineHeight,
    isLigatures: configs.isLigatures
  }
}
