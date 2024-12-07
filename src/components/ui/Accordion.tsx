"use client"

import { cn } from "@/utils/helpers"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

const Accordion = AccordionPrimitive.Root

const AccordionItem: React.FC<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>> = ({
  className,
  ...props
}) => <AccordionPrimitive.Item className={cn("", className)} {...props} />

const AccordionTrigger: React.FC<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    withIcon?: boolean
  }
> = ({ className, withIcon = false, children, ...props }) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "flex flex-1 items-center min-h-8 justify-between text-sm transition-all text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {withIcon && <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)

const AccordionContent: React.FC<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>> = ({
  className,
  children,
  ...props
}) => (
  <AccordionPrimitive.Content
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("py-3", className)}>{children}</div>
  </AccordionPrimitive.Content>
)

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
