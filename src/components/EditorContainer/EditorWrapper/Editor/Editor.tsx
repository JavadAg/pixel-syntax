import type { Theme } from "@/data/editor-themes"
import { useDecoration } from "@/hooks/use-decoration"
import useStore from "@/store/store"
import { cn, resolveLanguage } from "@/utils/helpers"
import createTheme from "@uiw/codemirror-themes"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { useCallback } from "react"

type IProps = {
  theme: Theme
}

const Editor: React.FC<IProps> = ({ theme }) => {
  const setEditorRef = useStore((state) => state.setEditorRef)
  const editorConfig = useStore((state) => state.editorConfig)
  const updateTab = useStore((state) => state.updateTab)
  const activeTabId = useStore((state) => state.activeTabId)
  const getTab = useStore((state) => state.getTab())
  const decorType = useStore((state) => state.activeDecor)

  const { gutterExtension, lineHighlightExtension } = useDecoration()

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

  function updateTabContent(content: string) {
    updateTab(activeTabId, { content })
  }

  const basicSetup = {
    highlightActiveLine: false,
    highlightActiveLineGutter: false,
    lineNumbers: false,
    foldGutter: false
  }

  return (
    <div className="w-full bg-transparent px-3 py-4">
      <CodeMirror
        ref={setEditorRef}
        data-testid="editor"
        basicSetup={basicSetup}
        className={cn("bg-transparent", decorType && "cursor-pointer")}
        value={getTab.content}
        theme={createTheme(theme.options)}
        extensions={[
          fontFamily(),
          resolveLanguage(getTab.languageId).syntax(),
          lineHighlightExtension,
          gutterExtension
        ]}
        onChange={updateTabContent}
      />
    </div>
  )
}

export default Editor
