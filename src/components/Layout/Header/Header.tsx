import Logo from "@/components/ui/Logo"
import { SidebarTrigger } from "@/components/ui/Sidebar"
import { ModeToggle } from "./ModeToggle/ModeToggle"

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-sidebar px-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Logo className="h-8 w-full dark:fill-gray-200" />
      </div>
      <ModeToggle />
    </header>
  )
}

export default Header
