import Button from "@/components/ui/Button"
import useStore from "@/store/store"
import { awaitPlugins } from "@/utils/helpers"
import { LetterText } from "lucide-react"
import prettier from "prettier"
import { toast } from "sonner"

const Formatter = () => {
  const activeTab = useStore((state) => state.getActiveTab)
  const content = useStore((state) => state.content)

  const setContent = useStore((state) => state.setContent)

  const formatCode = async () => {
    try {
      const prettierBySelectedLanguage = activeTab().tabLanguage.prettier
      const formatted = await prettier.format(content, {
        parser: prettierBySelectedLanguage?.parser,
        plugins: await awaitPlugins(prettierBySelectedLanguage?.plugin)
      })

      setContent(formatted)
      toast.success("Code formatted successfully")
    } catch (error) {
      console.error(error)
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
