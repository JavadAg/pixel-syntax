import { Switch } from "@/components/ui/Switch"
import useStore from "@/store/store"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const CodeLineNumber = () => {
  const { isLineNumber } = useStore((state) => state.editorConfig)
  const setLineNumber = useStore((state) => state.setLineNumber)

  function handleLineNumber(checked: boolean) {
    setLineNumber(checked)
  }

  return (
    <SidebarItemWrapper>
      <span>Line Number</span>
      <div className="flex items-center justify-end">
        <Switch data-testid="code-line-number-switch" checked={isLineNumber} onCheckedChange={handleLineNumber} />
      </div>
    </SidebarItemWrapper>
  )
}

export default CodeLineNumber
