import type { Border } from "@/data/border-presets"
import type { Font } from "@/data/editor-fonts"
import type { EditorHeader } from "@/data/editor-headers"
import type { Theme } from "@/data/editor-themes"
import type { Padding } from "@/data/padding-presets"
import type { Radius } from "@/data/radius-presets"
import type { Shadow } from "@/data/shadow-presets"

export type EditorConfig = {
  background: string
  paddingX: Padding
  paddingY: Padding
  radius: Radius
  opacity: number
  isTransparent: boolean
  isHeader: boolean
  headerId: EditorHeader["id"]
  shadow: Shadow
  border: Border
  editorRadius: Radius
  themeId: Theme["id"]
  isLineNumber: boolean
  fontFamily: Font
  fontSize: number
  fontWeight: Font["weights"][number]
  lineHeight: string
  isLigatures: boolean
}
