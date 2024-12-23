import type { Plugin as PrettierPlugin } from "prettier"
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
