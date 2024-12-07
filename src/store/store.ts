import { create } from "zustand"
import { createEditorConfigSlice, type EditorConfigSlice } from "./config.slice"
import { createEditorSlice, type EditorSlice } from "./editor.slice"
import { createExportSlice, type ExportSlice } from "./export.slice"

const useStore = create<EditorConfigSlice & EditorSlice & ExportSlice>()((...a) => ({
  ...createEditorConfigSlice(...a),
  ...createEditorSlice(...a),
  ...createExportSlice(...a)
}))

export default useStore
