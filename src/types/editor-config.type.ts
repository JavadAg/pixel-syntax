import type { Border } from "@/data/border-presets"
import type { Font } from "@/data/editor-fonts"
import type { EditorHeader } from "@/data/editor-headers"
import type { Theme } from "@/data/editor-themes"
import type { LanguageConfig } from "@/data/language-configs"
import type { Padding } from "@/data/padding-presets"
import type { Radius } from "@/data/radius-presets"
import type { Shadow } from "@/data/shadow-presets"

export type TabConfig = {
  id: number
  tabName: string
  tabLanguage: LanguageConfig
  tabExtension?: LanguageConfig["fileExtensions"][number]
}

export type EditorConfig = {
  tabs: TabConfig[]
  activeTabId: TabConfig["id"]
  background: string
  paddingX: Padding
  paddingY: Padding
  radius: Radius
  opacity: number
  isTransparent: boolean
  isHeader: boolean
  headerType: EditorHeader
  shadow: Shadow
  border: Border
  editorRadius: Radius
  theme: Theme
  isLineNumber: boolean
  fontFamily: Font
  fontSize: number
  fontWeight: Font["weights"][number]
  lineHeight: string
  isLigatures: boolean
}
