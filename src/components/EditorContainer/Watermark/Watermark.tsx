import useStore from "@/store/store"
import { cn, resolveTheme } from "@/utils/helpers"

const Watermark = () => {
  const { watermarkText, watermarkOpacity, watermarkLocation, themeId } = useStore((state) => state.editorConfig)

  const themeVariant = resolveTheme(themeId, false).options.theme

  const locationStyles = watermarkLocation === "editor" ? "bottom-2 right-3" : "bottom-3 right-4"
  const themeStyles =
    themeVariant === "light"
      ? "text-black drop-shadow-[0_0_4px_#ffffff60]"
      : "text-white drop-shadow-[0_0_4px_#00000060]"

  return (
    <span
      data-testid={watermarkLocation === "editor" ? "editor-watermark" : "container-watermark"}
      style={{
        opacity: watermarkOpacity / 100
      }}
      className={cn(
        "absolute bottom-4 right-4 whitespace-nowrap text-sm font-medium tracking-wider",
        locationStyles,
        themeStyles
      )}
    >
      {watermarkText}
    </span>
  )
}

export default Watermark
