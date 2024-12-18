"use client"

import ExportImage from "./ExportImage/ExportImage"
import Formatter from "./Formatter/Formatter"
import ResetConfig from "./ResetConfig/ResetConfig"

const Toolbox = () => {
  return (
    <section className="fixed bottom-10 z-10 mx-auto flex items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-secondary p-1.5 shadow-2xl backdrop-blur-sm dark:bg-secondary/40">
      <ResetConfig />
      <Formatter />
      <ExportImage />
    </section>
  )
}

export default Toolbox
