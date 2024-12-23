import type { DecorationType } from "@/types/tabs.type"
import useStore from "@/store/store"
import {
  Decoration,
  type DecorationSet,
  EditorView,
  gutter,
  GutterMarker,
  StateEffect,
  StateField
} from "@uiw/react-codemirror"
import { useEffect } from "react"

export const useDecoration = () => {
  const editorRef = useStore((state) => state.editorRef)
  const currentTab = useStore((state) => state.getTab())
  const isLineNumber = useStore((state) => state.editorConfig.isLineNumber)
  const updateTab = useStore((state) => state.updateTab)
  const decorType = useStore((state) => state.activeDecor)
  const setActiveDecor = useStore((state) => state.setActiveDecor)

  // handle picking line numbers
  useEffect(() => {
    if (!editorRef || !decorType) return

    const editor = editorRef.view
    if (!editor) return

    const handleMouseDown = (event: MouseEvent) => {
      const decoration = currentTab.decorations?.[decorType] || []

      const coords = { x: event.clientX, y: event.clientY }
      const pos = editor.posAtCoords(coords)
      if (pos === null) return

      const line = editor.state.doc.lineAt(pos)
      const isExist = decoration.includes(line.number)

      updateTab(currentTab.id, {
        decorations: {
          ...currentTab?.decorations,
          [decorType]: isExist ? decoration.filter((v) => v !== line.number) : [...decoration, line.number]
        }
      })
    }

    editor.dom.addEventListener("mousedown", handleMouseDown)

    return () => {
      editor.dom.removeEventListener("mousedown", handleMouseDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decorType, currentTab])

  const addLineHighlightEffect = StateEffect.define<{
    from: number
    to: number
    value: Decoration
  }>()

  // handle adding decorations to editor
  useEffect(() => {
    const editor = editorRef?.view
    const decorations = currentTab?.decorations

    if (!decorations || !editor) return

    const effects: StateEffect<{ from: number; to: number; value: Decoration }>[] = []

    Object.entries(decorations).forEach(([key, lines]) => {
      const className =
        {
          highlighted: "decor-highlighted",
          added: "decor-added",
          removed: "decor-removed",
          focused: "decor-focused"
        }[key as keyof typeof decorations] || ""

      if (key === "focused") {
        editor.dom?.setAttribute("data-focused-line", lines.length > 0 ? "true" : "false")
      }

      lines.forEach((line) => {
        const lineInfo = editor.state.doc.line(line)

        effects.push(addLineHighlightEffect.of(Decoration.line({ class: className }).range(lineInfo.from)))
      })
    })

    if (effects.length > 0) {
      editor.dispatch({ effects })
    }
  }, [currentTab, editorRef, addLineHighlightEffect])

  function handleDecorTypeChange(value: DecorationType | "clear") {
    if (value === "clear") {
      updateTab(currentTab.id, {
        decorations: {
          highlighted: [],
          added: [],
          removed: [],
          focused: []
        }
      })
      setActiveDecor(null)

      return
    }

    setActiveDecor(value)
  }

  // gutter decoration extension
  class LineGutterMarker extends GutterMarker {
    constructor(
      private className: string,
      private lineNumber: number
    ) {
      super()
    }
    toDOM() {
      const marker = document.createElement("div")
      marker.className = this.className
      marker.textContent = String(this.lineNumber)
      return marker
    }
  }
  const gutterExtension = isLineNumber
    ? gutter({
        lineMarker: (view, line) => {
          const lineNumber = view.state.doc.lineAt(line.from).number
          const decorations = currentTab.decorations
          if (decorations) {
            const classNames = ["gutter-default"]
            if (decorations.added?.includes(lineNumber)) classNames.push("decor-added  text-white")
            if (decorations.removed?.includes(lineNumber)) classNames.push("decor-removed  text-white")
            if (decorations.highlighted?.includes(lineNumber)) classNames.push("decor-highlighted  text-white")
            if (decorations.focused?.includes(lineNumber)) classNames.push("decor-focused  text-white")
            return new LineGutterMarker(classNames.join(" "), lineNumber)
          }
          return new LineGutterMarker("gutter-default", lineNumber)
        }
      })
    : []

  // line highlight extension
  const lineHighlightExtension = StateField.define<DecorationSet>({
    create() {
      return Decoration.none
    },
    update(decorations, transaction) {
      decorations = decorations.map(transaction.changes)
      for (const effect of transaction.effects) {
        if (effect.is(addLineHighlightEffect)) {
          decorations = decorations.update({
            add: [effect.value]
          })
        }
      }
      return decorations
    },
    provide: (field) => EditorView.decorations.from(field)
  })

  return {
    gutterExtension,
    lineHighlightExtension,
    decorType,
    updateDecorType: handleDecorTypeChange
  }
}
