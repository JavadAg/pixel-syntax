/* eslint-disable @next/next/no-img-element */

import type { TabConfig } from "@/types/editor-config.type"
import AutoResizingInput from "@/components/ui/AutoResizingInput"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/Dropdown"
import languageConfigs, { type LanguageConfig } from "@/data/language-configs"
import useStore from "@/store/store"
import { adjustBrightness, adjustOpacity } from "@/utils/helpers"
import { toast } from "sonner"
import { z } from "zod"

type IProps = {
  tab: TabConfig
  isEditor?: boolean
}

const EditorTab: React.FC<IProps> = ({ tab, isEditor }) => {
  const { theme, activeTabId, isTransparent } = useStore((state) => state.editorConfig)
  const setActiveTab = useStore((state) => state.setActiveTab)
  const setTabs = useStore((state) => state.setTabs)

  function handleName(value: string) {
    const isValid = z.string().safeParse(value).success

    if (isValid) {
      const newTab = { ...tab, tabName: value }
      setTabs(activeTabId, newTab)
    } else {
      toast.error("Tab name is invalid")
    }
  }

  function handleIcon(ext: LanguageConfig["fileExtensions"][number]) {
    const newTab = { ...tab, tabExtension: ext }
    setTabs(activeTabId, newTab)
  }

  const fileExtensions = languageConfigs.find((lang) => lang.label === tab.tabLanguage.label)?.fileExtensions

  return (
    <div
      data-testid="editor-tab"
      onClick={() => setActiveTab(tab.id)}
      className="relative flex items-center justify-center gap-2 rounded-lg px-4 py-1 shadow-md shadow-black/10"
      style={{
        backgroundColor: isTransparent
          ? adjustOpacity(theme.theme.settings.foreground!, 0.1)
          : adjustBrightness(theme.theme.settings.background!, 0.3)
      }}
    >
      {/* using img tag as next/image is not working with dom-to-image */}
      {isEditor ? (
        <DropdownMenu>
          <DropdownMenuTrigger data-testid="editor-tab-icon">
            <img src={tab.tabExtension!.icon.src} alt={tab.tabExtension?.extension} width={18} height={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent data-testid="editor-tab-icon-dropdown" className="min-w-0">
            {fileExtensions?.map((ext) => (
              <DropdownMenuItem key={ext.extension} onClick={() => handleIcon(ext)}>
                <img src={ext.icon.src} alt={ext.extension || ""} width={20} height={20} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <img src={tab.tabExtension!.icon.src} alt={tab.tabExtension?.extension || ""} width={18} height={18} />
      )}

      {isEditor ? (
        <AutoResizingInput
          data-testid="editor-tab-name"
          type="text"
          className="min-w-3 bg-transparent text-[15px] outline-none"
          value={tab.tabName}
          onChange={(e) => handleName(e.target.value)}
        />
      ) : (
        <span className="text-[15px]">{tab.tabName}</span>
      )}
    </div>
  )
}

export default EditorTab
