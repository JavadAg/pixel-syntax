"use client"

import PresetSwitcher from "@/components/SidebarMenus/PresetSwitcher/PresetSwitcher"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/Collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "@/components/ui/Sidebar"
import { sidebar_menu_list, type SidebarMenuListItem } from "@/data/sidebar-menu-items"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

function CodeSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [opened, setOpened] = useState<SidebarMenuListItem["label"][]>(["Container", "Editor", "Code", "Font", "Other"])
  const { setOpen, open } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <PresetSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="divide-y divide-border">
            {sidebar_menu_list.map((menu) => (
              <Collapsible
                key={menu.label}
                open={opened.includes(menu.label)}
                onOpenChange={() => {
                  if (!open && opened.includes(menu.label)) {
                    return
                  }
                  setOpened((o) => (o.includes(menu.label) ? o.filter((i) => i !== menu.label) : [...o, menu.label]))
                }}
                asChild
                className="group/collapsible pb-3 [&:not(:first-child)]:pt-3"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="px-1"
                      isActive={opened.includes(menu.label)}
                      onClick={() => setOpen(true)}
                      tooltip={menu.label}
                    >
                      {menu.icon && <menu.icon />}
                      <span className="text-base font-semibold">{menu.label}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="mt-2 space-y-1 text-sm">
                      {menu.subItems?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.label}>
                          <SidebarMenuSubButton asChild>{subItem.component}</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default CodeSidebar
