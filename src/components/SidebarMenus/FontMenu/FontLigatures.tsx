import { Switch } from "@/components/ui/Switch"
import useStore from "@/store/store"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const FontLigatures = () => {
  const { isLigatures, fontFamily } = useStore((state) => state.editorConfig)
  const setLigatures = useStore((state) => state.setLigatures)

  function handleLigatures(isLigatures: boolean) {
    if (!fontFamily.ligatures) return
    setLigatures(isLigatures)
  }

  return (
    <SidebarItemWrapper>
      <span>Ligatures</span>
      <div className="flex items-center justify-end">
        <Switch
          data-testid="font-ligatures-switch"
          disabled={!fontFamily.ligatures}
          checked={isLigatures}
          onCheckedChange={handleLigatures}
        />
      </div>
    </SidebarItemWrapper>
  )
}

export default FontLigatures
