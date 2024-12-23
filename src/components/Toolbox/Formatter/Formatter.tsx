import Button from "@/components/ui/Button"
import useStore from "@/store/store"
import { awaitPlugins, resolveLanguage } from "@/utils/helpers"
import { LetterText } from "lucide-react"
import prettier from "prettier"
import { toast } from "sonner"

const Formatter = () => {
  const updateTab = useStore((state) => state.updateTab)
  const currentTab = useStore((state) => state.getTab())

  const language = resolveLanguage(currentTab.languageId)

  const formatCode = async () => {
    if (!language?.prettier) return

    try {
      const plugins = await awaitPlugins(language.prettier.plugin)
      const formatted = await prettier.format(currentTab.content, {
        parser: language.prettier.parser,
        plugins,
        parentParser: language.prettier.parser
      })

      updateTab(currentTab.id, { content: formatted })
      toast.success("Code formatted successfully")
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (error) {
      toast.error("Failed to format code")
    }
  }

  return (
    <Button disabled={!language.prettier} onClick={formatCode} variant="outline">
      <LetterText /> <span>Format</span>
    </Button>
  )
}

export default Formatter
