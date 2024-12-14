import type { StateCreator } from "zustand"

export type EditorSlice = {
  editorRef: HTMLDivElement | null
  setEditorRef: (payload: HTMLDivElement | null) => void
}

export const createEditorSlice: StateCreator<EditorSlice> = (set) => ({
  editorRef: null,
  setEditorRef: (payload) =>
    set(() => ({
      editorRef: payload
    }))
})
