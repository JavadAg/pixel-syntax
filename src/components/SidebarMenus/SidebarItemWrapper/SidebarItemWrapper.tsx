import { cn } from "@/utils/helpers"
import React from "react"

const SidebarItemWrapper: React.FC<React.ComponentProps<"div">> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn("row-auto select-none capitalize grid min-h-8 grid-cols-[1fr,2fr] items-center gap-3", className)}
    >
      {children}
    </div>
  )
}

export default SidebarItemWrapper
