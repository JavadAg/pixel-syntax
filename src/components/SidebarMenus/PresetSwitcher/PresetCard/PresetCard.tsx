import type { Theme } from "@/data/editor-themes"
import type { Preset } from "@/types/presets.type"
import languageConfigs from "@/data/language-configs"
import { cn, generateConfig } from "@/utils/helpers"
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
  const editorConfig = generateConfig(preset)

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
              ? editorConfig.theme.theme.theme === "light"
                ? "rgba(255,255,255, 0.7)"
                : "rgba(0,0,0, 0.7)"
              : editorConfig.theme.theme.settings.background,
            backdropFilter: editorConfig.isTransparent ? "blur(10px)" : "none",
            boxShadow: editorConfig.shadow.value,
            border: editorConfig.border.value,
            borderRadius: editorConfig.editorRadius.value
          }}
          className={cn(
            "relative z-[1] w-full flex flex-col items-start justify-start",
            editorConfig.theme.theme.theme === "dark" ? "text-white" : "text-black"
          )}
        >
          {editorConfig.isHeader && editorConfig.headerType.value()}

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
              theme={createTheme(theme.theme)}
              extensions={[languageConfigs.find((lang) => lang.label === "JavaScript")!.lang, fontFamily()]}
            />
          </div>
        </div>
      </div>
      <PresetInfo preset={preset} />
    </div>
  )
}

export default PresetCard
