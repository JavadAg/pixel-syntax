import type { EditorConfig } from "./editor-config.type"

type PresetConfig = {
  background: EditorConfig["background"]
  paddingX: EditorConfig["paddingX"]["name"]
  paddingY: EditorConfig["paddingY"]["name"]
  radius: EditorConfig["radius"]["name"]
  opacity: EditorConfig["opacity"]
  isTransparent: EditorConfig["isTransparent"]
  isHeader: EditorConfig["isHeader"]
  headerType: EditorConfig["headerType"]["name"]
  shadow: EditorConfig["shadow"]["name"]
  border: EditorConfig["border"]["name"]
  editorRadius: EditorConfig["editorRadius"]["name"]
  theme: EditorConfig["theme"]["id"]
  isLineNumber: EditorConfig["isLineNumber"]
  fontFamily: EditorConfig["fontFamily"]["id"]
  fontSize: EditorConfig["fontSize"]
  fontWeight: EditorConfig["fontWeight"]["name"]
  lineHeight: EditorConfig["lineHeight"]
  isLigatures: EditorConfig["isLigatures"]
}

export type Preset = {
  id: number
  name: string
  updatedAt: Date
  createdAt: Date
  configs: PresetConfig
}
