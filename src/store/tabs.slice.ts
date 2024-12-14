import type { TabConfig } from "@/types/editor.type"
import type { StateCreator } from "zustand"
import { languages } from "@/data/language-configs"

const javascript = languages.find((lang) => lang.id === "javascript")

const initialData: TabConfig = {
  id: Date.now().toString(),
  name: `Untitled${javascript!.extensions[0]!.extension}`,
  content: `const IntervalCounter = () => {
const [count, setCount] = useState(0);

useEffect(() => {
const interval = setInterval(() => setCount((c) => c + 1), 1000);
return () => clearInterval(interval);
}, []);

return <h1>Counter: {count}</h1>;
};
`,
  languageId: javascript!.id,
  extension: javascript!.extensions[0]!
}

export type TabsSlice = {
  tabs: TabConfig[]
  activeTabId: string
  getTab: () => TabConfig
  addTab: () => void
  changeTab: (tabId: string) => void
  removeTab: (tabId: string) => void
  updateTab: (tabId: string, update: Partial<TabConfig>) => void
}

export const createTabsSlice: StateCreator<TabsSlice> = (set, get) => ({
  tabs: [initialData],
  activeTabId: get()?.tabs[0]!.id,
  getTab: () => {
    const { tabs, activeTabId } = get()
    let tab = tabs.find((tab) => tab.id === activeTabId)

    // if tab not found (on first render activeTabId is undefined)
    const isNotCorrectId = !activeTabId || activeTabId !== tab?.id

    if (isNotCorrectId) {
      const firstTab = tabs[0]!
      tab = firstTab
      set(() => ({ activeTabId: firstTab.id }))
    }

    return tab!
  },
  changeTab: (tabId) => {
    set(() => ({
      activeTabId: tabId
    }))
  },
  addTab: () =>
    set((state) => ({
      activeTabId: Date.now().toString(),
      tabs: [...state.tabs, { ...initialData, id: Date.now().toString() }]
    })),
  removeTab: (tabId) => {
    const remainingTabs = get().tabs.filter((tab) => tab.id !== tabId)
    const newActiveTabId = remainingTabs[0]!.id

    set(() => ({
      activeTabId: newActiveTabId,
      tabs: remainingTabs
    }))
  },
  updateTab: (tabId, update) =>
    set((state) => ({ tabs: state.tabs.map((tab) => (tab.id === tabId ? { ...tab, ...update } : tab)) }))
})
