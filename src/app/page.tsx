"use client"

import Toolbox from "@/components/Toolbox/Toolbox"
import { Skeleton } from "@/components/ui/Skeleton"
import dynamic from "next/dynamic"

const EditorContainer = dynamic(() => import("@/components/EditorContainer/EditorContainer"), {
  ssr: false,
  loading: () => (
    <div className="relative flex h-max w-2/4 flex-col space-y-4 rounded-xl bg-foreground/5 p-16">
      <Skeleton className="h-12 w-full" />
      <div className="space-y-4 rounded-lg bg-foreground/10 px-4 py-6 [&>div]:h-4">
        <Skeleton className="w-2/5" />
        <Skeleton className="w-full" />
        <Skeleton className="w-4/5" />
        <Skeleton className="w-1/5" />
        <Skeleton className="w-2/5" />
        <Skeleton className="w-full" />
        <Skeleton className="w-3/5" />
        <Skeleton className="w-1/5" />
      </div>
    </div>
  )
})

export default function MainPage() {
  return (
    <main className="relative grid size-full flex-1 place-items-center overflow-auto rounded-tl-xl border-l border-t bg-background">
      <EditorContainer />
      <Toolbox />
    </main>
  )
}
