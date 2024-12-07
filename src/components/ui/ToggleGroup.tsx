/* eslint-disable react/no-unstable-context-value */
"use client"

import type { VariantProps } from "class-variance-authority"
import { cn } from "@/utils/helpers"

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import React, { createContext } from "react"
import { toggleVariants } from "./Toggle"

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default"
})

const ToggleGroup: React.FC<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
> = ({ className, variant, size, children, ...props }) => (
  <ToggleGroupPrimitive.Root className={cn("flex items-center justify-start gap-1", className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
)

const ToggleGroupItem: React.FC<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
> = ({ className, children, variant, size, ...props }) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
