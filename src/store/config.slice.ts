import type { EditorConfig } from "@/types/editor-config.type"
import type { StateCreator } from "zustand"

import { borderList } from "@/data/border-presets"
import { gradientColors } from "@/data/color-presets"
import { fonts } from "@/data/editor-fonts"
import { headersList } from "@/data/editor-headers"
import { themes } from "@/data/editor-themes"
import languageConfigs from "@/data/language-configs"
import { paddingList } from "@/data/padding-presets"
import { radiusList } from "@/data/radius-presets"
import { shadowList } from "@/data/shadow-presets"

export const initialState: EditorConfig = {
  tabs: [
    {
      id: 1,
      tabName: `Untitled${languageConfigs.find((lang) => lang.label === "JavaScript")!.fileExtensions[0]!.extension}`,
      tabLanguage: languageConfigs.find((lang) => lang.label === "JavaScript")!,
      tabExtension: languageConfigs.find((lang) => lang.label === "JavaScript")?.fileExtensions[0]
    }
  ],
  activeTabId: 1,
  background: gradientColors.colors[2]!,
  paddingX: paddingList[5]!,
  paddingY: paddingList[5]!,
  radius: radiusList[4]!,
  opacity: 1,
  isTransparent: false,
  isHeader: true,
  headerType: headersList[0]!,
  shadow: shadowList.find((s) => s.name === "Inner")!,
  border: borderList[0]!,
  editorRadius: radiusList[4]!,
  theme: themes[0]!,
  isLineNumber: true,
  fontFamily: fonts.find((f) => f.name === "Cascadia Code") ?? fonts[0]!,
  fontSize: 16,
  fontWeight: fonts[0]!.weights[0]!,
  lineHeight: "1.5",
  isLigatures: true
}

export type EditorConfigSlice = {
  editorConfig: EditorConfig
  setConfig: (payload: Partial<EditorConfig>) => void
  setTabs: (id: EditorConfig["activeTabId"], payload: EditorConfig["tabs"][number]) => void
  getActiveTab: () => EditorConfig["tabs"][0]
  setActiveTab: (payload: EditorConfig["activeTabId"]) => void
  setBackground: (payload: EditorConfig["background"]) => void
  setPadding: (axis: "paddingX" | "paddingY", payload: EditorConfig["paddingX"]) => void
  setRadius: (payload: EditorConfig["radius"]) => void
  setOpacity: (payload: EditorConfig["opacity"]) => void
  setTransparent: (payload: EditorConfig["isTransparent"]) => void
  setHeader: (payload: EditorConfig["isHeader"]) => void
  setHeaderType: (payload: EditorConfig["headerType"]) => void
  setShadow: (payload: EditorConfig["shadow"]) => void
  setBorder: (payload: EditorConfig["border"]) => void
  setEditorRadius: (payload: EditorConfig["editorRadius"]) => void
  setTheme: (payload: EditorConfig["theme"]) => void
  setLineNumber: (payload: EditorConfig["isLineNumber"]) => void
  setFontFamily: (payload: EditorConfig["fontFamily"]) => void
  setFontSize: (payload: EditorConfig["fontSize"]) => void
  setFontWeight: (payload: EditorConfig["fontWeight"]) => void
  setLineHeight: (payload: EditorConfig["lineHeight"]) => void
  setLigatures: (payload: EditorConfig["isLigatures"]) => void
}

export const createEditorConfigSlice: StateCreator<EditorConfigSlice> = (set, get) => ({
  editorConfig: initialState,
  setConfig: (payload) =>
    set((state) => ({
      editorConfig: { ...state.editorConfig, ...payload }
    })),
  setTabs: (id, payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        tabs: state.editorConfig.tabs.map((tab) => (tab.id === id ? { ...payload } : tab))
      }
    })),
  getActiveTab: () => {
    const {
      editorConfig: { activeTabId, tabs }
    } = get()
    return tabs.find((tab) => tab.id === activeTabId)!
  },
  setActiveTab: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        activeTab: payload
      }
    })),
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
  setHeaderType(payload) {
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        headerType: payload
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
  setTheme: (payload) =>
    set((state) => ({
      editorConfig: {
        ...state.editorConfig,
        theme: payload
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
    }))
})
