import type { Language } from "@/data/language-configs"

export type DecorationType = "highlighted" | "added" | "removed" | "focused"

export type TabConfig = {
  id: string
  name: string
  decorations: Record<DecorationType, number[]>
  content: string
  languageId: string
  extension: Language["extensions"][number]
}
