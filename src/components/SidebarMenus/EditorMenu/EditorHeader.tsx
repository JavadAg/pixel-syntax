import EditorTab from "@/components/EditorHeaders/EditorTab/EditorTab"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion"
import { Switch } from "@/components/ui/Switch"
import { headers } from "@/data/editor-headers"
import { resolveTheme } from "@/data/editor-themes"
import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import { useMemo } from "react"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const EditorHeader = () => {
  const { isHeader, headerId, isTransparent, themeId } = useStore((state) => state.editorConfig)
  const currentTab = useStore((state) => state.getTab())

  const setHeader = useStore((state) => state.setHeader)
  const setHeaderId = useStore((state) => state.setHeaderId)

  const demoTab = useMemo(() => {
    return {
      id: Date.now().toString(),
      name: "Untitled",
      decorations: {
        highlighted: [],
        added: [],
        removed: [],
        focused: []
      },
      content: "",
      languageId: currentTab.languageId,
      extension: currentTab.extension
    }
  }, [currentTab])

  const theme = resolveTheme(themeId, isTransparent)

  const buttonStyle = () => {
    const isLight = theme.options.theme === "light"

    return {
      backgroundColor: isTransparent
        ? isLight
          ? "rgba(255,255,255, 0.7)"
          : "rgba(0,0,0, 0.7)"
        : theme.options.settings.background
    }
  }

  return (
    <SidebarItemWrapper>
      <span>Header</span>
      <div className="flex items-center justify-end">
        <Switch data-testid="editor-header-switch" checked={isHeader} onCheckedChange={setHeader} />
      </div>
      {isHeader && (
        <Accordion className="col-span-full" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="editor-header-type-trigger" withIcon className="w-full whitespace-nowrap">
              Header Type
            </AccordionTrigger>
            <AccordionContent data-testid="editor-header-type-content" className="grid gap-2 px-1">
              {headers.map((item) => (
                <button
                  type="button"
                  style={{
                    ...buttonStyle()
                  }}
                  className={cn(
                    headerId === item.id && "ring-2 ring-ring",
                    "w-full p-1 rounded-lg duration-200 text-white"
                  )}
                  onClick={() => setHeaderId(item.id)}
                  key={item.name}
                >
                  {item.component(<EditorTab tab={demoTab} />)}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </SidebarItemWrapper>
  )
}

export default EditorHeader
