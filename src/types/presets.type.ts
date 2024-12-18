import type { EditorConfig } from "./editor-config.type"

type PresetConfig = {
  background: EditorConfig["background"]
  paddingX: EditorConfig["paddingX"]["name"]
  paddingY: EditorConfig["paddingY"]["name"]
  radius: EditorConfig["radius"]["name"]
  opacity: EditorConfig["opacity"]
  isTransparent: EditorConfig["isTransparent"]
  isHeader: EditorConfig["isHeader"]
  headerId: EditorConfig["headerId"]
  shadow: EditorConfig["shadow"]["name"]
  border: EditorConfig["border"]["name"]
  editorRadius: EditorConfig["editorRadius"]["name"]
  themeId: EditorConfig["themeId"]
  isLineNumber: EditorConfig["isLineNumber"]
  fontFamily: EditorConfig["fontFamily"]["id"]
  fontSize: EditorConfig["fontSize"]
  fontWeight: EditorConfig["fontWeight"]["name"]
  lineHeight: EditorConfig["lineHeight"]
  isLigatures: EditorConfig["isLigatures"]
  isWatermark: EditorConfig["isWatermark"]
  watermarkLocation: EditorConfig["watermarkLocation"]
  watermarkOpacity: EditorConfig["watermarkOpacity"]
  watermarkText: EditorConfig["watermarkText"]
}

export type Preset = {
  id: number
  name: string
  updatedAt: Date
  createdAt: Date
  configs: PresetConfig
}
