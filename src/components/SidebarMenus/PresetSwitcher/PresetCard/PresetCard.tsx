import type { EditorConfig } from "@/types/editor-config.type"
import type { Preset } from "@/types/presets.type"
import { headers } from "@/data/editor-headers"
import { languages } from "@/data/language-configs"
import { usePreset } from "@/hooks/use-preset"
import { cn, resolveTheme } from "@/utils/helpers"
import createTheme from "@uiw/codemirror-themes"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { useCallback } from "react"
import PresetInfo from "./PresetInfo/PresetInfo"

type IProps = {
  preset: Preset
  isActive: boolean
  onClick: () => void
}

const PresetCard: React.FC<IProps> = ({ preset, onClick, isActive }) => {
  const { generateConfig } = usePreset()

  const editorConfig = generateConfig(preset)

  const theme = resolveTheme(editorConfig.themeId, editorConfig.isTransparent)

  const fontFamily = useCallback(
    () =>
      EditorView.theme({
        ".cm-content": {
          fontFamily: editorConfig.fontFamily.value,
          fontVariantLigatures: editorConfig.isLigatures ? "normal" : "none",
          fontSize: `13px`,
          fontWeight: editorConfig.fontWeight.value,
          lineHeight: editorConfig.lineHeight
        },
        ".cm-gutters": {
          fontFamily: editorConfig.fontFamily.value,
          paddingRight: "10px",
          fontSize: `13px`,
          fontWeight: editorConfig.fontWeight.value
        }
      }),
    [editorConfig.fontFamily, editorConfig.fontWeight, editorConfig.isLigatures, editorConfig.lineHeight]
  )

  function renderHeader(view: EditorConfig["headerId"]) {
    const selectedHeader = headers.find((header) => header.id === view)
    return selectedHeader?.component()
  }

  const extensions = [languages.find((lang) => lang.id === "javascript")!.syntax(), fontFamily()]

  return (
    <div
      data-testid="preset-card"
      onClick={onClick}
      className={cn(
        "rounded-lg w-full bg-background px-2 pt-2 duration-200",
        isActive ? "ring-1 ring-blue-300/50" : ""
      )}
    >
      <div className="relative flex w-full flex-col items-center justify-center p-3">
        <div
          style={{
            position: "absolute",
            inset: "0px",
            borderRadius: editorConfig.radius.value,
            background: editorConfig.background,
            opacity: editorConfig.opacity
          }}
        />
        <div
          style={{
            backgroundColor: editorConfig.isTransparent
              ? theme.options.theme === "light"
                ? "rgba(255,255,255, 0.7)"
                : "rgba(0,0,0, 0.7)"
              : theme.options.settings.background,
            backdropFilter: editorConfig.isTransparent ? "blur(10px)" : "none",
            boxShadow: editorConfig.shadow.value,
            border: editorConfig.border.value,
            borderRadius: editorConfig.editorRadius.value
          }}
          className={cn(
            "relative z-[1] w-full flex flex-col items-start justify-start",
            theme.options.theme === "dark" ? "text-white" : "text-black"
          )}
        >
          {editorConfig.isHeader && renderHeader(editorConfig.headerId)}

          <div className="pointer-events-none w-full cursor-default select-none bg-transparent px-1 py-3">
            <CodeMirror
              readOnly
              editable={false}
              basicSetup={{
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
                lineNumbers: editorConfig.isLineNumber,
                foldGutter: false
              }}
              className="select-none bg-transparent"
              value={`let greeting = "Hello";`}
              theme={createTheme(theme.options)}
              extensions={extensions}
            />
          </div>
        </div>
      </div>
      <PresetInfo preset={preset} />
    </div>
  )
}

export default PresetCard
