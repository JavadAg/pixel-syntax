import type { Plugin as PrettierPlugin } from "prettier"
import { type Font, fonts } from "@/data/editor-fonts"
import { type EditorHeader, headers } from "@/data/editor-headers"
import { type Theme, themes } from "@/data/editor-themes"
import { type Language, languages } from "@/data/language-configs"
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

export const resolveTheme = (id: string, isTransparent: boolean): Theme => {
  const theme = themes.find((theme) => theme.id === id)!

  return isTransparent
    ? {
        ...theme,
        options: {
          ...theme.options,
          settings: { ...theme.options.settings, gutterBackground: "transparent", background: "transparent" }
        }
      }
    : theme
}

export const resolveHeader = (id: EditorHeader["id"]): EditorHeader => {
  return headers.find((header) => header.id === id)!
}

export const resolveLanguage = (id: string): Language => {
  return languages.find((lang) => lang.id === id)!
}

export const resolveFont = (id: string): Font => {
  return fonts.find((font) => font.id === id)!
}
