"use client"

import Toolbox from "@/components/Toolbox/Toolbox"
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("@/components/Editor/Editor"), { ssr: false })

export default function MainPage() {
  return (
    <main className="relative grid size-full flex-1 place-items-center overflow-auto rounded-xl border-l border-t bg-background">
      <Editor />
      <Toolbox />
    </main>
  )
}
