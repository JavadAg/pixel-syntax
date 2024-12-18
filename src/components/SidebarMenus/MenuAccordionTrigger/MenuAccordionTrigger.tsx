import { AccordionTrigger } from "@/components/ui/Accordion"
import { ChevronDown } from "lucide-react"

const MenuAccordionTrigger = ({
  children,
  title,
  style,
  ...props
}: {
  style?: React.CSSProperties
  title: string
  children?: React.ReactNode
} & React.ComponentProps<typeof AccordionTrigger>) => {
  return (
    <AccordionTrigger
      {...props}
      className="grid h-full grid-cols-[1fr,2fr] gap-3 [&[data-state=open]>div>svg]:rotate-180"
    >
      <span className="w-fit whitespace-nowrap">{title}</span>
      <div
        style={style}
        className="relative flex size-full h-full max-h-8 min-h-8 items-center justify-between gap-2 rounded-md border border-border bg-background px-3 font-medium capitalize"
      >
        {children}
        <ChevronDown className="ml-auto mr-0 size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </div>
    </AccordionTrigger>
  )
}

export default MenuAccordionTrigger
