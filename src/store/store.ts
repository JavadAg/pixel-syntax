import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createEditorConfigSlice, type EditorConfigSlice } from "./config.slice"
import { createEditorSlice, type EditorSlice } from "./editor.slice"
import { createExportSlice, type ExportSlice } from "./export.slice"
import { createTabsSlice, type TabsSlice } from "./tabs.slice"

const useStore = create<EditorConfigSlice & EditorSlice & ExportSlice & TabsSlice>()(
  persist(
    (...a) => ({
      ...createEditorConfigSlice(...a),
      ...createEditorSlice(...a),
      ...createExportSlice(...a),
      ...createTabsSlice(...a)
    }),
    {
      version: 1,
      name: "pixel-syntax",
      merge: (persistedState, currentState) => {
        if (!persistedState) {
          return { ...currentState }
        }
        return { ...currentState, ...persistedState }
      },
      partialize: (state) => ({
        tabs: state.tabs,
        editorConfig: state.editorConfig
      })
    }
  )
)

export default useStore
