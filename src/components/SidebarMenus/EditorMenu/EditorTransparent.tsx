import { Switch } from "@/components/ui/Switch"
import useStore from "@/store/store"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const EditorTransparent = () => {
  const { isTransparent } = useStore((state) => state.editorConfig)
  const setTransparent = useStore((state) => state.setTransparent)

  function handleTransparent(checked: boolean) {
    setTransparent(checked)
  }

  return (
    <SidebarItemWrapper>
      <span>Transparent</span>
      <div className="flex items-center justify-end">
        <Switch data-testid="editor-transparent-switch" checked={isTransparent} onCheckedChange={handleTransparent} />
      </div>
    </SidebarItemWrapper>
  )
}

export default EditorTransparent
