"use client"

import ExportImage from "./ExportImage/ExportImage"
import Formatter from "./Formatter/Formatter"

const Toolbox = () => {
  return (
    <section className="fixed bottom-10 z-10 mx-auto flex items-center justify-center gap-3 rounded-lg border border-border/60 bg-gray-600/20 p-1.5 shadow-2xl backdrop-blur-sm dark:bg-gray-400/40">
      <Formatter />
      <ExportImage />
    </section>
  )
}

export default Toolbox
