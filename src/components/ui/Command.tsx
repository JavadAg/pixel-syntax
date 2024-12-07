"use client"

import type { DialogProps } from "@radix-ui/react-dialog"
import type React from "react"
import { Dialog, DialogContent } from "@/components/ui/Dialog"

import { cn } from "@/utils/helpers"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

const Command: React.FC<React.ComponentPropsWithoutRef<typeof CommandPrimitive>> = ({ className, ...props }) => (
  <CommandPrimitive
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
)

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput: React.FC<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>> = ({
  className,
  ...props
}) => (
  <div className="flex items-center border-b px-2" cmdk-input-wrapper="">
    <Search className="mr-1.5 size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
)

const CommandList: React.FC<React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>> = ({
  className,
  ...props
}) => <CommandPrimitive.List className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)} {...props} />

const CommandEmpty: React.FC<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>> = (props) => (
  <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
)

const CommandGroup: React.FC<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>> = ({
  className,
  ...props
}) => (
  <CommandPrimitive.Group
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
)

const CommandSeparator: React.FC<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>> = ({
  className,
  ...props
}) => <CommandPrimitive.Separator className={cn("-mx-1 h-px bg-border", className)} {...props} />

const CommandItem: React.FC<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>> = ({
  className,
  ...props
}) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-default gap-1 select-none items-center rounded-sm px-1 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
)

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
}
