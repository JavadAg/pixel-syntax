import Button from "@/components/ui/Button"
import useStore from "@/store/store"
import { awaitPlugins, resolveLanguage } from "@/utils/helpers"
import { LetterText } from "lucide-react"
import prettier from "prettier"
import { toast } from "sonner"

const Formatter = () => {
  const updateTab = useStore((state) => state.updateTab)
  const getTab = useStore((state) => state.getTab())

  const formatCode = async () => {
    try {
      const prettierBySelectedLanguage = resolveLanguage(getTab.languageId).prettier

      const plugins = await awaitPlugins(prettierBySelectedLanguage?.plugin)
      const formatted = await prettier.format(getTab.content, {
        parser: prettierBySelectedLanguage?.parser,
        plugins
      })

      updateTab(getTab.id, { content: formatted })
      toast.success("Code formatted successfully")
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (error) {
      toast.error("Failed to format code")
    }
  }

  return (
    <Button onClick={formatCode} variant="outline">
      <LetterText /> <span>Format</span>
    </Button>
  )
}

export default Formatter
