import useStore from "@/store/store"
import { cn, resolveTheme } from "@/utils/helpers"

const Watermark = () => {
  const {
    watermarkControls: { location, opacity, text },
    themeId
  } = useStore((state) => state.editorConfig)

  const themeVariant = resolveTheme(themeId, false).options.theme

  const locationStyles = location === "editor" ? "bottom-2 right-3" : "bottom-3 right-4"
  const themeStyles =
    themeVariant === "light"
      ? "text-black drop-shadow-[0_0_4px_#ffffff60]"
      : "text-white drop-shadow-[0_0_4px_#00000060]"

  return (
    <span
      data-testid={location === "editor" ? "editor-watermark" : "container-watermark"}
      style={{
        opacity: opacity / 100
      }}
      className={cn(
        "absolute bottom-4 right-4 whitespace-nowrap text-sm font-medium tracking-wider",
        locationStyles,
        themeStyles
      )}
    >
      {text}
    </span>
  )
}

export default Watermark
