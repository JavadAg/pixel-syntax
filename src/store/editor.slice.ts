import type { ReactCodeMirrorRef } from "@uiw/react-codemirror"
import type { StateCreator } from "zustand"

export type EditorSlice = {
  editorRef: ReactCodeMirrorRef | null
  editorContainerRef: HTMLDivElement | null
  setEditorRef: (payload: ReactCodeMirrorRef | null) => void
  setEditorContainerRef: (payload: HTMLDivElement | null) => void
}

export const createEditorSlice: StateCreator<EditorSlice> = (set) => ({
  editorRef: null,
  editorContainerRef: null,
  setEditorRef: (payload) =>
    set(() => ({
      editorRef: payload
    })),
  setEditorContainerRef: (payload) =>
    set(() => ({
      editorContainerRef: payload
    }))
})
