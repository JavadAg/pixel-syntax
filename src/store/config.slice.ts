import type { EditorConfig } from "@/types/editor-config.type"
import type { StateCreator } from "zustand"

import { borders } from "@/data/border-presets"
import { gradientColors } from "@/data/color-presets"
import { fonts } from "@/data/editor-fonts"
import { themes } from "@/data/editor-themes"
import { paddings } from "@/data/padding-presets"
import { radii } from "@/data/radius-presets"
import { shadows } from "@/data/shadow-presets"

export const initialState: EditorConfig = {
  background: gradientColors.colors[3]!,
  paddingX: paddings[5]!,
  paddingY: paddings[5]!,
  radius: radii[4]!,
  opacity: 100,
  isTransparent: false,
  isHeader: true,
  headerId: "mac_colored",
  shadow: shadows.find((s) => s.name === "Inner")!,
  border: borders[0]!,
  editorRadius: radii[4]!,
  themeId: themes[0]!.id,
  isLineNumber: true,
  fontFamily: fonts.find((f) => f.name === "Cascadia Code") ?? fonts[0]!,
  fontSize: 16,
  fontWeight: fonts[0]!.weights[0]!,
  lineHeight: "1.5",
  isLigatures: true,
  isWatermark: true,
  watermarkControls: {
    location: "container",
    opacity: 100,
    text: "Pixel Syntax"
  }
}

export type EditorConfigSlice = {
  editorConfig: EditorConfig
  setConfig: (payload: Partial<EditorConfig>) => void
  resetConfig: () => void
  setBackground: (payload: EditorConfig["background"]) => void
  setPadding: (axis: "paddingX" | "paddingY", payload: EditorConfig["paddingX"]) => void
  setRadius: (payload: EditorConfig["radius"]) => void
  setOpacity: (payload: EditorConfig["opacity"]) => void
  setTransparent: (payload: EditorConfig["isTransparent"]) => void
  setHeader: (payload: EditorConfig["isHeader"]) => void
  setHeaderId: (payload: EditorConfig["headerId"]) => void
  setShadow: (payload: EditorConfig["shadow"]) => void
  setBorder: (payload: EditorConfig["border"]) => void
  setEditorRadius: (payload: EditorConfig["editorRadius"]) => void
  setThemeId: (payload: EditorConfig["themeId"]) => void
  setLineNumber: (payload: EditorConfig["isLineNumber"]) => void
  setFontFamily: (payload: EditorConfig["fontFamily"]) => void
  setFontSize: (payload: EditorConfig["fontSize"]) => void
  setFontWeight: (payload: EditorConfig["fontWeight"]) => void
  setLineHeight: (payload: EditorConfig["lineHeight"]) => void
  setLigatures: (payload: EditorConfig["isLigatures"]) => void
  setWatermark: (payload: EditorConfig["isWatermark"]) => void
  setWatermarkControls: (payload: EditorConfig["watermarkControls"]) => void
}

export const createEditorConfigSlice: StateCreator<EditorConfigSlice> = (set) => ({
  editorConfig: initialState,
  setConfig: (payload) =>
    set((state) => ({
      editorConfig: { ...state.editorConfig, ...payload }
    })),
  resetConfig: () => set(() => ({ editorConfig: initialState })),
  setBackground: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        background: payload
      }
    })),
  setPadding: (axis, payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        [axis]: payload
      }
    })),
  setRadius: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        radius: payload
      }
    })),
  setOpacity: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        opacity: payload
      }
    })),
  setTransparent: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        isTransparent: payload
      }
    })),
  setHeader: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        isHeader: payload
      }
    })),
  setHeaderId(payload) {
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        headerId: payload
      }
    }))
  },
  setShadow: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        shadow: payload
      }
    })),
  setBorder: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        border: payload
      }
    })),
  setEditorRadius: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        editorRadius: payload
      }
    })),
  setThemeId: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        themeId: payload
      }
    })),
  setLineNumber: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        isLineNumber: payload
      }
    })),
  setFontFamily: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        fontFamily: payload,
        fontWeight: payload.weights[0]!,
        isLigatures: payload.ligatures
      }
    })),
  setFontSize: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        fontSize: payload
      }
    })),
  setFontWeight: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        fontWeight: payload
      }
    })),
  setLineHeight: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        lineHeight: payload
      }
    })),
  setLigatures: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        isLigatures: payload
      }
    })),
  setWatermark: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        isWatermark: payload
      }
    })),
  setWatermarkControls: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        watermarkControls: payload
      }
    }))
})
