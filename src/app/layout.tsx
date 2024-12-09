import Layout from "@/components/Layout/Layout"
import { SidebarProvider } from "@/components/ui/Sidebar"
import { Toaster } from "@/components/ui/Sonner"
import { ThemeProvider } from "@/providers/theme-provider"
import { cn } from "@/utils/helpers"
import { Source_Sans_3 } from "next/font/google"
import "@/styles/global.css"

const sans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
})

export const metadata = {
  title: "Pixel Syntax - Create beautiful image from your code",
  description: "Create beautiful image from your code"
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className={cn(sans.variable, "font-sans")}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <Layout>{props.children}</Layout>
          </SidebarProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
