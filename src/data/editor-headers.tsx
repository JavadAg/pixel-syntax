import Mac from "@/components/EditorHeaders/Mac/Mac"
import Windows from "@/components/EditorHeaders/Windows/Windows"

export type EditorHeader = { name: string; value: (children?: React.ReactNode) => React.ReactNode }

export const headersList: EditorHeader[] = [
  {
    name: "Windows",
    value: (children) => <Windows>{children}</Windows>
  },
  {
    name: "MacOutline",
    value: (children) => <Mac variant="outline">{children}</Mac>
  },
  {
    name: "MacColored",
    value: (children) => <Mac variant="colored">{children}</Mac>
  },
  {
    name: "Mac",
    value: (children) => <Mac variant="default">{children}</Mac>
  }
]
