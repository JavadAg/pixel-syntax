/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import type { TabConfig } from "@/types/editor.type"
import AutoResizingInput from "@/components/ui/AutoResizingInput"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/Dropdown"
import { type Language, languages } from "@/data/language-configs"
import useStore from "@/store/store"
import { adjustBrightness, adjustOpacity, cn, resolveTheme } from "@/utils/helpers"
import { debounce } from "lodash-es"
import { X } from "lucide-react"
import { useCallback, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

type IProps = {
  tab: TabConfig
  isEditor?: boolean
}

const EditorTab: React.FC<IProps> = ({ tab, isEditor }) => {
  const [name, setName] = useState(tab.name)

  const { isTransparent, themeId } = useStore((state) => state.editorConfig)

  const tabs = useStore((state) => state.tabs)
  const activeTabId = useStore((state) => state.activeTabId)
  const changeTab = useStore((state) => state.changeTab)
  const updateTab = useStore((state) => state.updateTab)
  const removeTab = useStore((state) => state.removeTab)

  const handleNameCallback = useCallback(
    debounce((id: string, value: string) => updateTab(id, { name: value }), 1000),
    []
  )

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isValid = z.string().min(1).max(20).safeParse(e.target.value)
    if (isValid.success) {
      setName(e.target.value)
      handleNameCallback(tab.id, e.target.value)
    } else {
      toast.error("Name must be between 1 and 20 characters")
    }
  }

  function handleIcon(ext: Language["extensions"][number]) {
    updateTab(tab.id, { extension: ext })
  }

  function handleDelete() {
    removeTab(activeTabId)
  }

  const fileExtensions = languages.find((lang) => lang.id === tab.languageId)?.extensions

  const isActive = tab.id === activeTabId
  const theme = resolveTheme(themeId, isTransparent)

  return (
    <div
      data-testid="editor-tab"
      data-active={isActive}
      onClick={() => changeTab(tab.id)}
      className={cn(
        "relative flex items-center duration-200 justify-center gap-1.5 rounded-lg pl-4 pr-2 py-1",
        isActive ? "shadow-md shadow-black/10" : ""
      )}
      style={{
        backgroundColor: isTransparent
          ? isActive
            ? adjustOpacity(theme.options.settings.foreground!, 0.1)
            : "transparent"
          : isActive
            ? adjustBrightness(theme.options.settings.background!, 0.3)
            : "transparent"
      }}
    >
      {/* using img tag as next/image is not working with dom-to-image */}
      {isEditor ? (
        <DropdownMenu>
          <DropdownMenuTrigger data-testid="editor-tab-icon">
            <img src={tab.extension.icon.src} alt={tab.extension?.extension} width={18} height={18} />
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
        <img src={tab.extension.icon.src} alt={tab.extension.extension || ""} width={18} height={18} />
      )}

      {isEditor ? (
        <AutoResizingInput
          data-testid="editor-tab-name"
          type="text"
          className="min-w-3 bg-transparent text-[15px] outline-none"
          value={name}
          onChange={(e) => handleNameChange(e)}
        />
      ) : (
        <span className="text-[15px]">{name}</span>
      )}
      {isActive && tabs.length > 1 && (
        <button
          data-exclude
          data-testid="editor-tab-delete"
          onClick={(e) => {
            e.stopPropagation()
            handleDelete()
          }}
          type="button"
          className="rounded-full opacity-65 duration-200 hover:opacity-100"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default EditorTab
