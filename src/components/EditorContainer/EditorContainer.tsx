"use client"

import useStore from "@/store/store"
import { Resizable } from "re-resizable"
import EditorWrapper from "./EditorWrapper/EditorWrapper"
import Watermark from "./Watermark/Watermark"

const EditorContainer = () => {
  const editorConfig = useStore((state) => state.editorConfig)
  const setEditorRef = useStore((state) => state.setEditorRef)

  return (
    <Resizable
      enable={{
        bottom: false,
        top: false,
        right: true,
        left: true
      }}
      className="mx-auto flex w-full min-w-fit items-center justify-center border-none"
      handleClasses={{
        left: "bg-gray-600 !w-1.5 max-h-10 my-auto !top-2/4 bottom-2/4 rounded-xl duration-200 hover:max-h-14 hover:bg-gray-500 !-left-0.5",
        right:
          "bg-gray-600 !w-1.5 max-h-10 my-auto !top-2/4 bottom-2/4 rounded-xl duration-200 hover:max-h-14 hover:bg-gray-500 !-right-0.5"
      }}
    >
      <div
        data-testid="container-wrapper"
        ref={setEditorRef}
        className="relative flex w-full items-center justify-center bg-transparent"
        style={{
          padding: `${editorConfig.paddingY.value}px ${editorConfig.paddingX.value}px`,
          borderRadius: editorConfig.radius.value,
          zIndex: 0
        }}
      >
        <div
          data-testid="container-bg-color"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: editorConfig.radius.value,
            background: editorConfig.background,
            opacity: editorConfig.opacity / 100
          }}
        />
        {editorConfig.isWatermark && editorConfig.watermarkLocation === "container" && <Watermark />}
        <EditorWrapper />
      </div>
    </Resizable>
  )
}

export default EditorContainer
