import { useEffect, useRef } from "react"

const AutoResizingInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ value, ...props }) => {
  const hideRef = useRef<HTMLSpanElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    resizeInput()
  }, [value])

  function resizeInput() {
    if (hideRef.current && inputRef.current) {
      inputRef.current.style.width = `${hideRef.current.offsetWidth}px`
    }
  }

  return (
    <>
      <span ref={hideRef} className="absolute h-0 overflow-hidden whitespace-pre">
        {value}
      </span>
      <input {...props} ref={inputRef} type="text" value={value} />
    </>
  )
}

export default AutoResizingInput
