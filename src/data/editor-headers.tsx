import Mac from "@/components/EditorHeaders/Mac/Mac"
import Windows from "@/components/EditorHeaders/Windows/Windows"

export type EditorHeader = {
  id: "windows" | "mac_outline" | "mac_colored" | "mac_default"
  name: "Windows" | "MacOutline" | "MacColored" | "Mac"
  component: (children?: React.ReactNode, isEditor?: boolean) => React.ReactNode
}

export const headers: EditorHeader[] = [
  {
    id: "windows",
    name: "Windows",
    component: (children, isEditor) => <Windows isEditor={isEditor}>{children}</Windows>
  },
  {
    id: "mac_outline",
    name: "MacOutline",
    component: (children, isEditor) => (
      <Mac isEditor={isEditor} variant="outline">
        {children}
      </Mac>
    )
  },
  {
    id: "mac_colored",
    name: "MacColored",
    component: (children, isEditor) => (
      <Mac isEditor={isEditor} variant="colored">
        {children}
      </Mac>
    )
  },
  {
    id: "mac_default",
    name: "Mac",
    component: (children, isEditor) => (
      <Mac isEditor={isEditor} variant="default">
        {children}
      </Mac>
    )
  }
]
