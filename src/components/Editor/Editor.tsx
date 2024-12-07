"use client"

import type { Theme } from "@/data/editor-themes"
import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import createTheme from "@uiw/codemirror-themes"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { useCallback } from "react"
import Container from "../Container/Container"
import EditorTab from "../EditorHeaders/EditorTab/EditorTab"

const Editor = () => {
  const editorConfig = useStore((state) => state.editorConfig)
  const content = useStore((state) => state.content)

  const setContent = useStore((state) => state.setContent)
  const getActiveTab = useStore((state) => state.getActiveTab)

  const theme: Theme = editorConfig.isTransparent
    ? {
        ...editorConfig.theme,
        theme: {
          ...editorConfig.theme.theme,
          settings: {
            ...editorConfig.theme.theme.settings,
            gutterBackground: "transparent",
            background: "transparent"
          }
        }
      }
    : editorConfig.theme

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

  return (
    <Container>
      <div
        data-testid="editor-wrapper"
        style={{
          backgroundColor: editorConfig.isTransparent
            ? editorConfig.theme.theme.theme === "light"
              ? "rgba(255,255,255, 0.7)"
              : "rgba(0,0,0, 0.7)"
            : theme.theme.settings.background,
          backdropFilter: editorConfig.isTransparent ? "blur(10px)" : "none",
          boxShadow: editorConfig.shadow.value,
          border: editorConfig.border.value,
          borderRadius: editorConfig.editorRadius.value
        }}
        className={cn(
          "relative z-[1] flex w-full min-w-fit flex-col items-start justify-start",
          theme.theme.theme === "dark" ? "text-white" : "text-black"
        )}
      >
        {editorConfig.isHeader &&
          editorConfig.headerType.value(editorConfig.tabs.map((tab) => <EditorTab key={tab.id} tab={tab} isEditor />))}

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
            value={content}
            theme={createTheme(theme.theme)}
            extensions={[getActiveTab().tabLanguage.lang, fontFamily()]}
            onChange={setContent}
          />
        </div>
      </div>
    </Container>
  )
}

export default Editor
