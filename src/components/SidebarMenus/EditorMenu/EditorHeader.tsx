import type { TabConfig } from "@/types/editor-config.type"
import EditorTab from "@/components/EditorHeaders/EditorTab/EditorTab"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion"
import { Switch } from "@/components/ui/Switch"
import { headersList } from "@/data/editor-headers"
import useStore from "@/store/store"
import { cn } from "@/utils/helpers"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const EditorHeader = () => {
  const { isHeader, headerType, theme, isTransparent } = useStore((state) => state.editorConfig)
  const activeTab = useStore((state) => state.getActiveTab)

  const setHeader = useStore((state) => state.setHeader)
  const setHeaderType = useStore((state) => state.setHeaderType)

  const tab: TabConfig = {
    id: 1,
    tabName: "Untitled",
    tabLanguage: activeTab().tabLanguage,
    tabExtension: activeTab().tabExtension
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
              {headersList.map((item) => (
                <button
                  type="button"
                  style={{
                    backgroundColor: isTransparent
                      ? theme.theme.theme === "light"
                        ? "rgba(255,255,255, 0.7)"
                        : "rgba(0,0,0, 0.7)"
                      : theme.theme.settings.background
                  }}
                  className={cn(
                    headerType.name === item.name && "ring-2 ring-ring",
                    "w-full p-1 rounded-lg duration-200 text-white"
                  )}
                  onClick={() => setHeaderType(item)}
                  key={item.name}
                >
                  {item.value(<EditorTab tab={tab} />)}
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
