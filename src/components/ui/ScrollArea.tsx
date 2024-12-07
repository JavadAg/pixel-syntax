"use client"

import { cn } from "@/utils/helpers"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

const ScrollBar: React.FC<React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>> = ({
  className,
  orientation = "vertical",
  ...props
}) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
)

const ScrollArea: React.FC<React.ComponentProps<typeof ScrollAreaPrimitive.Root>> = ({
  className,
  children,
  ...props
}) => (
  <ScrollAreaPrimitive.Root className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
)

export { ScrollArea, ScrollBar }
