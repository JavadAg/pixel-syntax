import useStore from "@/store/store"
import { Plus } from "lucide-react"
import { toast } from "sonner"

const AddNewTab = () => {
  const tabs = useStore((state) => state.tabs)
  const addTab = useStore((state) => state.addTab)

  function handleAddNewTab() {
    if (tabs && tabs.length >= 10) {
      toast.error("Maximum number of tabs reached")
      return
    }

    addTab()
  }

  return (
    <button
      onClick={() => handleAddNewTab()}
      type="button"
      data-exclude
      data-testid="add-new-tab-button"
      className="ml-1 rounded-full p-1.5 opacity-70 duration-200 hover:opacity-100"
    >
      <Plus size={16} />
    </button>
  )
}

export default AddNewTab
