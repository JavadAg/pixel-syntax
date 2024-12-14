import type { Language } from "@/data/language-configs"

export type TabConfig = {
  id: string
  name: string
  content: string
  languageId: string
  extension: Language["extensions"][number]
}
