import HydrationZustand from "../../providers/hydration"
import CodeSidebar from "./CodeSidebar/CodeSidebar"
import Header from "./Header/Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HydrationZustand>
        <CodeSidebar />
      </HydrationZustand>
      <div className="relative flex max-h-dvh flex-1 flex-col items-center justify-center overflow-hidden bg-sidebar">
        <Header />
        {children}
      </div>
    </>
  )
}

export default Layout
