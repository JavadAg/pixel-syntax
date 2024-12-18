"use client"

import type { EditorConfig } from "@/types/editor-config.type"
import useStore from "@/store/store"
import { cn, resolveHeader, resolveLanguage, resolveTheme } from "@/utils/helpers"
import createTheme from "@uiw/codemirror-themes"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { useCallback } from "react"
import EditorTab from "../../EditorHeaders/EditorTab/EditorTab"
import Watermark from "../Watermark/Watermark"

const EditorWrapper = () => {
  const editorConfig = useStore((state) => state.editorConfig)
  const tabs = useStore((state) => state.tabs)
  const updateTab = useStore((state) => state.updateTab)
  const activeTabId = useStore((state) => state.activeTabId)
  const getTab = useStore((state) => state.getTab())

  const theme = resolveTheme(editorConfig.themeId, editorConfig.isTransparent)

  const fontFamily = useCallback(
    () =>
      EditorView.theme({
        ".cm-content": {
          fontFamily: editorConfig.fontFamily.value,
          fontVariantLigatures: editorConfig.isLigatures ? "normal" : "none",
          fontSize: `${editorConfig.fontSize}px`,
          fontWeight: editorConfig.fontWeight.value,
          lineHeight: editorConfig.lineHeight
        },
        ".cm-gutters": {
          fontFamily: editorConfig.fontFamily.value,
          paddingRight: "10px",
          fontSize: `${editorConfig.fontSize}px`,
          fontWeight: editorConfig.fontWeight.value
        }
      }),
    [
      editorConfig.fontFamily,
      editorConfig.fontSize,
      editorConfig.fontWeight,
      editorConfig.isLigatures,
      editorConfig.lineHeight
    ]
  )

  function renderHeader(view: EditorConfig["headerId"]) {
    const selectedHeader = resolveHeader(view)
    return selectedHeader?.component(
      tabs?.map((tab) => <EditorTab key={tab.id} tab={tab} isEditor />),
      true
    )
  }

  function updateTabContent(content: string) {
    updateTab(activeTabId, { content })
  }

  const wrapperStyle = () => {
    const isTransparent = editorConfig.isTransparent
    const isLight = theme.options.theme === "light"

    return {
      backgroundColor: isTransparent
        ? isLight
          ? "rgba(255,255,255, 0.7)"
          : "rgba(0,0,0, 0.7)"
        : theme.options.settings.background,
      backdropFilter: isTransparent ? "blur(10px)" : "none",
      boxShadow: editorConfig.shadow.value,
      border: editorConfig.border.value,
      borderRadius: editorConfig.editorRadius.value
    }
  }

  return (
    <div
      data-testid="editor-wrapper"
      style={{ ...wrapperStyle() }}
      className={cn(
        "relative z-[1] flex w-full min-w-fit flex-col items-start justify-start",
        theme.options.theme === "dark" ? "text-white" : "text-black",
        editorConfig.isWatermark && editorConfig.watermarkLocation === "editor" && "pb-3"
      )}
    >
      {editorConfig.isHeader && renderHeader(editorConfig.headerId)}

      <div className="w-full bg-transparent px-3 py-4">
        <CodeMirror
          data-testid="editor"
          basicSetup={{
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
            lineNumbers: editorConfig.isLineNumber,
            foldGutter: false
          }}
          className="bg-transparent"
          value={getTab.content}
          theme={createTheme(theme.options)}
          extensions={[fontFamily(), resolveLanguage(getTab.languageId).syntax()]}
          onChange={updateTabContent}
        />
      </div>
      {editorConfig.isWatermark && editorConfig.watermarkLocation === "editor" && <Watermark />}
    </div>
  )
}

export default EditorWrapper
