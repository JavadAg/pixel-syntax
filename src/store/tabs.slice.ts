import type { DecorationType, TabConfig } from "@/types/tabs.type"
import type { StateCreator } from "zustand"
import { languages } from "@/data/language-configs"

const javascript = languages.find((lang) => lang.id === "javascript")

const initialData: TabConfig = {
  id: "initialTab",
  name: `Untitled${javascript!.extensions[0]!.extension}`,
  decorations: {
    highlighted: [],
    added: [],
    removed: [],
    focused: []
  },
  content: `import React, { useState, useEffect } from "react";

const CountdownTimer = ({ start }) => {
  const [timeLeft, setTimeLeft] = useState(start);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return <h1>{timeLeft > 0 ? timeLeft : "Time's up!"}</h1>;
};

export default CountdownTimer;
`,
  languageId: javascript!.id,
  extension: javascript!.extensions[0]!
}

export type TabsSlice = {
  tabs: TabConfig[]
  activeDecor: DecorationType | null
  activeTabId: string
  getTab: () => TabConfig
  addTab: () => void
  changeTab: (tabId: string) => void
  removeTab: (tabId: string) => void
  updateTab: (tabId: string, update: Partial<TabConfig>) => void
  setActiveDecor: (decorType: DecorationType | null) => void
}

export const createTabsSlice: StateCreator<TabsSlice> = (set, get) => ({
  tabs: [initialData],
  activeDecor: null,
  activeTabId: "initialTab",
  getTab: () => {
    return get().tabs.find((tab) => tab.id === get().activeTabId)!
  },
  changeTab: (tabId) => {
    set(() => ({
      activeTabId: tabId
    }))
  },
  addTab: () => {
    const id = Date.now().toString()
    set((state) => ({
      activeTabId: id,
      tabs: [...state.tabs, { ...initialData, id }]
    }))
  },
  removeTab: (tabId) => {
    const remainingTabs = get().tabs.filter((tab) => tab.id !== tabId)
    const newActiveTabId = remainingTabs[0]!.id

    set(() => ({
      activeTabId: newActiveTabId,
      tabs: remainingTabs
    }))
  },
  updateTab: (tabId, update) =>
    set((state) => ({ tabs: state.tabs.map((tab) => (tab.id === tabId ? { ...tab, ...update } : tab)) })),
  setActiveDecor: (decorType) => set(() => ({ activeDecor: decorType }))
})
