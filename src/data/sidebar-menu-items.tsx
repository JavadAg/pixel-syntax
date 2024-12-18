import CodeLanguage from "@/components/SidebarMenus/CodeMenu/CodeLanguage"
import CodeLineNumber from "@/components/SidebarMenus/CodeMenu/CodeLineNumber"
import CodeTheme from "@/components/SidebarMenus/CodeMenu/CodeTheme"
import ContainerBg from "@/components/SidebarMenus/ContainerMenu/ContainerBg"
import ContainerOpacity from "@/components/SidebarMenus/ContainerMenu/ContainerOpacity"
import ContainerPadding from "@/components/SidebarMenus/ContainerMenu/ContainerPadding"
import ContainerRadius from "@/components/SidebarMenus/ContainerMenu/ContainerRadius"
import EditorBorder from "@/components/SidebarMenus/EditorMenu/EditorBorder"
import EditorHeader from "@/components/SidebarMenus/EditorMenu/EditorHeader"
import EditorRadius from "@/components/SidebarMenus/EditorMenu/EditorRadius"
import EditorShadow from "@/components/SidebarMenus/EditorMenu/EditorShadow"
import EditorTransparent from "@/components/SidebarMenus/EditorMenu/EditorTransparent"
import FontFamily from "@/components/SidebarMenus/FontMenu/FontFamily"
import FontLigatures from "@/components/SidebarMenus/FontMenu/FontLigatures"
import FontLineHeight from "@/components/SidebarMenus/FontMenu/FontLineHeight"
import FontSize from "@/components/SidebarMenus/FontMenu/FontSize"
import FontWeight from "@/components/SidebarMenus/FontMenu/FontWeight"
import WatermarkControl from "@/components/SidebarMenus/OtherMenu/WatermarkControl"
import { Box, CaseSensitive, Code, Ellipsis, SquareChartGantt } from "lucide-react"

export type SidebarMenuListItem = {
  label: "Container" | "Editor" | "Code" | "Font" | "Other"
  icon: typeof Code
  subItems: { label: string; component: React.ReactElement }[]
}

export const sidebar_menu_list: SidebarMenuListItem[] = [
  {
    label: "Container",
    icon: Box,
    subItems: [
      {
        label: "Background",
        component: <ContainerBg />
      },
      {
        label: "Padding",
        component: <ContainerPadding />
      },
      {
        label: "Radius",
        component: <ContainerRadius />
      },
      {
        label: "Opacity",
        component: <ContainerOpacity />
      }
    ]
  },
  {
    label: "Editor",
    icon: SquareChartGantt,
    subItems: [
      {
        label: "Transparent",
        component: <EditorTransparent />
      },
      {
        label: "Header",
        component: <EditorHeader />
      },
      {
        label: "Shadow",
        component: <EditorShadow />
      },
      {
        label: "Border",
        component: <EditorBorder />
      },
      {
        label: "Radius",
        component: <EditorRadius />
      }
    ]
  },
  {
    label: "Code",
    icon: Code,
    subItems: [
      {
        label: "Language",
        component: <CodeLanguage />
      },
      {
        label: "Theme",
        component: <CodeTheme />
      },
      {
        label: "Line Number",
        component: <CodeLineNumber />
      }
    ]
  },
  {
    label: "Font",
    icon: CaseSensitive,
    subItems: [
      {
        label: "Family",
        component: <FontFamily />
      },
      {
        label: "Size",
        component: <FontSize />
      },
      {
        label: "Weight",
        component: <FontWeight />
      },
      {
        label: "Ligatures",
        component: <FontLigatures />
      },
      {
        label: "Line Height",
        component: <FontLineHeight />
      }
    ]
  },
  {
    label: "Other",
    icon: Ellipsis,
    subItems: [
      {
        label: "Watermark",
        component: <WatermarkControl />
      }
    ]
  }
]
