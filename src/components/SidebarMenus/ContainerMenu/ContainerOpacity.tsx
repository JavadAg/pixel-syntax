import { Slider } from "@/components/ui/Slider"
import useStore from "@/store/store"
import SidebarItemWrapper from "../SidebarItemWrapper/SidebarItemWrapper"

const ContainerOpacity = () => {
  const { opacity } = useStore((state) => state.editorConfig)
  const setOpacity = useStore((state) => state.setOpacity)

  return (
    <SidebarItemWrapper>
      <span>Opacity</span>
      <Slider
        data-testid="container-opacity-slider"
        value={[opacity]}
        max={100}
        min={-1}
        onValueChange={(val) => val[0] && setOpacity(val[0])}
      />
    </SidebarItemWrapper>
  )
}

export default ContainerOpacity
