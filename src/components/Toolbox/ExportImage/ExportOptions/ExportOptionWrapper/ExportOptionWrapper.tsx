const ExportOptionWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="flex select-none flex-col items-start justify-center gap-1">
      <span className="font-semibold">{title}</span>
      {children}
    </div>
  )
}

export default ExportOptionWrapper
