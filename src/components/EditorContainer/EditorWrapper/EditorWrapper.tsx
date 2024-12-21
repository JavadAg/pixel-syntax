"use client"

import type { EditorConfig } from "@/types/editor-config.type"
import useStore from "@/store/store"
import { cn, resolveHeader, resolveTheme } from "@/utils/helpers"
import EditorTab from "../../EditorHeaders/EditorTab/EditorTab"
import Watermark from "../Watermark/Watermark"
import Editor from "./Editor/Editor"

const EditorWrapper = () => {
  const editorConfig = useStore((state) => state.editorConfig)
  const tabs = useStore((state) => state.tabs)

  const theme = resolveTheme(editorConfig.themeId, editorConfig.isTransparent)

  function renderHeader(view: EditorConfig["headerId"]) {
    const selectedHeader = resolveHeader(view)
    return selectedHeader?.component(
      tabs?.map((tab) => <EditorTab key={tab.id} tab={tab} isEditor />),
      true
    )
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
        editorConfig.isWatermark && editorConfig.watermarkControls.location === "editor" && "pb-3"
      )}
    >
      {editorConfig.isHeader && renderHeader(editorConfig.headerId)}
      <Editor theme={theme} />
      {editorConfig.isWatermark && editorConfig.watermarkControls.location === "editor" && <Watermark />}
    </div>
  )
}

export default EditorWrapper
